import { useEffect, useState } from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { CHAT_QUESTION, FIXTURES } from "@/components/typeset/fixtures"
import { loadFonts } from "@/components/typeset/fonts"
import {
  TYPESET_COMMAND,
  TYPESET_ITEMS,
  TYPESET_MESSAGE,
  fontsOf,
  measureOf,
  readTypesetParams,
  typesetVariables,
} from "@/lib/typeset"
import type { TypesetCommand, TypesetItem, TypesetParams } from "@/lib/typeset"
import registryCss from "@/styles/registry.css?url"
import typesetCss from "@workspace/registry/styles/typeset.css?url"
import {
  applyDocumentAttributes,
  documentAttributes,
  forwardModeKey,
  listenForDesign,
} from "@workspace/registry/core/preview"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import { typeset } from "@workspace/registry/styles/typeset.styles"

const styles = {
  // `flex min-h-svh justify-center px-6 pt-8 pb-24 md:pt-24 md:pb-32`, as upstream's frame.
  page: css({
    display: "flex",
    justifyContent: "center",
    minHeight: "100svh",
    paddingInline: space[6],
    paddingBlockStart: { base: space[8], [breakpoint.md]: space[24] },
    paddingBlockEnd: { base: space[24], [breakpoint.md]: space[32] },
  }),
  column: css({
    display: "flex",
    flexDirection: "column",
    gap: space[10],
    width: "100%",
  }),
  // The chat's question: page chrome, outside the typeset container.
  question: css({
    marginInlineStart: "auto",
    width: "fit-content",
    maxWidth: "65%",
    borderRadius: radius["4xl"],
    backgroundColor: theme.muted,
    paddingInline: space[4],
    paddingBlock: space["2.5"],
  }),
}

/**
 * `/preview/typeset/<item>`: one piece of rendered markdown in a typeset, as upstream's
 * `/preview/typeset/<name>`, for the builder's frame and to open on its own. The parameters are the
 * URL's (`?body=lora&size=16` …), then the builder's messages; the design is the site's, followed
 * live as every preview follows it. Its fonts load when a typeset names them.
 */
export const Route = createFileRoute("/preview/typeset/$item")({
  head: ({ params }) => ({
    meta: [{ title: `Typeset · ${params.item} · Preview` }],
    links: [
      { rel: "stylesheet", href: registryCss },
      { rel: "stylesheet", href: typesetCss },
    ],
  }),
  loader: ({ params }) => {
    if (!TYPESET_ITEMS.some((option) => option.value === params.item))
      throw notFound()
  },
  validateSearch: (search: Record<string, unknown>) => search,
  component: TypesetPreview,
})

/** Whether a key press belongs to something the reader is typing in. */
const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))

function TypesetPreview() {
  const item = Route.useParams().item as TypesetItem
  const search = Route.useSearch()
  const [params, setParams] = useState<TypesetParams>(() =>
    readTypesetParams(search)
  )

  useEffect(() => {
    void loadFonts(fontsOf(params))
  }, [params])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== location.origin) return
      if (event.data?.type === TYPESET_MESSAGE && event.data.params)
        setParams(readTypesetParams(event.data.params))
    }
    window.addEventListener("message", onMessage)
    // The builder's keys, sent up when the preview has the focus: R shuffles, ⇧R resets,
    // Ctrl/⌘ Z undoes and ⇧ redoes; D is the site's own, forwarded as every preview forwards it.
    const onKey = (event: KeyboardEvent) => {
      if (typing(event.target) || event.altKey || window.parent === window)
        return
      const key = event.key.toLowerCase()
      let command: TypesetCommand | undefined
      if ((event.metaKey || event.ctrlKey) && key === "z")
        command = event.shiftKey ? "redo" : "undo"
      else if (!event.metaKey && !event.ctrlKey && key === "r")
        command = event.shiftKey ? "reset" : "shuffle"
      if (!command) return
      event.preventDefault()
      window.parent.postMessage(
        { type: TYPESET_COMMAND, command },
        location.origin
      )
    }
    window.addEventListener("keydown", onKey)
    const stopKey = forwardModeKey(window)
    const stopDesign = listenForDesign(window, (next) =>
      applyDocumentAttributes(
        document.documentElement,
        documentAttributes(next)
      )
    )
    return () => {
      window.removeEventListener("message", onMessage)
      window.removeEventListener("keydown", onKey)
      stopKey()
      stopDesign()
    }
  }, [])

  const content = (
    <div
      className="typeset"
      sx={typeset}
      style={{ ...typesetVariables(params), width: "100%" }}
      // The fixtures are this site's own markup, fixed at build time.
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: FIXTURES[item] }}
    />
  )
  return (
    <div sx={styles.page}>
      {/* The measure in em at the typeset's size, as upstream's frame sizes it. */}
      <div
        sx={styles.column}
        style={{ maxWidth: measureOf(params), fontSize: `${params.size}px` }}
      >
        {item === "chat" ? (
          <div sx={styles.question}>{CHAT_QUESTION}</div>
        ) : null}
        {content}
      </div>
    </div>
  )
}
