/**
 * What the primitives' pages are generated from: the reference each `@kirana-ui/*` adapter ships
 * (`llms.txt`, generated from the library's own definitions) and `@kirana-ui/vocabulary`, both
 * read from the installed packages, so a page says what the pinned version does.
 */
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"

const require = createRequire(import.meta.url)

export const FRAMEWORKS = [
  "react",
  "vue",
  "svelte",
  "solid",
  "angular",
] as const
export type Framework = (typeof FRAMEWORKS)[number]

/** A file of an installed `@kirana-ui/*` package. */
export function packageFile(name: string, file: string): string {
  return readFileSync(
    join(dirname(require.resolve(`@kirana-ui/${name}/package.json`)), file),
    "utf8"
  )
}

export interface Reference {
  /** As the reference heads it: `AlertDialog`. */
  name: string
  /** The line that imports it. */
  import: string
  /** Its parts, as the framework writes them. */
  parts: string[]
  /** The first part's tag, where it has parts: `Dialog.Root`. */
  first?: string
  /** The rest of its section: props, attributes and variables, as Markdown. */
  body: string
}

/** A framework's reference, by component. */
export function reference(framework: Framework): Map<string, Reference> {
  const text = packageFile(framework, "llms.txt")
  const sections = text
    .slice(text.indexOf("\n## Components"))
    .split(/\n### /)
    .slice(1)
  const found = new Map<string, Reference>()
  for (const section of sections) {
    const name = section.slice(0, section.indexOf("\n")).trim()
    const code = /```\n([\s\S]*?)\n```/.exec(section)
    const partsLine = /^Parts: (.+)\.$/m.exec(section)
    const parts = partsLine
      ? [...partsLine[1]!.matchAll(/`([^`]+)`/g)].map((each) => each[1]!)
      : []
    let body = section.slice(section.indexOf("\n") + 1)
    // Each is in the section once: taken out by where it is, not by a pattern.
    for (const taken of [code?.[0], partsLine?.[0]]) {
      const at = taken ? body.indexOf(taken) : -1
      if (taken && at >= 0)
        body = body.slice(0, at) + body.slice(at + taken.length)
    }
    const first = /^<([\w.]+)>$/.exec(parts[0] ?? "")?.[1]
    found.set(name, {
      name,
      import: code?.[1] ?? "",
      parts,
      ...(first ? { first } : {}),
      body: body.trim(),
    })
  }
  return found
}

/** What is said for every component of a framework: the reference's "Using it". */
export function usage(framework: Framework): string[] {
  const text = packageFile(framework, "llms.txt")
  const from = text.indexOf("\n## Using it")
  return text
    .slice(from, text.indexOf("\n## Components"))
    .split("\n")
    .filter((line) => line.startsWith("- "))
}

/** Parts of the library that are not components of their own page. */
const NOT_PAGES = new Set(["DirectionProvider", "PortalProvider"])

/** The components, as React's reference names them. */
export function components(): Reference[] {
  return [...reference("react").values()].filter(
    (each) => !NOT_PAGES.has(each.name)
  )
}
