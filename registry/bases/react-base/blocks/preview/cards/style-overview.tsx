import { css } from "@kirana-style/core"

import { Card, CardContent } from "../../../ui/card"
import { DARK_SCHEME, axes } from "../../../../../core/axes"
import { FONT_INFO, STYLE_INFO } from "../../../../../core/config"
import { useDesign } from "../../../../../lib/use-design"
import { font, radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: {
      base: space[6],
      [axes.style.lyra]: space[4],
      [axes.style.mira]: space[4],
    },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  div2: css({
    fontFamily: font.heading,
    fontSize: {
      base: fontSize["2xl"],
      [axes.style.lyra]: fontSize.lg,
      [axes.style.mira]: fontSize.lg,
      [axes.style.sera]: fontSize.lg,
    },
    lineHeight: {
      base: lineHeight["2xl"],
      [axes.style.lyra]: lineHeight.lg,
      [axes.style.mira]: lineHeight.lg,
      [axes.style.sera]: lineHeight.lg,
    },
    fontWeight: {
      base: fontWeight.medium,
      [axes.style.sera]: fontWeight.semibold,
    },
    letterSpacing: { [axes.style.sera]: letterSpacing.wide },
    textTransform: { [axes.style.sera]: "uppercase" },
  }),
  div3: css({
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: {
      base: fontSize.base,
      [axes.style.lyra]: fontSize.sm,
      [axes.style.mira]: fontSize.sm,
      [axes.style.sera]: fontSize.sm,
    },
    color: theme.mutedForeground,
    // `text-base`'s own line height, which Sera's `leading-relaxed` replaces.
    lineHeight: {
      base: lineHeight.base,
      [axes.style.lyra]: lineHeight.sm,
      [axes.style.mira]: lineHeight.sm,
      [axes.style.sera]: leading.relaxed,
    },
  }),
  div4: css({
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: space[3],
  }),
  div5: css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  div6: css({
    position: "relative",
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: { base: radius.lg, [axes.style.sera]: "0" },
    "::after": {
      content: '""',
      position: "absolute",
      insetBlock: space["0"],
      insetInline: space["0"],
      borderRadius: { base: radius.lg, [axes.style.sera]: "0" },
      borderWidth: "1px",
      borderColor: theme.border,
      mixBlendMode: {
        base: "darken",
        [DARK_SCHEME]: { base: "lighten", [axes.mode.light]: "darken" },
        [axes.mode.dark]: "lighten",
      },
    },
  }),
  div7: css({
    display: { base: "none", [breakpoint.md]: "block" },
    maxWidth: {
      base: space[14],
      [axes.style.lyra]: space[10],
      [axes.style.mira]: space[10],
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.60rem",
  }),
}

/** The tokens the card draws, under the custom property names upstream's card prints. */
const SWATCHES = [
  ["--background", css({ backgroundColor: theme.background })],
  ["--foreground", css({ backgroundColor: theme.foreground })],
  ["--primary", css({ backgroundColor: theme.primary })],
  ["--secondary", css({ backgroundColor: theme.secondary })],
  ["--muted", css({ backgroundColor: theme.muted })],
  ["--accent", css({ backgroundColor: theme.accent })],
  ["--border", css({ backgroundColor: theme.border })],
  ["--chart-1", css({ backgroundColor: theme.chart1 })],
  ["--chart-2", css({ backgroundColor: theme.chart2 })],
  ["--chart-3", css({ backgroundColor: theme.chart3 })],
  ["--chart-4", css({ backgroundColor: theme.chart4 })],
  ["--chart-5", css({ backgroundColor: theme.chart5 })],
] as const

export function StyleOverview() {
  const style = useDesign("style")
  const bodyFont = useDesign("font")
  const fontHeading = useDesign("fontHeading")
  const heading =
    fontHeading !== "inherit" && fontHeading !== bodyFont
      ? FONT_INFO[fontHeading].title
      : FONT_INFO[bodyFont].title

  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          <div sx={styles.div2}>
            {STYLE_INFO[style].title} - {heading}
          </div>
          <div sx={styles.div3}>
            Designers love packing quirky glyphs into test phrases. This is a
            preview of the typography styles.
          </div>
        </div>
        <div sx={styles.div4}>
          {SWATCHES.map(([name, color]) => (
            <div key={name} sx={styles.div5}>
              <div sx={[styles.div6, color]} />
              <div sx={styles.div7}>{name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
