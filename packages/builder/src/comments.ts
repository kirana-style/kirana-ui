/**
 * What a file ships with: its code, and only the comments its reader needs. The registry's sources
 * are commented for whoever maintains them (what upstream wrote, why a workaround stands, which
 * base does what); a project that installs a component is not that reader. So every comment is
 * dropped from an installed file but
 *
 * - a tool's directive (`// eslint-disable-next-line`, `@ts-expect-error`, `/* @__PURE__ *\/`), and
 * - a doc comment on an export, when it speaks of the code alone (`speaksOfTheCode`).
 *
 * The comments are found by a small scanner (strings, template literals, regular expressions),
 * and the result is held to the code it came from: both are transpiled, and must come out the
 * same (`sameCode`), or the file is left as it was and reported.
 */

/** What a comment says that is the registry's own story, not the reader's code. */
export const JOURNEY: readonly (readonly [what: string, pattern: RegExp])[] = [
  ["a tracker's code", /\b(KF|LF|PF|MC|CLI|U)-\d+\b|\bP\d{1,2}-\d+\w?\b/],
  [
    "upstream or the port",
    /\bupstream\b|shadcn\/ui's|\bported\b|the Kirana site/i,
  ],
  [
    "the registry's own site or tools",
    /\bthe (registry|site|builder|customizer|installer)\b|\bpreview (page|app)s?\b/i,
  ],
  [
    "a Tailwind utility",
    /`[!-]?[a-z0-9-]+(\/\d+)?(:[a-z0-9[\]&>*=_"'-]+)+`|`\*:\[|`(dark|group|peer|has|data|aria)-?[\w[\]=/-]*:[^`]+`/,
  ],
]

/** The names a comment gives the headless libraries. */
export const BASE_NAMES: Readonly<Record<string, RegExp>> = {
  base: /\bBase UI\b/,
  aria: /\bReact Aria\b/,
  ark: /\bArk UI\b/,
  ng: /\bng-primitives\b/,
  reka: /\bReka UI\b/,
  bits: /\bBits UI\b/,
  uisdk: /\bui-sdk\b/,
  kirana: /\bKirana UI Primitives\b/,
}

/** A comment a tool reads. */
const DIRECTIVE =
  /^(\/\/|\/\*+|<!--)\s*(eslint|oxlint|biome|prettier|deno|@ts-|ts-|istanbul|c8|v8|@__|#__|svelte-ignore|@vite|webpack|@jsx|@refresh|<reference)/

/** Whether a doc comment speaks of the code alone: no part of the registry's story, no library. */
export function speaksOfTheCode(comment: string): boolean {
  return (
    !JOURNEY.some(([, pattern]) => pattern.test(comment)) &&
    !Object.values(BASE_NAMES).some((pattern) => pattern.test(comment))
  )
}

type Range = { start: number; end: number }

/** The characters before which a `/` begins a regular expression, not a division. */
const BEFORE_REGEX = new Set("(,=:[!&|?{};+-*%<>~^")
const KEYWORD_BEFORE_REGEX =
  /\b(return|typeof|case|in|of|delete|void|throw|new|else|do)$/

/** Every comment in a script, by its place. */
function commentsIn(code: string): Range[] {
  const found: Range[] = []
  /** How deep in braces each open template literal's `${` was opened. */
  const templates: number[] = []
  let depth = 0
  let last = ""
  let at = 0
  const skipString = (quote: string) => {
    at += 1
    while (at < code.length && code[at] !== quote) {
      // A quote in markup's text (`don't`) is no string: it ends with its line.
      if (code[at] === "\n") return
      at += code[at] === "\\" ? 2 : 1
    }
    at += 1
  }
  /** From inside a template literal, to its end or its next `${`. */
  const skipTemplate = () => {
    while (at < code.length) {
      if (code[at] === "\\") at += 2
      else if (code[at] === "`") {
        at += 1
        return
      } else if (code[at] === "$" && code[at + 1] === "{") {
        at += 2
        templates.push(depth)
        depth += 1
        return
      } else at += 1
    }
  }
  while (at < code.length) {
    const char = code[at]!
    const next = code[at + 1]
    if (char === "/" && next === "/") {
      // `https://…` in markup's text is no comment.
      if (code[at - 1] === ":") {
        at += 2
        continue
      }
      const start = at
      while (at < code.length && code[at] !== "\n") at += 1
      found.push({ start, end: at })
      continue
    }
    if (char === "/" && next === "*") {
      const start = at
      const end = code.indexOf("*/", at + 2)
      at = end === -1 ? code.length : end + 2
      found.push({ start, end: at })
      continue
    }
    if (char === '"' || char === "'") {
      skipString(char)
      last = '"'
      continue
    }
    if (char === "`") {
      at += 1
      skipTemplate()
      last = '"'
      continue
    }
    if (char === "{") depth += 1
    if (char === "}") {
      depth -= 1
      if (templates.at(-1) === depth) {
        templates.pop()
        at += 1
        skipTemplate()
        last = '"'
        continue
      }
    }
    if (
      char === "/" &&
      (last === "" ||
        BEFORE_REGEX.has(last) ||
        KEYWORD_BEFORE_REGEX.test(
          code.slice(Math.max(0, at - 8), at).trimEnd()
        ))
    ) {
      // A regular expression, to its closing `/` outside a class; a line's end is not one.
      let cursor = at + 1
      let inClass = false
      while (cursor < code.length && code[cursor] !== "\n") {
        if (code[cursor] === "\\") cursor += 1
        else if (code[cursor] === "[") inClass = true
        else if (code[cursor] === "]") inClass = false
        else if (code[cursor] === "/" && !inClass) break
        cursor += 1
      }
      if (code[cursor] === "/") {
        at = cursor + 1
        last = '"'
        continue
      }
    }
    if (!/\s/.test(char)) last = char
    at += 1
  }
  return found
}

/** A mark left where a comment was, so its line can be told from one that was always empty. */
const GONE = "\u0000"

/** `code` without the comments `keep` does not ask for; lines a comment had to itself go whole. */
function without(
  code: string,
  comments: readonly Range[],
  keep: (comment: string, after: string) => boolean
): string {
  let out = ""
  let from = 0
  for (const { start, end } of comments) {
    const comment = code.slice(start, end)
    if (keep(comment, code.slice(end))) continue
    // A JSX expression that held the comment alone goes with it: `{/* … */}`.
    const open = code.slice(from, start).search(/\{[ \t]*$/)
    const close = /^[ \t]*\}/.exec(code.slice(end))
    if (open !== -1 && close) {
      out += code.slice(from, from + open) + GONE
      from = end + close[0].length
      continue
    }
    out += code.slice(from, start) + GONE
    from = end
  }
  out += code.slice(from)
  if (!out.includes(GONE)) return code
  const lines: string[] = []
  for (const line of out.split("\n")) {
    if (!line.includes(GONE)) {
      lines.push(line)
      continue
    }
    const rest = line.replaceAll(GONE, "")
    // The comment's own line, or a JSX expression that held nothing else: `{/* … */}`.
    if (/^\s*(\{\s*\})?\s*$/.test(rest)) {
      lines.push(GONE)
      continue
    }
    lines.push(rest.replace(/\{\s*\}\s*$/, "").trimEnd())
  }
  // A removed line takes one neighbouring blank line with it, so no gap is left behind.
  const kept: string[] = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]!
    if (line !== GONE) {
      kept.push(line)
      continue
    }
    const before = kept.at(-1)
    let ahead = index + 1
    while (lines[ahead] === GONE) ahead += 1
    if (
      (before === undefined || before.trim() === "") &&
      lines[ahead]?.trim() === ""
    )
      lines[ahead] = GONE
  }
  return kept.join("\n").replace(/^\n+/, "")
}

/** A script's comments decided: a directive stays, and a doc comment on an export that speaks of the code. */
function keepInScript(comment: string, after: string): boolean {
  if (DIRECTIVE.test(comment)) return true
  if (!comment.startsWith("/**")) return false
  return /^\s*export\b/.test(after) && speaksOfTheCode(comment)
}

function stripScript(code: string): string {
  return without(code, commentsIn(code), keepInScript)
}

/** A stylesheet's comments, all of them. */
function stripCss(code: string): string {
  const comments: Range[] = []
  let at = code.indexOf("/*")
  while (at !== -1) {
    const end = code.indexOf("*/", at + 2)
    const stop = end === -1 ? code.length : end + 2
    comments.push({ start: at, end: stop })
    at = code.indexOf("/*", stop)
  }
  return without(code, comments, (comment) => DIRECTIVE.test(comment))
}

/**
 * Markup's comments, `<!-- … -->`, but a tool's directive; and a line that is a `//` comment, in
 * an expression the markup holds (a Svelte attachment's function).
 */
function stripMarkup(code: string): string {
  const comments: Range[] = []
  let line = 0
  while (line < code.length) {
    const end = code.indexOf("\n", line)
    const stop = end === -1 ? code.length : end
    const text = code.slice(line, stop)
    const indent = text.length - text.trimStart().length
    if (text.trimStart().startsWith("//"))
      comments.push({ start: line + indent, end: stop })
    line = stop + 1
  }
  let at = code.indexOf("<!--")
  while (at !== -1) {
    const end = code.indexOf("-->", at + 4)
    const stop = end === -1 ? code.length : end + 3
    comments.push({ start: at, end: stop })
    at = code.indexOf("<!--", stop)
  }
  comments.sort((one, other) => one.start - other.start)
  return without(code, comments, (comment) => DIRECTIVE.test(comment))
}

/** `<!-- … -->` alone, in a template written as a string. */
function stripHtmlComments(code: string): string {
  const comments: Range[] = []
  let at = code.indexOf("<!--")
  while (at !== -1) {
    const end = code.indexOf("-->", at + 4)
    const stop = end === -1 ? code.length : end + 3
    comments.push({ start: at, end: stop })
    at = code.indexOf("<!--", stop)
  }
  return without(code, comments, (comment) => DIRECTIVE.test(comment))
}

/** A single-file component: its script and style blocks each by their own rule, its markup by markup's. */
function stripComponent(code: string): string {
  const blocks: { start: number; end: number; kind: "script" | "style" }[] = []
  for (const kind of ["script", "style"] as const) {
    let at = code.indexOf(`<${kind}`)
    while (at !== -1) {
      const open = code.indexOf(">", at)
      const close = code.indexOf(`</${kind}>`, open)
      if (open === -1 || close === -1) break
      blocks.push({ start: open + 1, end: close, kind })
      at = code.indexOf(`<${kind}`, close)
    }
  }
  blocks.sort((one, other) => one.start - other.start)
  let out = ""
  let from = 0
  for (const block of blocks) {
    out += stripMarkup(code.slice(from, block.start))
    const inner = code.slice(block.start, block.end)
    const stripped =
      block.kind === "script" ? stripScript(inner) : stripCss(inner)
    // The block keeps its opening line break, which the first comment's removal may have taken.
    out +=
      inner.startsWith("\n") && !stripped.startsWith("\n")
        ? `\n${stripped}`
        : stripped
    from = block.end
  }
  return out + stripMarkup(code.slice(from))
}

/**
 * Bun's transpiler, which the builder runs under; the unit tests run under Node, where the
 * comparison is left out (the builder's own run makes it for every file).
 */
const transpiler = (loader: "ts" | "tsx") =>
  typeof Bun === "undefined" ? undefined : new Bun.Transpiler({ loader })
const transpilers = { tsx: transpiler("tsx"), ts: transpiler("ts") }

/** A single-file component's scripts, joined: what of it is code a transpiler reads. */
function scriptsOf(code: string): string {
  const scripts: string[] = []
  let at = code.indexOf("<script")
  while (at !== -1) {
    const open = code.indexOf(">", at)
    const close = code.indexOf("</script>", open)
    if (open === -1 || close === -1) break
    // Each in a block of its own: two scripts may declare the same name.
    scripts.push(
      `{\n${code.slice(open + 1, close).replace(/^\s*(import|export)\b/gm, "//")}\n}`
    )
    at = code.indexOf("<script", close)
  }
  return scripts.join("\n")
}

/** Whether two sources are the same code, comments apart; `undefined` when neither can be read. */
function sameCode(file: string, before: string, after: string) {
  const loader = file.endsWith(".tsx") ? "tsx" : "ts"
  const read = /\.(vue|svelte)$/.test(file) ? scriptsOf : (code: string) => code
  const transpile = transpilers[loader]
  if (!transpile) return undefined
  try {
    return (
      transpile.transformSync(read(before)) ===
      transpile.transformSync(read(after))
    )
  } catch {
    return undefined
  }
}

/**
 * `content` as `file` ships: without the comments its reader does not need. `problems` takes a
 * line for a file whose code would not come out the same, which is then left as it was.
 */
export function shipped(
  file: string,
  content: string,
  problems?: string[]
): string {
  const extension = /\.[a-z]+$/.exec(file)?.[0] ?? ""
  if (extension === ".css") return stripCss(content)
  if (extension === ".vue" || extension === ".svelte") {
    const stripped = stripComponent(content)
    if (sameCode(file, content, stripped) === false) {
      problems?.push(`${file}: its comments could not be taken out safely`)
      return content
    }
    return stripped
  }
  if (!/^\.(ts|tsx|js|mjs)$/.test(extension)) return content
  const stripped = stripScript(content)
  if (sameCode(file, content, stripped) === false) {
    problems?.push(`${file}: its comments could not be taken out safely`)
    return content
  }
  // An Angular component's template is a string of its file: its markup's comments go too.
  return stripped.includes("<!--") ? stripHtmlComments(stripped) : stripped
}
