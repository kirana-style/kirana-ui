/**
 * `<!-- ::demo-source item="form-rhf-demo" title="form.tsx" combinations="react/base,react/aria" -->`:
 * a demo's whole code as a titled code block, as shadcn/ui's `ComponentSource` shows a file (its
 * Forms guides build a form step by step, then show the finished one). The code is the registry's
 * (`DocsConfig.demoCode`, `/r/demos/<item>.json`), as the code under a preview reads it: for the
 * reader's framework and base and, where it draws icons, their icon library. Long code starts folded.
 *
 * With `parts="true"`, the demo's own parts instead (`/r/demos/<item>.parts.json`): the files of
 * its folder in `components/` that it imports, each as a titled block, for a framework whose demo
 * draws its rows with components of their own. A framework whose demo has none shows nothing.
 */
import { useEffect, useState } from "react"
import { css } from "@kirana-style/core"

import { combinationList, useCombination } from "../combination.ts"
import { useDocs } from "../provider.tsx"
import { spacing, theme } from "../tokens.ts"
import { CodeBlock } from "./code-block.tsx"
import { withShared } from "./shared-code.ts"

type Source = string | Record<string, string>
type DemoSources = Record<string, Source>
type DemoParts = Record<string, Record<string, Source>>
type Highlight = (source: string, lang: string) => string

const styles = {
  root: css({ marginBlock: spacing[6] }),
  missing: css({ color: theme.mutedForeground }),
}

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** Each file's language, by its extension. */
const LANGUAGES: Record<string, string> = {
  vue: "vue",
  svelte: "svelte",
  ts: "ts",
}

export function DemoSource({
  item,
  title,
  combinations,
  parts,
}: {
  item?: string
  title?: string
  combinations?: string
  parts?: string
}) {
  const { demoCode, iconLibrary } = useDocs()
  const { current } = useCombination(combinationList(combinations))
  const [sources, setSources] = useState<DemoSources | DemoParts | null>(null)
  const [highlight, setHighlight] = useState<Highlight>()
  const ownParts = parts === "true"

  useEffect(() => {
    if (!item || !demoCode) return
    let live = true
    const url = demoCode(item)
    fetch(ownParts ? url.replace(/\.json$/, ".parts.json") : url)
      .then((response) =>
        response.ok
          ? (response.json() as Promise<DemoSources | DemoParts>)
          : null
      )
      .then(
        (value) =>
          live &&
          setSources(
            withShared<Source | Record<string, Source>>(value ?? {}) as
              | DemoSources
              | DemoParts
          )
      )
      .catch(() => live && setSources({}))
    // The highlighter is the build's, loaded only where the code is shown.
    void import("@workspace/docs-core/highlight.ts").then(
      ({ highlightSource }) =>
        live &&
        setHighlight(
          () => (source: string, lang: string) => highlightSource(source, lang)
        )
    )
    return () => {
      live = false
    }
  }, [demoCode, item, ownParts])

  if (!item || !demoCode) return null
  if (!sources) return <p sx={styles.missing}>Loading the code for {item}…</p>
  const pick = (entry: Source | undefined) =>
    typeof entry === "string"
      ? entry
      : entry
        ? (entry[iconLibrary ?? "lucide"] ?? Object.values(entry)[0] ?? "")
        : ""
  if (ownParts) {
    const files = current ? (sources as DemoParts)[current.id] : undefined
    if (!files) return null
    return (
      <>
        {Object.entries(files).map(([path, entry]) => {
          const source = pick(entry)
          const lang = LANGUAGES[path.split(".").pop() ?? ""] ?? "tsx"
          return (
            <div key={path} sx={styles.root} data-slot="demo-source">
              <CodeBlock
                html={highlight ? highlight(source, lang) : escape(source)}
                source={source}
                lang={lang}
                title={path.split("/").pop()}
                collapsible
              />
            </div>
          )
        })}
      </>
    )
  }
  const source = pick((sources as DemoSources)[current?.id ?? ""])
  if (!source)
    return <p sx={styles.missing}>The code for {item} could not be loaded.</p>
  return (
    <div sx={styles.root} data-slot="demo-source">
      <CodeBlock
        html={highlight ? highlight(source, "tsx") : escape(source)}
        source={source}
        lang="tsx"
        title={title}
        collapsible
      />
    </div>
  )
}
