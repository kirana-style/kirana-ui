/**
 * `<!-- ::anatomy tree="Dialog.Root|no element[Dialog.Trigger,Dialog.Portal[…]]" -->`: a
 * component's parts as frames, each inside the part that holds it, so the picture is the markup:
 * what a part may be written in is the frame around it. `rest` lists the parts the picture does
 * not hold, so none is left out.
 *
 * The tree is `Label|note[child,child]`: a note is what is true of the part's element ("no
 * element", "at the end of body").
 */
import { useEffect, useRef, useState } from "react"
import { css } from "@kirana-style/core"

import {
  alpha,
  fontFamily,
  fontSize,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"

interface Part {
  label: string
  note?: string
  parts: Part[]
}

/** Reads `Label|note[child,child]`. */
function read(text: string): Part[] {
  let at = 0
  const list = (): Part[] => {
    const found: Part[] = []
    while (at < text.length && text[at] !== "]") {
      let name = ""
      while (at < text.length && !"[],".includes(text[at]!)) name += text[at++]
      const [label = "", note] = name.split("|")
      const part: Part = { label: label.trim(), parts: [] }
      if (note) part.note = note.trim()
      if (text[at] === "[") {
        at++
        part.parts = list()
        at++
      }
      if (part.label) found.push(part)
      if (text[at] === ",") at++
    }
    return found
  }
  return list()
}

const styles = {
  figure: css({
    marginBlock: spacing[6],
    marginInline: "0",
    padding: { base: spacing[3], "@media (min-width: 40rem)": spacing[6] },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
    overflowX: "auto",
  }),
  // With a picture: the figure is the frame's edge, and the views share one bar.
  framed: css({
    // Under the figure's own conditions: a plain value would not take the wider one's place.
    padding: { base: "0", "@media (min-width: 40rem)": "0" },
    overflow: "hidden",
  }),
  bar: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: spacing[2],
    paddingBlock: spacing[2],
    paddingInline: spacing[3],
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
    backgroundColor: theme.background,
  }),
  hint: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  switch: css({ display: "flex", gap: spacing[1] }),
  view: css({
    paddingBlock: spacing[1],
    paddingInline: spacing[2],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: "transparent", '[aria-pressed="true"]': theme.border },
    borderRadius: radius.md,
    backgroundColor: {
      base: "transparent",
      '[aria-pressed="true"]': alpha.muted50,
    },
    color: {
      base: theme.mutedForeground,
      '[aria-pressed="true"]': theme.foreground,
    },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    cursor: "pointer",
  }),
  picture: css({ display: "block", width: "100%", borderWidth: "0" }),
  inner: css({
    padding: { base: spacing[3], "@media (min-width: 40rem)": spacing[6] },
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    margin: "0",
    padding: "0",
    listStyleType: "none",
  }),
  part: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    minWidth: "max-content",
    paddingBlock: spacing[2],
    paddingInline: spacing[3],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.lg,
    backgroundColor: theme.background,
  }),
  // A part that draws no element of its own: it is there in the code, not in the page.
  ghost: css({ borderStyle: "dashed", backgroundColor: "transparent" }),
  head: css({
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: spacing[2],
  }),
  label: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.foreground,
  }),
  note: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  caption: css({
    marginBlockStart: spacing[4],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  rest: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing[2],
    marginBlockStart: spacing[2],
  }),
  chip: css({
    paddingBlock: spacing[1],
    paddingInline: spacing[2],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.md,
    backgroundColor: theme.background,
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.foreground,
  }),
}

function Frame({ part }: { part: Part }) {
  const ghost = part.note?.startsWith("no element")
  return (
    <li sx={[styles.part, ghost && styles.ghost]} data-slot="anatomy-part">
      <span sx={styles.head}>
        <code sx={styles.label}>{part.label}</code>
        {part.note ? <span sx={styles.note}>{part.note}</span> : null}
      </span>
      {part.parts.length ? (
        <ul sx={styles.stack} role="list">
          {part.parts.map((each, at) => (
            <Frame key={`${each.label}-${at}`} part={each} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

const VIEWS = [
  ["picture", "Picture"],
  ["structure", "Structure"],
] as const

export function Anatomy({
  tree = "",
  rest = "",
  demo,
  height = "460",
}: {
  tree?: string
  rest?: string
  /** The component's live demo: its picture is that demo, opened, with a line to each part. */
  demo?: string
  height?: string
}) {
  const parts = read(tree)
  const others = rest.split(",").filter(Boolean)
  const [view, setView] = useState<(typeof VIEWS)[number][0]>(
    demo ? "picture" : "structure"
  )
  // The picture says how tall it is once it is drawn: the frame is that tall, and no taller.
  const frame = useRef<HTMLIFrameElement>(null)
  const [tall, setTall] = useState(Number(height))
  useEffect(() => {
    const heard = (event: MessageEvent) => {
      const said = event.data as { type?: string; height?: number } | null
      if (
        event.source !== frame.current?.contentWindow ||
        said?.type !== "kui-anatomy"
      )
        return
      if (typeof said.height === "number")
        setTall(Math.min(900, Math.max(200, Math.round(said.height))))
    }
    window.addEventListener("message", heard)
    return () => window.removeEventListener("message", heard)
  }, [])
  if (!parts.length) return null
  return (
    <figure
      sx={[styles.figure, demo ? styles.framed : null]}
      data-slot="anatomy"
    >
      {demo ? (
        <div sx={styles.bar}>
          <span sx={styles.hint}>
            {view === "picture"
              ? "The live component, opened. Point at a name, or at a part."
              : "Each frame is a part, written inside the part whose frame is around it."}
          </span>
          <div sx={styles.switch} role="group" aria-label="Anatomy as">
            {VIEWS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                sx={styles.view}
                aria-pressed={view === id}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {demo && view === "picture" ? (
        <iframe
          ref={frame}
          sx={styles.picture}
          style={{ height: `${tall}px` }}
          src={`/preview/primitives/?demo=${encodeURIComponent(demo)}&style=css&view=anatomy`}
          title={`The parts of ${demo}`}
          loading="lazy"
        />
      ) : (
        <div sx={demo ? styles.inner : null}>
          <ul sx={styles.stack} role="list">
            {parts.map((each, at) => (
              <Frame key={`${each.label}-${at}`} part={each} />
            ))}
          </ul>
          <figcaption sx={styles.caption}>
            {demo
              ? "A dashed frame is a part that draws no element of its own."
              : "Each frame is a part, written inside the part whose frame is around it. A dashed frame is a part that draws no element of its own."}
            {others.length ? " Parts this picture does not hold:" : null}
          </figcaption>
          {others.length ? (
            <div sx={styles.rest}>
              {others.map((each) => (
                <code key={each} sx={styles.chip}>
                  {each}
                </code>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </figure>
  )
}
