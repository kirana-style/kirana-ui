/**
 * The site's picture card, as the Kirana site's `illustrated-card.tsx`: a drawing from the
 * illustration kit on top, inset and rounded inside the card's frame so the two curves stay
 * concentric, then a title with a quiet mono note at its end, a line of text, and pill links
 * onward. The whole drawing rises a little while its card is hovered. With `row`, for cards that
 * stand three in a row on a wide screen, the drawing sits beside the words between `md` and `xl`,
 * where a third of the page is too narrow for it and the whole width too wide.
 */
import { css } from "@kirana-style/core"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { DocsLink } from "@/components/docs-link"
import { Stage } from "@/components/scenery/kit"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import { Icon } from "@workspace/shell/icon"
import { hue } from "./hue"

const REDUCED = "@media (prefers-reduced-motion: reduce)"
const COARSE = "@media (pointer: coarse)"
const mix = (color: string, percent: number) =>
  `color-mix(in oklab, ${color} ${percent}%, transparent)`

/** The gap between a card's edge and its picture. */
const INSET = space[2]
const REST = "0 0 0 0 transparent"
const LIFT =
  "0 1px 2px light-dark(rgb(0 0 0 / 0.04), rgb(0 0 0 / 0.4)), 0 12px 32px -12px light-dark(rgb(0 0 0 / 0.18), rgb(0 0 0 / 0.75))"

const styles = {
  card: css({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
    padding: INSET,
    borderRadius: radius["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    boxShadow: { base: REST, ":hover": LIFT },
    backgroundColor: theme.card,
    transitionProperty: "box-shadow",
    transitionDuration: "200ms",
  }),
  // Three in a row from `xl`; from `md` up to it, the picture beside the words.
  row: css({
    gridTemplateRows: {
      base: "auto 1fr",
      [breakpoint.md]: "none",
      [breakpoint.xl]: "auto 1fr",
    },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "minmax(0, 1.15fr) minmax(0, 1fr)",
      [breakpoint.xl]: "minmax(0, 1fr)",
    },
  }),
  rowBody: css({
    alignContent: { [breakpoint.md]: "center", [breakpoint.xl]: "start" },
  }),
  picture: css({
    overflow: "hidden",
    height: "13rem",
    borderRadius: `calc(${radius["3xl"]} - ${INSET})`,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  rise: css({
    transitionProperty: "translate",
    transitionDuration: { base: "300ms", [REDUCED]: "0s" },
    translate: { base: "0 0", ":is([data-card]:hover *)": "0 -4px" },
  }),
  body: css({
    display: "grid",
    alignContent: "start",
    gap: space[2],
    padding: { base: space[4], [breakpoint.md]: space[5] },
  }),
  title: css({
    display: "flex",
    alignItems: "baseline",
    gap: space[2],
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  }),
  note: css({
    marginInlineStart: "auto",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
  }),
  text: css({
    fontSize: fontSize.sm,
    lineHeight: "1.6",
    color: theme.mutedForeground,
    textWrap: "pretty",
  }),
  links: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
    marginBlockStart: space[2],
    padding: 0,
    listStyleType: "none",
  }),
  pill: css({
    display: "inline-flex",
    alignItems: "center",
    gap: space[1],
    height: space[7],
    // A finger's height on a touch screen.
    minHeight: { [COARSE]: "2.75rem" },
    paddingInline: space["2.5"],
    borderRadius: radius.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: theme.border, ":hover": mix(hue.base, 40) },
    backgroundColor: { base: theme.background, ":hover": mix(hue.base, 8) },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: { base: theme.foreground, ":hover": hue.base },
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    transitionProperty: "border-color, background-color, color",
    transitionDuration: "150ms",
  }),
}

export type CardLink = { title: string; href: string }

export function IllustratedCard({
  art,
  title,
  note,
  text,
  links,
  row,
}: {
  /** The scene, drawn on the stage's grid and glow. */
  art: React.ReactNode
  title: React.ReactNode
  /** A quiet mono note at the title's end: a count, a status. */
  note?: React.ReactNode
  text: React.ReactNode
  links?: readonly CardLink[]
  /** One of three in a row on a wide screen: its picture goes beside its words on a tablet. */
  row?: boolean
}) {
  return (
    <section data-card="" sx={[styles.card, row && styles.row]}>
      <div sx={styles.picture}>
        <Stage>
          <div sx={styles.rise}>{art}</div>
        </Stage>
      </div>
      <div sx={[styles.body, row && styles.rowBody]}>
        <h3 sx={styles.title}>
          {title}
          {note ? <span sx={styles.note}>{note}</span> : null}
        </h3>
        <p sx={styles.text}>{text}</p>
        {links ? (
          <ul sx={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <DocsLink href={link.href} sx={styles.pill}>
                  {link.title}
                  <Icon icon={ArrowRight01Icon} size="0.75rem" />
                </DocsLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
