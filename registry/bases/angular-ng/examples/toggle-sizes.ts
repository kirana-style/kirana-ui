import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Toggle } from "../ui/toggle"

const styles = {
  flexFlexWrapItemsCenterG: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "toggle-sizes",
  imports: [Toggle, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapItemsCenterG">
        <button kuiToggle variant="outline" aria-label="Toggle small" size="sm">
          Small
        </button>
        <button
          kuiToggle
          variant="outline"
          aria-label="Toggle default"
          size="default"
        >
          Default
        </button>
        <button kuiToggle variant="outline" aria-label="Toggle large" size="lg">
          Large
        </button>
      </div>
    </div>
  `,
})
export default class ToggleSizes {
  protected readonly styles = styles
  protected readonly page = page
}
