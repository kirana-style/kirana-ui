/**
 * `<!-- ::anatomy tree="Dialog.Root|no element[Dialog.Trigger,Dialog.Portal[…]]" -->`: a
 * component's parts as frames, each inside the part that holds it, so the picture is the markup:
 * what a part may be written in is the frame around it. `rest` lists the parts the picture does
 * not hold, so none is left out.
 *
 * The tree is `Label|note[child,child]`: a note is what is true of the part's element ("no
 * element", "at the end of body").
 */
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

export function Anatomy({
  tree = "",
  rest = "",
}: {
  tree?: string
  rest?: string
}) {
  const parts = read(tree)
  const others = rest.split(",").filter(Boolean)
  if (!parts.length) return null
  return (
    <figure sx={styles.figure} data-slot="anatomy">
      <ul sx={styles.stack} role="list">
        {parts.map((each, at) => (
          <Frame key={`${each.label}-${at}`} part={each} />
        ))}
      </ul>
      <figcaption sx={styles.caption}>
        Each frame is a part, written inside the part whose frame is around it.
        A dashed frame is a part that draws no element of its own.
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
    </figure>
  )
}
