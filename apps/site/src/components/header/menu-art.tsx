/**
 * The small illustrations on the mega menu's featured cards, from the Kirana site's illustration
 * kit (`visuals.tsx`), the pieces they use only: a terminal card whose lines type in, and pills
 * with a tag. Each stands on its card's landscape; all of it follows the design's tokens and stops
 * moving under reduced motion.
 */
import { Fragment } from "react"
import { css, keyframes } from "@kirana-style/core"

import { hue } from "@/components/page/hue"
import { fontFamily } from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"

import type { Featured } from "./nav"

const REDUCED = "@media (prefers-reduced-motion: reduce)"
const mix = (color: string, percent: number) =>
  `color-mix(in oklab, ${color} ${percent}%, transparent)`

/** A card's shadow on the landscape: Kirana's lift. */
const LIFT =
  "0 1px 2px light-dark(rgb(0 0 0 / 0.04), rgb(0 0 0 / 0.4)), 0 12px 32px -12px light-dark(rgb(0 0 0 / 0.18), rgb(0 0 0 / 0.75))"

/** A terminal's line appearing, staying, and clearing for the next loop. */
const typeIn = keyframes({
  "0%": { opacity: 0, translate: "-4px 0" },
  "6%, 88%": { opacity: 1, translate: "0 0" },
  "96%, 100%": { opacity: 0, translate: "0 0" },
})
const blink = keyframes({
  "0%, 49%": { opacity: 1 },
  "50%, 100%": { opacity: 0 },
})

const styles = {
  card: css({
    width: "224px",
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    boxShadow: `0 0 0 2px ${theme.background}, 0 1px 2px rgb(0 0 0 / 0.06), 0 18px 40px -18px rgb(0 0 0 / 0.3)`,
    textAlign: "start",
  }),
  bar: css({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    paddingInline: "10px",
    paddingBlock: "6px",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
    backgroundColor: alpha.muted50,
  }),
  dots: css({ display: "flex", gap: "4px" }),
  dot: css({ width: "6px", height: "6px", borderRadius: radius.full }),
  red: css({ backgroundColor: "oklch(0.72 0.17 20)" }),
  amber: css({ backgroundColor: "oklch(0.82 0.15 80)" }),
  green: css({ backgroundColor: "oklch(0.76 0.15 160)" }),
  title: css({
    fontFamily: fontFamily.mono,
    fontSize: "0.625rem",
    color: theme.mutedForeground,
  }),
  body: css({
    display: "grid",
    paddingBlock: "4px",
    fontFamily: fontFamily.mono,
    fontSize: "0.6875rem",
    lineHeight: "1.55",
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    paddingInline: "10px",
    paddingBlock: "1px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  typed: css({
    animationName: { base: typeIn, [REDUCED]: "none" },
    animationDuration: "7s",
    animationTimingFunction: "ease-out",
    animationIterationCount: "infinite",
    animationFillMode: "both",
  }),
  prompt: css({ color: theme.mutedForeground }),
  strong: css({ color: theme.foreground }),
  caret: css({
    display: "inline-block",
    width: "6px",
    height: "0.9em",
    backgroundColor: theme.foreground,
    animationName: { base: blink, [REDUCED]: "none" },
    animationDuration: "1s",
    animationTimingFunction: "steps(1)",
    animationIterationCount: "infinite",
  }),
  stack: css({
    display: "grid",
    justifyItems: "center",
    gap: "10px",
  }),
  pill: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    height: "1.75rem",
    borderRadius: radius["4xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    paddingInlineStart: "6px",
    paddingInlineEnd: "12px",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.6875rem",
    color: theme.foreground,
    boxShadow: LIFT,
  }),
  active: css({ borderColor: mix(theme.foreground, 40) }),
  tag: css({
    display: "inline-flex",
    alignItems: "center",
    borderRadius: radius.md,
    paddingInline: "5px",
    paddingBlock: "1px",
    fontFamily: fontFamily.mono,
    fontSize: "0.5625rem",
    fontWeight: 500,
    lineHeight: "1rem",
    color: theme.mutedForeground,
    backgroundColor: theme.muted,
  }),
  // In the card's hue (its destination's).
  tagStrong: css({
    color: hue.on,
    backgroundColor: hue.base,
  }),
}

function Terminal({ lines }: { lines: readonly React.ReactNode[] }) {
  return (
    <div sx={styles.card}>
      <div sx={styles.bar}>
        <span sx={styles.dots}>
          <span sx={[styles.dot, styles.red]} />
          <span sx={[styles.dot, styles.amber]} />
          <span sx={[styles.dot, styles.green]} />
        </span>
        <span sx={styles.title}>~/app</span>
      </div>
      <div sx={styles.body}>
        {lines.map((line, index) => (
          <div
            key={index}
            sx={[styles.row, styles.typed]}
            style={{ animationDelay: `${index * 0.55}s` }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

function Pills({
  from,
  to,
}: {
  from: [tag: string, text: string]
  to: [tag: string, text: string]
}) {
  return (
    <div sx={styles.stack}>
      <span sx={styles.pill}>
        <span sx={styles.tag}>{from[0]}</span>
        {from[1]}
      </span>
      <span sx={[styles.pill, styles.active]}>
        <span sx={[styles.tag, styles.tagStrong]}>{to[0]}</span>
        {to[1]}
      </span>
    </div>
  )
}

const prompt = <span sx={styles.prompt}>$</span>

export function MenuArt({ kind }: { kind: Featured["art"] }) {
  switch (kind) {
    case "start":
      return (
        <Terminal
          lines={[
            <Fragment key="1">
              {prompt}
              <span sx={styles.strong}>npx kirana-style ui init</span>
            </Fragment>,
            <Fragment key="2">
              {prompt}
              <span sx={styles.strong}>npx kirana-style ui add button</span>
            </Fragment>,
            <Fragment key="3">
              {prompt}
              <span sx={styles.caret} />
            </Fragment>,
          ]}
        />
      )
    case "compile":
      return (
        <Pills from={["tw", "px-4 py-2"]} to={["kirana", "paddingInline"]} />
      )
  }
}
