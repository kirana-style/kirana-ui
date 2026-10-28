import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { HoverCard, HoverCardTrigger } from "../ui/hover-card"
import { fontWeight, space } from "../../../core/scales"
import { axes } from "../../../core/axes"

const styles = {
  // `col-span-2`
  span2: css({ gridColumn: "span 2 / span 2" }),
  flexFlexWrapItemsCenterJ: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
  capitalize: css({ textTransform: { "*": null, base: "capitalize" } }),
  flexFlexColStyleVegaGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: {
      [axes.style.vega]: space[2],
      [axes.style.nova]: space["1.5"],
      [axes.style.lyra]: space[1],
      [axes.style.maia]: space[2],
      [axes.style.mira]: space[1],
      [axes.style.luma]: space[2],
    },
  }),
  medium: css({ fontWeight: fontWeight.medium }),
  fit: css({ width: "fit-content" }),
}

export default function HoverCardExample() {
  return (
    <ExampleWrapper>
      <HoverCardSides />
      <HoverCardInDialog />
    </ExampleWrapper>
  )
}

const HOVER_CARD_PLACEMENTS = [
  "start",
  "left",
  "top",
  "bottom",
  "right",
  "end",
] as const

function HoverCardSides() {
  return (
    <Example title="Sides" containerSx={styles.span2}>
      <div sx={styles.flexFlexWrapItemsCenterJ}>
        {HOVER_CARD_PLACEMENTS.map((placement) => (
          <HoverCardTrigger key={placement} delay={100} closeDelay={100}>
            <Button variant="outline" sx={styles.capitalize}>
              {placement}
            </Button>
            <HoverCard placement={placement}>
              <div sx={styles.flexFlexColStyleVegaGap2}>
                <h4 sx={styles.medium}>Hover Card</h4>
                <p>
                  This hover card appears on the {placement} side of the
                  trigger.
                </p>
              </div>
            </HoverCard>
          </HoverCardTrigger>
        ))}
      </div>
    </Example>
  )
}

function HoverCardInDialog() {
  return (
    <Example title="In Dialog">
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog>
          <DialogHeader>
            <DialogTitle>Hover Card Example</DialogTitle>
            <DialogDescription>
              Hover over the button below to see the hover card.
            </DialogDescription>
          </DialogHeader>
          <HoverCardTrigger delay={100} closeDelay={100}>
            <Button variant="outline" sx={styles.fit}>
              Hover me
            </Button>
            <HoverCard>
              <div sx={styles.flexFlexColStyleVegaGap2}>
                <h4 sx={styles.medium}>Hover Card</h4>
                <p>
                  This hover card appears inside a dialog. Hover over the button
                  to see it.
                </p>
              </div>
            </HoverCard>
          </HoverCardTrigger>
        </Dialog>
      </DialogTrigger>
    </Example>
  )
}
