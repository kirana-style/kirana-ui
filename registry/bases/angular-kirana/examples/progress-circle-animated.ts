import { Component, DestroyRef, inject, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"

@Component({
  selector: "progress-circle-animated",
  imports: [ProgressCircle, ProgressCircleLabel, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiProgressCircle
        [value]="progress()"
        size="lg"
        aria-label="Upload progress"
      >
        <span kuiProgressCircleLabel></span>
      </div>
    </div>
  `,
})
export default class ProgressCircleAnimated {
  protected readonly progress = signal(13)

  constructor() {
    const timer = setTimeout(() => this.progress.set(66), 500)
    inject(DestroyRef).onDestroy(() => clearTimeout(timer))
  }
  protected readonly page = page
}
