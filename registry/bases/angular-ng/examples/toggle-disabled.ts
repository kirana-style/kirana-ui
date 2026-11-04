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
  selector: "toggle-disabled",
  imports: [Toggle, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapItemsCenterG">
        <button kuiToggle aria-label="Toggle disabled" disabled>
          Disabled
        </button>
        <button
          kuiToggle
          variant="outline"
          aria-label="Toggle disabled outline"
          disabled
        >
          Disabled
        </button>
      </div>
    </div>
  `,
})
export default class ToggleDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
