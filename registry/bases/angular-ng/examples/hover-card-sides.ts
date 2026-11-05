import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

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

@Component({
  selector: "hover-card-sides",
  imports: [Button, HoverCard, HoverCardContent, HoverCardTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapJustifyCente">
        @for (side of HOVER_CARD_SIDES; track side) {
          <ng-container kuiHoverCard>
            <button
              kuiButton
              kuiHoverCardTrigger
              [delay]="100"
              [closeDelay]="100"
              variant="outline"
              [sx]="styles.capitalize"
            >
              {{ side }}
            </button>
            <div kuiHoverCardContent [side]="$any(side)">
              <div [sx]="styles.flexFlexColGap1">
                <h4 [sx]="styles.medium">Hover Card</h4>
                <p>
                  This hover card appears on the
                  {{ side }}
                  side of the trigger.
                </p>
              </div>
            </div>
          </ng-container>
        }
      </div>
    </div>
  `,
})
export default class HoverCardSides {
  protected readonly styles = styles
  protected readonly HOVER_CARD_SIDES = HOVER_CARD_SIDES
  protected readonly page = page
}
