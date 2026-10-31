/**
 * `<!-- ::demo-source item="form-rhf-demo" title="form.tsx" combinations="react/base,react/aria" -->`:
 * a demo's whole code as a titled code block, as shadcn/ui's `ComponentSource` shows a file (its
 * Forms guides build a form step by step, then show the finished one). The code is the registry's
 * (`DocsConfig.demoCode`, `/r/demos/<item>.json`), as the code under a preview reads it: for the
 * reader's framework and base and, where it draws icons, their icon library. Long code starts folded.
 */
import { useEffect, useState } from "react"
import { css } from "@kirana-style/core"

import { combinationList, useCombination } from "../combination.ts"
import { useDocs } from "../provider.tsx"
import { spacing, theme } from "../tokens.ts"
import { CodeBlock } from "./code-block.tsx"

type DemoSources = Record<string, string | Record<string, string>>
type Highlight = (source: string, lang: string) => string

const styles = {
  root: css({ marginBlock: spacing[6] }),
  missing: css({ color: theme.mutedForeground }),
}

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function DemoSource({
  item,
  title,
  combinations,
}: {
  item?: string
  title?: string
  combinations?: string
}) {
  const { demoCode, iconLibrary } = useDocs()
  const { current } = useCombination(combinationList(combinations))
  const [sources, setSources] = useState<DemoSources | null>(null)
  const [highlight, setHighlight] = useState<Highlight>()

  useEffect(() => {
    if (!item || !demoCode) return
    let live = true
    fetch(demoCode(item))
      .then((response) =>
        response.ok ? (response.json() as Promise<DemoSources>) : null
      )
      .then((value) => live && setSources(value ?? {}))
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
  }, [demoCode, item])

  if (!item || !demoCode) return null
  if (!sources) return <p sx={styles.missing}>Loading the code for {item}…</p>
  const entry = current ? sources[current.id] : undefined
  const source =
    typeof entry === "string"
      ? entry
      : entry
        ? (entry[iconLibrary ?? "lucide"] ?? Object.values(entry)[0] ?? "")
        : ""
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
