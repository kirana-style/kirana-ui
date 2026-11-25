import type { ElementRef } from "@angular/core"
import { Component, signal, viewChild } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
}

@Component({
  selector: "tour-placement",
  imports: [Button, SxDirective, Tour, TourContent],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.stack">
        <button #target kuiButton variant="outline">Target</button>
        <button kuiButton (click)="open.set(true)">Show each side</button>
      </div>
      <ng-container
        kuiTour
        [steps]="steps"
        [open]="open()"
        (openChanged)="open.set($event.open)"
      >
        <div kuiTourContent></div>
      </ng-container>
    </div>
  `,
})
export default class TourPlacement {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly open = signal(false)
  private readonly target = viewChild<ElementRef<HTMLElement>>("target")

  protected readonly steps: TourStep[] = (
    ["top", "right", "bottom", "left"] as const
  ).map((side) => ({
    id: side,
    target: () => this.target()?.nativeElement ?? null,
    side,
    title: `On the ${side}`,
    description: `This step's popup is on the ${side} of its target.`,
  }))
}
