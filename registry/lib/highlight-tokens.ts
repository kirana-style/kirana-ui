/**
 * Syntax highlighting for Code Block: shadcn/ui's `lib/highlighter.tsx` (MIT) on TanStack Highlight
 * in place of Shiki, as tokens per line, for each framework's highlighter to draw. It is
 * synchronous, so a server renders the same coloured lines the browser hydrates, and each token is
 * a class of a small set, coloured by `highlight.styles.ts`. Terminal output (`ansi`) is read here:
 * its colours and dimming become the same token colours.
 */
import { createHighlighter } from "@tanstack/highlight/core"
import type {
  HighlightToken,
  HighlightTokenClass,
} from "@tanstack/highlight/core"
import { css } from "@tanstack/highlight/languages/css"
import { diff } from "@tanstack/highlight/languages/diff"
import { html } from "@tanstack/highlight/languages/html"
import { js } from "@tanstack/highlight/languages/js"
import { json } from "@tanstack/highlight/languages/json"
import { jsx } from "@tanstack/highlight/languages/jsx"
import { markdown } from "@tanstack/highlight/languages/markdown"
import { plaintext } from "@tanstack/highlight/languages/plaintext"
import { python } from "@tanstack/highlight/languages/python"
import { shell } from "@tanstack/highlight/languages/shell"
import { sql } from "@tanstack/highlight/languages/sql"
import { ts } from "@tanstack/highlight/languages/ts"
import { tsx } from "@tanstack/highlight/languages/tsx"
import { yaml } from "@tanstack/highlight/languages/yaml"

// Add the languages you need; a language that is not listed reads as plain text.
const highlighter = createHighlighter({
  fallbackLanguage: "plaintext",
  languages: [
    plaintext,
    shell,
    css,
    diff,
    html,
    js,
    json,
    jsx,
    markdown,
    python,
    sql,
    tsx,
    ts,
    yaml,
  ],
})

const aliases: Record<string, string> = {
  bash: "shell",
  javascript: "js",
  md: "markdown",
  py: "python",
  sh: "shell",
  shellscript: "shell",
  typescript: "ts",
  yml: "yaml",
  zsh: "shell",
}

/** SGR colours, foreground and bright, as the token colours nearest them. */
const ANSI_COLOURS: Record<number, HighlightTokenClass> = {
  30: "comment",
  31: "deleted",
  32: "inserted",
  33: "type",
  34: "link",
  35: "function",
  36: "string",
  37: "meta",
}

const ESCAPE = "\u001b["

/** Terminal output as tokens: each run of text with the colour its escape codes left it in. */
function ansiTokens(code: string): HighlightToken[] {
  const tokens: HighlightToken[] = []
  let colour: HighlightTokenClass | undefined
  let dim = false
  let index = 0
  while (index < code.length) {
    const start = code.indexOf(ESCAPE, index)
    const text = code.slice(index, start === -1 ? undefined : start)
    if (text) {
      const className = colour ?? (dim ? "comment" : undefined)
      tokens.push(className ? { className, value: text } : { value: text })
    }
    if (start === -1) break
    const end = code.indexOf("m", start)
    if (end === -1) break
    for (const part of code.slice(start + ESCAPE.length, end).split(";")) {
      const value = Number(part || 0)
      if (value === 0) {
        colour = undefined
        dim = false
      } else if (value === 2) dim = true
      else if (value === 22) dim = false
      else if (value === 39) colour = undefined
      else if (ANSI_COLOURS[value % 60]) colour = ANSI_COLOURS[value % 60]
    }
    index = end + 1
  }
  return tokens
}

/** Terminal output without its escape codes: the text a copy button copies. */
export function ansiText(code: string) {
  return ansiTokens(code)
    .map((token) => token.value)
    .join("")
}

export function tokenize(code: string, language: string): HighlightToken[] {
  const name = language.toLowerCase()
  if (name === "ansi") return ansiTokens(code)
  return highlighter.tokenize(code, { lang: aliases[name] ?? name }).tokens
}

/** The code's lines, each its tokens: a token's text never holds a line break. */
export function highlightLines(code: string, language: string) {
  const lines: HighlightToken[][] = [[]]
  for (const token of tokenize(code, language)) {
    token.value.split("\n").forEach((part, row) => {
      if (row > 0) lines.push([])
      if (part) lines[lines.length - 1].push({ ...token, value: part })
    })
  }
  return lines
}
