/**
 * `<!-- ::primitive-preview demo="dialog" height="360" -->`: a primitive drawn live in a frame,
 * with a switch between the browser's own look (Raw) and the same markup styled with CSS
 * Modules, Tailwind and Kirana. Each is a page of the primitives' preview app
 * (`/preview/primitives/?demo=…&style=…`), which loads that one style's stylesheet and no
 * other, so Raw is truly unstyled.
 */
import { useState } from "react"
import { css } from "@kirana-style/core"

import {
  alpha,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"

const STYLES = [
  ["css", "CSS Modules"],
  ["tailwind", "Tailwind"],
  ["kirana", "Kirana"],
  ["raw", "Raw"],
] as const

const styles = {
  root: css({
    marginBlock: spacing[6],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.xl,
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
    backgroundColor: alpha.muted50,
  }),
  label: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  group: css({ display: "flex", flexWrap: "wrap", gap: spacing[1] }),
  choice: css({
    paddingBlock: spacing[1],
    paddingInline: spacing[2],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: "transparent", '[aria-pressed="true"]': theme.border },
    borderRadius: radius.md,
    backgroundColor: {
      base: "transparent",
      '[aria-pressed="true"]': theme.background,
    },
    color: {
      base: theme.mutedForeground,
      '[aria-pressed="true"]': theme.foreground,
    },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    cursor: "pointer",
  }),
  frame: css({
    display: "block",
    width: "100%",
    borderWidth: "0",
    backgroundColor: theme.background,
  }),
}

export function PrimitivePreview({
  demo = "",
  height = "360",
}: {
  demo?: string
  height?: string
}) {
  const [style, setStyle] = useState<(typeof STYLES)[number][0]>("css")
  if (!demo) return null
  return (
    <div sx={styles.root} data-slot="primitive-preview">
      <div sx={styles.bar}>
        <span sx={styles.label}>Styled with</span>
        <div sx={styles.group} role="group" aria-label="Styling">
          {STYLES.map(([id, label]) => (
            <button
              key={id}
              type="button"
              sx={styles.choice}
              aria-pressed={style === id}
              onClick={() => setStyle(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <iframe
        // A page of its own a style: a new frame, so no stylesheet of the last one is left.
        key={style}
        sx={styles.frame}
        style={{ height: `${height}px` }}
        src={`/preview/primitives/?demo=${encodeURIComponent(demo)}&style=${style}`}
        title={`${demo}, ${STYLES.find(([id]) => id === style)?.[1]}`}
        loading="lazy"
      />
    </div>
  )
}
