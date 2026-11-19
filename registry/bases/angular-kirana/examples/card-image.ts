import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { DARK_SCHEME, axes } from "../../../core/axes"
import { color, containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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

@Component({
  selector: "card-image",
  imports: [
    Badge,
    Button,
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.card">
        <div [sx]="styles.div"></div>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          [sx]="styles.img"
        />
        <div kuiCardHeader>
          <div kuiCardAction>
            <span kuiBadge variant="secondary">Featured</span>
          </div>
          <div kuiCardTitle>Design systems meetup</div>
          <div kuiCardDescription>
            A practical talk on component APIs, accessibility, and shipping
            faster.
          </div>
        </div>
        <div kuiCardFooter>
          <button kuiButton [sx]="styles.button">View Event</button>
        </div>
      </div>
    </div>
  `,
})
export default class CardImage {
  protected readonly styles = styles
  protected readonly page = page
}
