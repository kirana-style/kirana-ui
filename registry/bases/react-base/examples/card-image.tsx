import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { css } from "@kirana-style/core"
import { DARK_SCHEME, axes } from "../../../core/axes"
import { color, containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  card: css({
    position: { "*": null, base: "relative" },
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingTop: { "*": null, base: space["0"] },
  }),
  div: css({
    position: "absolute",
    inset: space["0"],
    zIndex: "30",
    aspectRatio: "16 / 9",
    backgroundColor: `color-mix(in oklab, ${color.black} 35%, transparent)`,
  }),
  img: css({
    position: "relative",
    zIndex: "20",
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",

    // `brightness-60 grayscale dark:brightness-40`.
    filter: {
      base: "brightness(60%) grayscale(100%)",
      [DARK_SCHEME]: {
        base: "brightness(40%) grayscale(100%)",
        [axes.mode.light]: "brightness(60%) grayscale(100%)",
      },
      [axes.mode.dark]: "brightness(40%) grayscale(100%)",
    },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

export default function CardImage() {
  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <div sx={styles.div} />
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          sx={styles.img}
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
          <CardTitle>Design systems meetup</CardTitle>
          <CardDescription>
            A practical talk on component APIs, accessibility, and shipping
            faster.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button sx={styles.button}>View Event</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
