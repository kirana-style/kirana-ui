/**
 * The project pages' cards, as the Kirana site's `cards.tsx`: a grid, and a card with its glyph,
 * a title and a line, a link when it has somewhere to go, lifting on hover.
 */
import { css } from "@kirana-style/core"

import { DocsLink } from "@/components/docs-link"
import { IconTile } from "@/components/header/icon-tile"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import type { IconProps } from "@workspace/ui/primitives/icon"
import { hue } from "./hue"

const LIFT =
  "0 1px 2px light-dark(rgb(0 0 0 / 0.04), rgb(0 0 0 / 0.4)), 0 12px 32px -12px light-dark(rgb(0 0 0 / 0.18), rgb(0 0 0 / 0.75))"

const styles = {
  grid: css({
    display: "grid",
    gap: space[4],
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(var(--cols, 3), minmax(0, 1fr))",
    },
  }),
  card: css({
    display: "grid",
    gap: space[3],
    alignContent: "start",
    justifyItems: "start",
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    boxShadow: { base: "0 0 0 0 transparent", ":is(a):hover": LIFT },
    backgroundColor: theme.card,
    padding: space[6],
    textDecorationLine: "none",
    color: theme.foreground,
    transitionProperty: "box-shadow",
    transitionDuration: "200ms",
  }),
  title: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  }),
  meta: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    color: hue.base,
  }),
  text: css({
    fontSize: fontSize.sm,
    lineHeight: "1.65",
    color: theme.mutedForeground,
  }),
}

export function CardGrid({
  cols = 3,
  children,
}: {
  cols?: 2 | 3 | 4
  children: React.ReactNode
}) {
  return (
    <div sx={styles.grid} style={{ "--cols": cols } as React.CSSProperties}>
      {children}
    </div>
  )
}

export function Card({
  icon,
  title,
  meta,
  href,
  children,
}: {
  icon?: IconProps["icon"]
  title: React.ReactNode
  meta?: React.ReactNode
  href?: string
  children?: React.ReactNode
}) {
  const body = (
    <>
      {icon ? <IconTile icon={icon} /> : null}
      <span sx={styles.title}>{title}</span>
      {meta ? <span sx={styles.meta}>{meta}</span> : null}
      {children ? <span sx={styles.text}>{children}</span> : null}
    </>
  )
  return href ? (
    <DocsLink href={href} sx={styles.card}>
      {body}
    </DocsLink>
  ) : (
    <div sx={styles.card}>{body}</div>
  )
}
