/**
 * What an installed project holds, read as its owner reads it: nothing of a framework, a headless
 * library, an icon library, a linter or a workspace tool the project did not choose, and no file
 * nothing in the project reads. `scripts/install-smoke.ts` runs it on every project it installs;
 * a finding fails the install.
 *
 *   bun scripts/install-audit.ts <root> --framework react --base kirana --icons lucide \
 *     --tooling eslint --monorepo none          # a project on disk
 *
 * It reads source text only, so it is fast and says where each finding is; it does not replace the
 * project's own lint, type check and build, which the install test runs after it.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { basename, dirname, join, relative } from "node:path"

export type AuditChoices = {
  framework: string
  base: string
  iconLibrary: string
  tooling: string
  monorepo: string
}

export type Finding = {
  /** The rule's name: `icons`, `base`, `framework`, `states`, `unused`, `comments`, `tooling`, `leftover`. */
  rule: string
  file: string
  detail: string
}

/** Each base's packages, as an import names them. */
const BASE_PACKAGES: Record<string, RegExp> = {
  base: /^@base-ui\//,
  // Not `@internationalized/date`: every base's calendar reads dates with it.
  aria: /^(react-aria-components|react-aria|react-stately|@react-aria\/|@react-stately\/)/,
  ark: /^@ark-ui\//,
  ng: /^ng-primitives(\/|$)/,
  reka: /^reka-ui(\/|$)/,
  bits: /^bits-ui(\/|$)/,
  uisdk: /^@ui-sdk\//,
  kirana: /^@kirana-ui\//,
}

/** The state vocabulary each base's styles are written with (`@kirana-style/states/<name>`). */
const VOCABULARY: Record<string, string[]> = {
  base: ["base-ui"],
  aria: ["react-aria"],
  ark: ["ark-ui"],
  ng: ["ng-primitives", "base-ui"],
  reka: ["reka-ui"],
  bits: ["bits-ui"],
  uisdk: ["ui-sdk"],
  // Kirana UI Primitives write Base UI's vocabulary, with a few keys of their own.
  kirana: ["kirana-ui", "base-ui"],
}

/** Each icon library's packages. */
const ICON_PACKAGES: Record<string, RegExp> = {
  lucide: /^(lucide(-[a-z]+)*|@lucide\/[\w-]+)(\/|$)/,
  hugeicons: /^@hugeicons\//,
  tabler: /^@tabler\//,
  phosphor: /^(@phosphor-icons\/|phosphor-[a-z]+)/,
  remixicon: /^(@remixicon\/|remixicon)/,
}

/**
 * A comment that tells the registry's own story, not the reader's code: a tracker's code, what
 * upstream wrote, the site or its builder, a Tailwind utility the line was ported from.
 */
const JOURNEY: [what: string, pattern: RegExp][] = [
  ["a tracker's code", /\b(KF|LF|PF|MC|CLI|U)-\d+\b|\bP\d{1,2}-\d+\w?\b/],
  [
    "upstream or the port",
    /\bupstream\b|shadcn\/ui's|\bported\b|the Kirana site/,
  ],
  [
    "the registry's own site or tools",
    /\bthe (registry|site|builder|customizer|installer)\b|\bpreview (page|app)s?\b/,
  ],
  [
    "a Tailwind utility",
    /`[!-]?[a-z0-9-]+(\/\d+)?(:[a-z0-9[\]&>*=_"'-]+)+`|`\*:\[|`(dark|group|peer|has|data|aria)-?[\w[\]=/-]*:[^`]+`/,
  ],
]

/** The names a comment gives the other headless libraries. */
const BASE_NAMES: Record<string, RegExp> = {
  base: /\bBase UI\b/,
  aria: /\bReact Aria\b/,
  ark: /\bArk UI\b/,
  ng: /\bng-primitives\b/,
  reka: /\bReka UI\b/,
  bits: /\bBits UI\b/,
  uisdk: /\bui-sdk\b/,
  kirana: /\bKirana UI Primitives\b/,
}

/** A file's comment lines: `//`, a block's lines, a JSX or template comment. */
function commentLines(text: string): string[] {
  const lines: string[] = []
  let block = false
  for (const raw of text.split("\n")) {
    const line = raw.trim()
    const opens = /^(\/\*|\{\/\*|<!--)/.test(line)
    if (block || opens || line.startsWith("//")) lines.push(line)
    if (opens) block = !/(\*\/|-->)/.test(line)
    else if (block && /(\*\/|-->)/.test(line)) block = false
  }
  return lines
}

/** The files only one framework writes. */
const FRAMEWORK_FILES: Record<string, RegExp> = {
  vue: /\.vue$/,
  svelte: /\.svelte(\.ts)?$/,
  react: /\.tsx$/,
  solid: /\.tsx$/,
  angular: /\.(component|directive)\.ts$/,
}

/** The packages only one framework's code imports. */
const FRAMEWORK_PACKAGES: Record<string, RegExp> = {
  react: /^(react|react-dom)(\/|$)/,
  vue: /^(vue|@vue\/)(\/|$)?/,
  svelte: /^svelte(\/|$)/,
  solid: /^(solid-js|@solidjs\/)/,
  angular: /^@angular\//,
}

/** Each tooling's own files, at the root or in a package. */
const TOOLING_FILES: Record<string, RegExp> = {
  eslint:
    /^(eslint\.config\.[cm]?[jt]s|\.eslintrc(\..+)?|\.prettierrc(\..+)?|prettier\.config\.[cm]?[jt]s|\.prettierignore)$/,
  oxlint:
    /^(\.oxlintrc\.json|\.oxfmtrc\.json|oxlint\.config\.ts|oxfmt\.config\.ts)$/,
  biome: /^biome\.jsonc?$/,
  // Vite+ keeps lint and format in `vite.config.ts`, which every Vite project has.
  "vite-plus": /^$/,
}

const MONOREPO_FILES: Record<string, RegExp> = {
  turbo: /^turbo\.jsonc?$/,
  "vite-plus": /^$/,
  none: /^$/,
}

const SKIP = new Set([
  "node_modules",
  "dist",
  "build",
  ".git",
  ".output",
  ".nuxt",
  ".svelte-kit",
  ".angular",
  ".vinxi",
  ".tanstack",
  ".turbo",
  ".vite",
  ".nitro",
  ".react-router",
  ".astro",
  "vendor",
  "storage",
  "public",
])

const SOURCE = /\.(tsx?|jsx?|mjs|cjs|vue|svelte|astro)$/

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (SKIP.has(name)) return []
    const path = join(dir, name)
    // A dangling link (a browser profile's lock) is no file of the project's.
    if (!existsSync(path)) return []
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

/** Every module a source names: `from "x"`, `import "x"`, `import("x")`, `require("x")`. */
function specifiers(text: string): string[] {
  const found: string[] = []
  const pattern =
    /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\brequire\s*\(\s*)["']([^"'\n]+)["']/g
  for (const [, specifier] of text.matchAll(pattern)) found.push(specifier!)
  return found
}

const bare = (specifier: string) =>
  !specifier.startsWith(".") && !specifier.startsWith("/")

/** A file's name as an import ends: `lib/kirana/states`, without its extension or `/index`. */
function importTail(file: string): string {
  const stem = file.replace(/\.(tsx?|jsx?|vue|svelte)$/, "")
  const parts = stem.split("/")
  if (parts.at(-1) === "index") parts.pop()
  return parts.slice(-2).join("/")
}

export function audit(root: string, choices: AuditChoices): Finding[] {
  const findings: Finding[] = []
  const add = (rule: string, file: string, detail: string) =>
    findings.push({ rule, file: relative(root, file), detail })
  const files = walk(root)
  const sources = files.filter((file) => SOURCE.test(file))
  const texts = new Map(
    sources.map((file) => [file, readFileSync(file, "utf8")])
  )

  // What the installer wrote, by the project's lockfile: only those files are the registry's to
  // answer for. A template's own files answer to the tooling and workspace rules alone.
  const installed = new Set<string>()
  for (const lock of files.filter(
    (file) => basename(file) === "kirana-style.lock.json"
  )) {
    const items = (
      JSON.parse(readFileSync(lock, "utf8")) as {
        items?: Record<string, { files?: Record<string, unknown> }>
      }
    ).items
    for (const item of Object.values(items ?? {}))
      for (const file of Object.keys(item.files ?? {}))
        installed.add(join(dirname(lock), file))
  }
  if (installed.size === 0)
    add("leftover", root, "no kirana-style.lock.json lists an installed file")

  const otherBases = Object.entries(BASE_PACKAGES).filter(
    ([base]) => base !== choices.base
  )
  const otherIcons = Object.entries(ICON_PACKAGES).filter(
    ([library]) => library !== choices.iconLibrary
  )
  const vocabularies = VOCABULARY[choices.base] ?? []

  for (const [file, text] of texts) {
    const mine = installed.has(file)
    for (const specifier of specifiers(text)) {
      if (!bare(specifier)) continue
      for (const [library, pattern] of otherIcons)
        if (pattern.test(specifier))
          add(
            "icons",
            file,
            `imports ${specifier} (${library}); the project draws ${choices.iconLibrary}`
          )
      if (!mine) continue
      for (const [base, pattern] of otherBases)
        if (pattern.test(specifier))
          add(
            "base",
            file,
            `imports ${specifier} (${base}); the project is on ${choices.base}`
          )
      const vocabulary = /^@kirana-style\/states\/([\w-]+)/.exec(specifier)?.[1]
      if (vocabulary && !vocabularies.includes(vocabulary))
        add(
          "states",
          file,
          `imports the ${vocabulary} state vocabulary; ${choices.base} writes ${vocabularies.join(" and ")}`
        )
      for (const [framework, pattern] of Object.entries(FRAMEWORK_PACKAGES))
        if (framework !== choices.framework && pattern.test(specifier))
          add("framework", file, `imports ${specifier} (${framework})`)
    }
    if (!mine) continue
    if (/\bIconPlaceholder\b|icon-placeholder/.test(text))
      add("icons", file, "an icon placeholder was left unresolved")
    // A list of every framework or every base, written out in a project that has one of each.
    const named = (list: string[]) =>
      list.filter((name) => new RegExp(`["'\`]${name}["'\`]`).test(text))
    const frameworks = named(["react", "vue", "svelte", "solid", "angular"])
    if (frameworks.length >= 4)
      add(
        "framework",
        file,
        `names ${frameworks.length} frameworks (${frameworks.join(", ")})`
      )
    const bases = [...text.matchAll(/^\s*(aria|ark|ng|reka|bits|uisdk)\??:/gm)]
    if (bases.length >= 3)
      add(
        "states",
        file,
        `holds ${bases.length} state keys written for other bases (aria:, ark:, reka: …)`
      )
    // One finding per file and kind, with the first line that shows it and how many do.
    const comments = commentLines(text)
    const kinds: [string, RegExp][] = [
      ...JOURNEY,
      ...Object.entries(BASE_NAMES)
        .filter(
          ([base]) =>
            base !== choices.base &&
            // Kirana UI Primitives write Base UI's vocabulary, which a comment may say.
            !(choices.base === "kirana" && base === "base")
        )
        .map(([, pattern]): [string, RegExp] => [
          "a headless library the project does not use",
          pattern,
        ]),
    ]
    const told = new Map<string, string[]>()
    for (const line of comments)
      for (const [what, pattern] of kinds)
        if (pattern.test(line))
          told.set(what, [...(told.get(what) ?? []), line])
    for (const [what, lines] of told)
      add(
        "comments",
        file,
        `${lines.length} comment line(s) about ${what}: ${lines[0]!.slice(0, 110)}`
      )
    if (/@workspace\/registry|registry\/(core|styles|bases)\//.test(text))
      add("leftover", file, "names a path of the registry's own repository")
  }

  // An installed file under a library folder that nothing in the project imports.
  const everySpecifier = new Set<string>()
  for (const [file, text] of texts)
    for (const specifier of specifiers(text)) {
      if (bare(specifier) && !/[/]/.test(specifier)) continue
      const stem = specifier.replace(/\.(tsx?|jsx?|vue|svelte)$/, "")
      everySpecifier.add(stem.split("/").slice(-2).join("/"))
      // A sibling import, `./tokens`, names its folder by where it is written.
      if (/^\.\/[^/]+$/.test(stem))
        everySpecifier.add(`${basename(dirname(file))}/${stem.slice(2)}`)
    }
  for (const file of installed) {
    if (!SOURCE.test(file) || !existsSync(file)) continue
    if (!/[/](lib|hooks|utils)[/]/.test(file)) continue
    const tail = importTail(file)
    const folder = importTail(dirname(file) + "/index.ts")
    if (!everySpecifier.has(tail) && !everySpecifier.has(folder))
      add("unused", file, "nothing in the project imports this file")
  }

  // Files and packages of a framework, a tooling or a workspace tool the project did not choose.
  for (const file of files) {
    const name = basename(file)
    for (const [framework, pattern] of Object.entries(FRAMEWORK_FILES)) {
      if (framework === choices.framework) continue
      if (FRAMEWORK_FILES[choices.framework]?.source === pattern.source)
        continue
      if (installed.has(file) && pattern.test(name))
        add("framework", file, `a ${framework} file`)
    }
    for (const [tooling, pattern] of Object.entries(TOOLING_FILES))
      if (tooling !== choices.tooling && pattern.test(name))
        add(
          "tooling",
          file,
          `${tooling}'s file; the project lints with ${choices.tooling}`
        )
    for (const [monorepo, pattern] of Object.entries(MONOREPO_FILES))
      if (monorepo !== choices.monorepo && pattern.test(name))
        add(
          "tooling",
          file,
          `${monorepo}'s file; the workspace is ${choices.monorepo}`
        )
    if (name !== "package.json") continue
    const manifest = JSON.parse(readFileSync(file, "utf8")) as Record<
      string,
      Record<string, string> | undefined
    >
    const packages = Object.keys({
      ...manifest.dependencies,
      ...manifest.devDependencies,
    })
    for (const dependency of packages) {
      for (const [library, pattern] of otherIcons)
        if (pattern.test(dependency))
          add("icons", file, `depends on ${dependency} (${library})`)
      for (const [base, pattern] of otherBases)
        if (pattern.test(dependency))
          add("base", file, `depends on ${dependency} (${base})`)
      const lint: Record<string, RegExp> = {
        eslint: /^(eslint|prettier|@eslint\/|typescript-eslint|eslint-)/,
        oxlint: /^(oxlint|oxfmt)$/,
        biome: /^@biomejs\//,
      }
      for (const [tooling, pattern] of Object.entries(lint))
        if (tooling !== choices.tooling && pattern.test(dependency))
          // The Kirana plugin for ESLint is what Oxlint loads too.
          if (dependency !== "@kirana-style/eslint-plugin")
            add("tooling", file, `depends on ${dependency} (${tooling})`)
    }
  }
  return findings
}

/**
 * The rules a finding of which fails an install today. The others are reported until the registry
 * is clean of them (each is a fault being fixed); a rule moves here in the change that clears it.
 */
export const ENFORCED: readonly string[] = ["tooling", "leftover"]

/** The findings as lines, grouped by rule; `limit` lines per rule, then a count. */
export function report(findings: Finding[], limit = 12): string {
  const rules = new Map<string, Finding[]>()
  for (const finding of findings)
    rules.set(finding.rule, [...(rules.get(finding.rule) ?? []), finding])
  const lines: string[] = []
  for (const [rule, found] of rules) {
    lines.push(`  ${rule}: ${found.length}`)
    for (const finding of found.slice(0, limit))
      lines.push(`    ${finding.file}: ${finding.detail}`)
    if (found.length > limit) lines.push(`    … ${found.length - limit} more`)
  }
  return lines.join("\n")
}

if (import.meta.main) {
  const [root, ...rest] = process.argv.slice(2)
  const option = (name: string, fallback: string) => {
    const at = rest.indexOf(`--${name}`)
    return at === -1 ? fallback : (rest[at + 1] ?? fallback)
  }
  if (!root || !existsSync(root)) {
    console.error("install-audit: <root> --framework … --base … --icons …")
    process.exit(2)
  }
  const findings = audit(root, {
    framework: option("framework", "react"),
    base: option("base", "base"),
    iconLibrary: option("icons", "lucide"),
    tooling: option("tooling", "eslint"),
    monorepo: option("monorepo", "none"),
  })
  console.log(
    findings.length ? report(findings, 40) : "install-audit: nothing found"
  )
  process.exit(findings.length ? 1 : 0)
}
