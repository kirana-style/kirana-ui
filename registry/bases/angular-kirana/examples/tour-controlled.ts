import type { ElementRef } from "@angular/core"
import { Component, signal, viewChild } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
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
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
  status: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

@Component({
  selector: "tour-controlled",
  imports: [Button, SxDirective, Tour, TourContent],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.stack">
        <div [sx]="styles.row">
          <button #draft kuiButton variant="outline">Draft</button>
          <button #preview kuiButton variant="outline">Preview</button>
          <button #publish kuiButton variant="outline">Publish</button>
        </div>
        <div [sx]="styles.row">
          <button kuiButton (click)="start(0)">Start</button>
          <button kuiButton variant="outline" (click)="start(2)">
            Go to the last step
          </button>
        </div>
        <p [sx]="styles.status" aria-live="polite">
          {{
            open() ? "Showing step " + (step() + 1) + " of 3" : "Not started"
          }}
        </p>
      </div>
      <ng-container
        kuiTour
        [steps]="steps"
        [open]="open()"
        [step]="step()"
        (openChanged)="open.set($event.open)"
        (stepChanged)="step.set($event.step)"
      >
        <div kuiTourContent></div>
      </ng-container>
    </div>
  `,
})
export default class TourControlled {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly open = signal(false)
  protected readonly step = signal(0)
  private readonly draft = viewChild<ElementRef<HTMLElement>>("draft")
  private readonly preview = viewChild<ElementRef<HTMLElement>>("preview")
  private readonly publish = viewChild<ElementRef<HTMLElement>>("publish")

  protected readonly steps: TourStep[] = [
    {
      id: "draft",
      target: () => this.draft()?.nativeElement ?? null,
      title: "Draft",
      description: "Write the post. It saves as you type.",
    },
    {
      id: "preview",
      target: () => this.preview()?.nativeElement ?? null,
      title: "Preview",
      description: "See the post as readers will.",
    },
    {
      id: "publish",
      target: () => this.publish()?.nativeElement ?? null,
      title: "Publish",
      description: "Put it live when it is ready.",
    },
  ]

  protected start(step: number) {
    this.step.set(step)
    this.open.set(true)
  }
}
