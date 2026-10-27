/**
 * A block's code, as upstream's block viewer shows it (from `lg`, as its Code tab is): the files
 * installing it writes, in a tree of their folders, beside the chosen file, in the docs' code frame
 * (a muted frame, a caption row with the path and copy, the code inset in a panel), here holding the
 * tree and the code side by side. Read from the block's registry document in the browser,
 * for the framework and base shown and the reader's style, as docs-ui's code panel reads a
 * component's (`installedFiles`), and highlighted with the build's highlighter, loaded on demand.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { File01Icon, Folder01Icon } from "@hugeicons/core-free-icons"

import { useDocs } from "@workspace/docs-ui/provider.tsx"
import { CopyButton } from "@workspace/docs-ui/markdown/code-block.tsx"
import { installedFiles } from "@workspace/docs-ui/markdown/component-code.tsx"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, theme } from "@workspace/registry/core/tokens"
import { Icon } from "@workspace/ui/primitives/icon"

type Item = Parameters<typeof installedFiles>[0]
type Highlight = (source: string, lang: string) => string

const styles = {
  // The docs' code frame (`code-block.tsx`): a muted frame, 3px of it round the inset panel.
  root: css({
    display: "flex",
    flexDirection: "column",
    height: "var(--block-height)",
    padding: "3px",
    borderRadius: "1.125rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: alpha.muted50,
  }),
  // The caption row: "Files" over the tree's column, then the shown file's path and copy.
  header: css({
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    color: theme.mutedForeground,
  }),
  headerFiles: css({
    flexShrink: 0,
    width: space[72],
    paddingInline: space[3],
    paddingBlock: space[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
  }),
  headerFile: css({
    display: "flex",
    flex: "1 1 0%",
    minWidth: 0,
    alignItems: "center",
    gap: space[2],
    paddingInline: space[3],
    paddingBlock: space[1],
  }),
  path: css({
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
  }),
  copy: css({ marginInlineStart: "auto" }),
  // The inset panel, the tree and the code side by side in it.
  panel: css({
    display: "flex",
    flex: "1 1 0%",
    minHeight: 0,
    overflow: "hidden",
    borderRadius: "0.875rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  // `w-72`, the files: a column of their folders and names.
  tree: css({
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    width: space[72],
    paddingBlock: space[2],
    overflowY: "auto",
    borderInlineEndWidth: "1px",
    borderInlineEndStyle: "solid",
    borderInlineEndColor: theme.border,
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    width: "100%",
    minHeight: space[8],
    paddingInlineEnd: space[3],
    borderWidth: 0,
    backgroundColor: {
      base: "transparent",
      ":hover": alpha.muted50,
      '[aria-current="true"]': alpha.muted50,
    },
    color: theme.foreground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textAlign: "start",
    whiteSpace: "nowrap",
    cursor: "pointer",
  }),
  folder: css({ color: theme.mutedForeground, cursor: "default" }),
  rowIcon: css({ flexShrink: 0, width: space[4], height: space[4] }),
  // The chosen file: its own scroller, as the docs' code block's `pre`.
  code: css({
    flex: "1 1 0%",
    minWidth: 0,
    overflow: "auto",
    scrollbarWidth: "thin",
  }),
  pre: css({
    margin: 0,
    paddingInline: space[4],
    paddingBlock: space["3.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.8125rem",
    lineHeight: "1.6",
    tabSize: 2,
  }),
  message: css({
    padding: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

/** The files as a tree's rows, as upstream's file tree: in each folder, its folders, then its files. */
function rows(files: readonly string[]) {
  type Node = { folders: Map<string, Node>; files: string[] }
  const root: Node = { folders: new Map(), files: [] }
  for (const file of files) {
    let node = root
    for (const part of file.split("/").slice(0, -1)) {
      let next = node.folders.get(part)
      if (!next)
        node.folders.set(part, (next = { folders: new Map(), files: [] }))
      node = next
    }
    node.files.push(file)
  }
  const out: { label: string; depth: number; file?: string }[] = []
  const walk = (node: Node, depth: number) => {
    for (const [name, folder] of [...node.folders].sort(([a], [b]) =>
      a.localeCompare(b)
    )) {
      out.push({ label: name, depth })
      walk(folder, depth + 1)
    }
    for (const file of [...node.files].sort())
      out.push({ label: file.split("/").pop()!, depth, file })
  }
  walk(root, 0)
  return out
}

const escape = (source: string) =>
  source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

export function BlockCode({
  name,
  combination,
}: {
  name: string
  combination: string
}) {
  const { registryItem, codeStyle } = useDocs()
  const [item, setItem] = React.useState<Item | null>(null)
  const [failed, setFailed] = React.useState(false)
  const [highlight, setHighlight] = React.useState<Highlight>()
  const [chosen, setChosen] = React.useState<string>()

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

  if (failed)
    return (
      <div sx={styles.root}>
        <div sx={styles.panel}>
          <p sx={styles.message}>The code for {name} could not be loaded.</p>
        </div>
      </div>
    )
  if (!item)
    return (
      <div sx={styles.root}>
        <div sx={styles.panel}>
          <p sx={styles.message}>Loading the code for {name}…</p>
        </div>
      </div>
    )

  const files = installedFiles(item, combination, codeStyle)
  // The block's page first, as upstream's viewer opens on it.
  const first =
    files.find((file) => file.file.includes(`/blocks/${name}/`)) ?? files[0]
  const shown = files.find((file) => file.file === chosen) ?? first
  return (
    <figure sx={styles.root} data-slot="block-code">
      <figcaption sx={styles.header}>
        <span sx={styles.headerFiles}>Files</span>
        <span sx={styles.headerFile}>
          <Icon icon={File01Icon} size="0.875rem" />
          <span sx={styles.path}>{shown?.file}</span>
          {shown ? <CopyButton source={shown.source} sx={styles.copy} /> : null}
        </span>
      </figcaption>
      <div sx={styles.panel}>
        <nav sx={styles.tree} aria-label={`The files of ${name}`}>
          {rows(files.map((file) => file.file)).map((row) => (
            <button
              key={row.file ?? `${row.depth}/${row.label}`}
              type="button"
              disabled={!row.file}
              aria-current={row.file ? row.file === shown?.file : undefined}
              sx={[styles.row, !row.file && styles.folder]}
              style={{ paddingInlineStart: `${1 + row.depth * 1.25}rem` }}
              onClick={() => row.file && setChosen(row.file)}
            >
              <Icon
                icon={row.file ? File01Icon : Folder01Icon}
                sx={styles.rowIcon}
              />
              {row.label}
            </button>
          ))}
        </nav>
        <div sx={styles.code}>
          {shown ? (
            <pre
              key={shown.file}
              sx={styles.pre}
              data-slot="code-block-source"
              data-lang={shown.lang}
              data-line-numbers=""
            >
              <code
                dangerouslySetInnerHTML={{
                  __html: highlight
                    ? highlight(shown.source, shown.lang)
                    : escape(shown.source),
                }}
              />
            </pre>
          ) : null}
        </div>
      </div>
    </figure>
  )
}
