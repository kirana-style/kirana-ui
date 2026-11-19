import { Component, DestroyRef, inject, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Progress } from "../ui/progress"

const styles = {
  w60: css({ width: { "*": null, base: "60%" } }),
}

@Component({
  selector: "progress-demo",
  imports: [Progress, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiProgress [value]="progress()" [sx]="styles.w60"></div>
    </div>
  `,
})
export default class ProgressDemo {
  protected readonly styles = styles
  protected readonly progress = signal(13)

  constructor() {
    const timer = setTimeout(() => this.progress.set(66), 500)
    inject(DestroyRef).onDestroy(() => clearTimeout(timer))
  }
  protected readonly page = page
}
