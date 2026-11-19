import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { axes } from "../../../core/axes"
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

const HOVER_CARD_SIDES = [
  "inline-start",
  "left",
  "top",
  "bottom",
  "right",
  "inline-end",
] as const

@Component({
  selector: "hover-card-example",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- HoverCardSides -->
      <div kuiExample title="Sides" [containerSx]="styles.span2">
        <div [sx]="styles.flexFlexWrapItemsCenterJ">
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
                {{ side.replace("-", " ") }}
              </button>
              <div kuiHoverCardContent [side]="$any(side)">
                <div [sx]="styles.flexFlexColStyleVegaGap2">
                  <h4 [sx]="styles.medium">Hover Card</h4>
                  <p>
                    This hover card appears on the
                    {{ side.replace("-", " ") }}
                    side of the trigger.
                  </p>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- HoverCardInDialog -->
      <div kuiExample title="In Dialog">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Hover Card Example</h2>
              <p kuiDialogDescription>
                Hover over the button below to see the hover card.
              </p>
            </div>
            <ng-container kuiHoverCard>
              <button
                kuiButton
                kuiHoverCardTrigger
                [delay]="100"
                [closeDelay]="100"
                variant="outline"
                [sx]="styles.fit"
              >
                Hover me
              </button>
              <div kuiHoverCardContent>
                <div [sx]="styles.flexFlexColStyleVegaGap2">
                  <h4 [sx]="styles.medium">Hover Card</h4>
                  <p>
                    This hover card appears inside a dialog. Hover over the
                    button to see it.
                  </p>
                </div>
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class HoverCardExample {
  protected readonly styles = styles
  protected readonly HOVER_CARD_SIDES = HOVER_CARD_SIDES
}
