import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function HoverCardSides() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapJustifyCente}>
        {HOVER_CARD_SIDES.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" sx={styles.capitalize} />}
            >
              {side}
            </HoverCardTrigger>
            <HoverCardContent side={side}>
              <div sx={styles.flexFlexColGap1}>
                <h4 sx={styles.medium}>Hover Card</h4>
                <p>
                  This hover card appears on the {side} side of the trigger.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}
