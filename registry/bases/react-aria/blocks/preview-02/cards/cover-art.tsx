import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../../ui/card"
import { Item } from "../../../ui/item"
import { Label } from "../../../ui/label"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
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
    gap: { "*": null, base: space[3] },
  }),
  label: css({
    textAlign: { "*": null, base: "center" },
    fontSize: { "*": null, base: fontSize.xs },
    fontWeight: { "*": null, base: fontWeight.normal },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    color: theme.mutedForeground,
    textTransform: { "*": null, base: "uppercase" },
  }),
  item: css({
    aspectRatio: { "*": null, base: "1 / 1" },
  }),
  label2: css({
    display: "flex",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  }),
  iconPlaceholder: css({
    width: space[10],
    height: space[10],
    color: `color-mix(in oklab, ${theme.mutedForeground} 50%, transparent)`,
  }),
  input: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  label3: css({
    width: "100%",
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  cardDescription: css({
    textAlign: { "*": null, base: "center" },
    fontSize: { "*": null, base: fontSize.xs },
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
}

export function CoverArt() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <Label htmlFor="cover-art" sx={styles.label}>
          Cover Art
        </Label>
        <Item sx={styles.item} variant="outline">
          <label htmlFor="cover-art" sx={styles.label2}>
            <IconPlaceholder
              lucide="ImageIcon"
              tabler="IconPhoto"
              hugeicons="Image01Icon"
              phosphor="ImageIcon"
              remixicon="RiImageLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </label>
        </Item>
        <input
          id="cover-art"
          type="file"
          accept="image/jpeg,image/png"
          sx={styles.input}
        />
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <label htmlFor="cover-art" sx={styles.label3}>
          <Button variant="secondary" sx={styles.button}>
            Upload Artwork
          </Button>
        </label>
        <CardDescription sx={styles.cardDescription}>
          Minimum 3000 × 3000px
          <br />
          JPEG or PNG only
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
