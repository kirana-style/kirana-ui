/**
 * The code under a demo's preview, as upstream's component preview shows it: its first lines faded
 * under a View Code button, then the whole demo, scrolling within 18rem, with a copy button. The
 * code is the registry's (`DocsConfig.demoCode`, `/r/demos/<item>.json`): the demo as a project
 * writes it, for the reader's framework and base and, where it draws icons, their icon library
 * (`DocsConfig.iconLibrary`). Fetched and highlighted in the browser once the page has hydrated;
 * the folded panel keeps its height while it loads, so nothing under it moves.
 */
import { useEffect, useState } from "react"
import { css } from "@kirana-style/core"

import { Button } from "@workspace/registry/bases/react-base/ui/button"

import { useDocs } from "../provider.tsx"
import { fontFamily, spacing, theme } from "../tokens.ts"
import { CopyButton } from "./code-block.tsx"

/** Per `framework/base`: one source, or one per icon library. */
type DemoSources = Record<string, string | Record<string, string>>

/** Lines the folded panel shows, as upstream's `maxLines`. */
const FOLDED_LINES = 3
const LINE = "1.6"

const styles = {
  root: css({
    position: "relative",
    borderBlockStartWidth: "1px",
    borderBlockStartStyle: "solid",
    borderBlockStartColor: theme.border,
    backgroundColor: theme.muted,
  }),
  pre: css({
    margin: 0,
    paddingInline: spacing[4],
    paddingBlock: spacing["3.5"],
    overflow: "auto",
    maxHeight: "18rem",
    fontFamily: fontFamily.mono,
    fontSize: "0.8125rem",
    lineHeight: LINE,
    tabSize: 2,
  }),
  // Three lines and the padding, whether the code has come or not.
  folded: css({
    overflow: "hidden",
    height: `calc(${FOLDED_LINES} * 0.8125rem * ${LINE} + 2 * ${spacing["3.5"]})`,
  }),
  // Upstream's gradient to the panel's colour, the button in its middle.
  fade: css({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(to top, ${theme.muted}, color-mix(in oklab, ${theme.muted} 60%, transparent), transparent)`,
  }),
  copy: css({
    position: "absolute",
    insetBlockStart: spacing[2],
    insetInlineEnd: spacing[2],
  }),
}

type Highlight = (source: string, lang: string) => string

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const LANGUAGES: Record<string, string> = {
  vue: "vue",
  svelte: "svelte",
  angular: "ts",
}

export function DemoCode({
  item,
  combination,
}: {
  item: string
  /** `framework/base`, the reader's. */
  combination: string
}) {
  const { demoCode, iconLibrary } = useDocs()
  const [sources, setSources] = useState<DemoSources | null>(null)
  const [highlight, setHighlight] = useState<Highlight>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!demoCode) return
    let live = true
    fetch(demoCode(item))
      .then((response) =>
        response.ok ? (response.json() as Promise<DemoSources>) : null
      )
      .then((value) => live && setSources(value ?? {}))
      .catch(() => live && setSources({}))
    // The highlighter is the build's, loaded only where a panel is shown.
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

  if (!demoCode) return null
  const entry = sources?.[combination]
  // Loaded, and nothing for this framework and base: no panel.
  if (sources && entry === undefined) return null
  const source =
    typeof entry === "string"
      ? entry
      : entry
        ? (entry[iconLibrary ?? "lucide"] ?? Object.values(entry)[0] ?? "")
        : ""
  const lang = LANGUAGES[combination.split("/")[0] ?? ""] ?? "tsx"
  const shown = open
    ? source
    : source.split("\n").slice(0, FOLDED_LINES).join("\n")
  const html = highlight ? highlight(shown, lang) : escape(shown)

  return (
    <div sx={styles.root} data-slot="demo-code">
      <pre
        sx={[styles.pre, open ? null : styles.folded]}
        data-slot="code-block-source"
        data-lang={lang}
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      {open ? (
        <CopyButton source={source} sx={styles.copy} />
      ) : (
        <div sx={styles.fade}>
          <Button
            variant="outline"
            size="sm"
            disabled={!sources}
            onClick={() => setOpen(true)}
          >
            View Code
          </Button>
        </div>
      )}
    </div>
  )
}
