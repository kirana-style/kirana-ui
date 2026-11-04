import { For } from "solid-js"
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function HoverCardSides() {
  const styles = {
    flexFlexWrapJustifyCente: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: { "*": null, base: space[2] },
    }),
    capitalize: css({ textTransform: { "*": null, base: "capitalize" } }),
    flexFlexColGap1: css({
      display: "flex",
      flexDirection: "column",
      gap: { "*": null, base: space[1] },
    }),
    medium: css({ fontWeight: fontWeight.medium }),
  }

  const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapJustifyCente}>
        <For each={HOVER_CARD_SIDES}>
          {(side) => (
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline" sx={styles.capitalize}>
                    {side}
                  </Button>
                )}
              />
              <HoverCardContent side={side}>
                <div sx={styles.flexFlexColGap1}>
                  <h4 sx={styles.medium}>Hover Card</h4>
                  <p>
                    This hover card appears on the {side} side of the trigger.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </For>
      </div>
    </div>
  )
}
