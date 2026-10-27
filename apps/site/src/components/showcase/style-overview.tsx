/** Upstream's `preview` block's style overview: the design's style and fonts, named, over its colour tokens. */
import { css } from "@kirana-style/core"

import { usePageDesign } from "@/lib/page-design"
import { FONT_INFO, STYLE_INFO } from "@workspace/registry/core/config"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { font, radius, theme } from "@workspace/registry/core/tokens"
import { Card, CardContent } from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  overview: css({ display: "flex", flexDirection: "column", gap: space[6] }),
  heading: css({ display: "flex", flexDirection: "column", gap: space[1] }),
  overviewTitle: css({
    fontFamily: font.heading,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.medium,
  }),
  overviewText: css({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    color: theme.mutedForeground,
  }),
  swatches: css({
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: space[3],
  }),
  swatchCell: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[2],
  }),
  swatch: css({
    position: "relative",
    aspectRatio: "1",
    width: "100%",
    borderRadius: radius.lg,
    "::after": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.border,
    },
  }),
  swatchName: css({
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.6rem",
  }),
}

/** The tokens the style overview draws, under the custom property names upstream's card prints. */
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

/** The design's style and fonts, named, over its colour tokens. */
export function StyleOverview() {
  const { system } = usePageDesign()
  const heading =
    system.fontHeading !== "inherit" && system.fontHeading !== system.font
      ? FONT_INFO[system.fontHeading].title
      : FONT_INFO[system.font].title
  return (
    <Card>
      <CardContent sx={styles.overview}>
        <div sx={styles.heading}>
          <div sx={styles.overviewTitle}>
            {STYLE_INFO[system.style].title} - {heading}
          </div>
          <div sx={styles.overviewText}>
            Designers love packing quirky glyphs into test phrases. This is a
            preview of the typography styles.
          </div>
        </div>
        <div sx={styles.swatches}>
          {SWATCHES.map(([name, color]) => (
            <div key={name} sx={styles.swatchCell}>
              <div sx={[styles.swatch, color]} />
              <div sx={styles.swatchName}>{name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
