import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
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

const HOVER_CARD_SIDES = [
  "inline-start",
  "left",
  "top",
  "bottom",
  "right",
  "inline-end",
] as const

function HoverCardSides() {
  return (
    <Example title="Sides" containerSx={styles.span2}>
      <div sx={styles.flexFlexWrapItemsCenterJ}>
        {HOVER_CARD_SIDES.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" sx={styles.capitalize} />}
            >
              {side.replace("-", " ")}
            </HoverCardTrigger>
            <HoverCardContent side={side}>
              <div sx={styles.flexFlexColStyleVegaGap2}>
                <h4 sx={styles.medium}>Hover Card</h4>
                <p>
                  This hover card appears on the {side.replace("-", " ")} side
                  of the trigger.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </Example>
  )
}

function HoverCardInDialog() {
  return (
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hover Card Example</DialogTitle>
            <DialogDescription>
              Hover over the button below to see the hover card.
            </DialogDescription>
          </DialogHeader>
          <HoverCard>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" sx={styles.fit} />}
            >
              Hover me
            </HoverCardTrigger>
            <HoverCardContent>
              <div sx={styles.flexFlexColStyleVegaGap2}>
                <h4 sx={styles.medium}>Hover Card</h4>
                <p>
                  This hover card appears inside a dialog. Hover over the button
                  to see it.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
