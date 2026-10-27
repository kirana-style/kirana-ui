/**
 * An item's installed files, as the site's code views show them: its registry document fetched in
 * the browser (`DocsConfig.registryItem`, `/r/<item>.json`), its files for one framework and base
 * in the reader's style (docs-ui's `installedFiles`), and each file's markup, highlighted by the
 * build's highlighter once it has loaded on demand, escaped until then.
 */
import * as React from "react"

import { installedFiles } from "@workspace/docs-ui/markdown/component-code.tsx"
import { useDocs } from "@workspace/docs-ui/provider.tsx"

type Item = Parameters<typeof installedFiles>[0]
type Highlight = (source: string, lang: string) => string

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function useInstalledFiles(name: string, combination: string) {
  const { registryItem, codeStyle } = useDocs()
  const [item, setItem] = React.useState<Item | null>(null)
  const [failed, setFailed] = React.useState(false)
  const [highlight, setHighlight] = React.useState<Highlight>()

  React.useEffect(() => {
    if (!registryItem) return
    let live = true
    fetch(registryItem(name))
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status))
        return response.json() as Promise<Item>
      })
      .then((value) => live && setItem(value))
      .catch(() => live && setFailed(true))
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
  }, [name, registryItem])

  return {
    failed,
    files: item ? installedFiles(item, combination, codeStyle) : null,
    /** A file's markup: highlighted, or escaped while the highlighter loads. */
    html: (source: string, lang: string) =>
      highlight ? highlight(source, lang) : escape(source),
  }
}
