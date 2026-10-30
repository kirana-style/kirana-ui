import { Badge } from "../../../ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../../ui/card"
import { Separator } from "../../../ui/separator"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    position: "relative",
    overflow: "hidden",
    borderRadius: radius.lg,
  }),
  img: css({
    aspectRatio: "1 / 1",
    width: "100%",
    objectFit: "cover",
  }),
  badge: css({
    position: { "*": null, base: "absolute" },
    top: { "*": null, base: space[3] },
    right: { "*": null, base: space[3] },
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  cardDescription: css({
    fontSize: { "*": null, base: fontSize.xs },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    textTransform: { "*": null, base: "uppercase" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      base: lineHeight.xs,
      [axes.style.vega]: lineHeight.xs,
      [axes.style.maia]: lineHeight.xs,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.xs,
      [axes.style.rhea]: lineHeight.xs,
    },
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div3: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  div4: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
  }),
  span: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  span2: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  div5: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
  }),
  span3: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  span4: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
}

export function AlbumCard() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          <img
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=800&fit=crop"
            alt="Synthetic Horizons EP cover art"
            sx={styles.img}
          />
          <Badge sx={styles.badge}>$26,033.79</Badge>
        </div>
        <div sx={styles.div2}>
          <CardTitle>Synthetic Horizons EP</CardTitle>
          <CardDescription sx={styles.cardDescription}>
            Released Aug 14, 2023
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Separator />
        <div sx={styles.div3}>
          <div sx={styles.div4}>
            <span sx={styles.span}>Tracks</span>
            <span sx={styles.span2}>6 Tracks</span>
          </div>
          <div sx={styles.div5}>
            <span sx={styles.span3}>Cumulative Streams</span>
            <span sx={styles.span4}>6,198,524</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
