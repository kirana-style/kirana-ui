import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

const styles = {
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "toggle-group-sizes",
  imports: [ToggleGroup, ToggleGroupItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexColGap4">
        <div
          kuiToggleGroup
          size="sm"
          [defaultValue]="['top']"
          variant="outline"
        >
          <button kuiToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </button>
          <button kuiToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </button>
          <button kuiToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </button>
          <button kuiToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </button>
        </div>
        <div kuiToggleGroup [defaultValue]="['top']" variant="outline">
          <button kuiToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </button>
          <button kuiToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </button>
          <button kuiToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </button>
          <button kuiToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class ToggleGroupSizes {
  protected readonly styles = styles
  protected readonly page = page
}
