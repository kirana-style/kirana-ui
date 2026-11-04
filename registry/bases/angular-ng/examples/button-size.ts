import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"

const styles = {
  div: css({
    display: "flex",
    flexDirection: { base: "column", [breakpoint.sm]: "row" },
    alignItems: "flex-start",
    gap: space[8],
  }),
  div2: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
  div4: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
  div5: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
}

@Component({
  selector: "button-size",
  imports: [Button, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div [sx]="styles.div2">
          <button kuiButton size="xs" variant="outline">Extra Small</button>
          <button
            kuiButton
            size="icon-xs"
            aria-label="Submit"
            variant="outline"
          >
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            ></svg>
          </button>
        </div>
        <div [sx]="styles.div3">
          <button kuiButton size="sm" variant="outline">Small</button>
          <button
            kuiButton
            size="icon-sm"
            aria-label="Submit"
            variant="outline"
          >
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            ></svg>
          </button>
        </div>
        <div [sx]="styles.div4">
          <button kuiButton variant="outline">Default</button>
          <button kuiButton size="icon" aria-label="Submit" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            ></svg>
          </button>
        </div>
        <div [sx]="styles.div5">
          <button kuiButton variant="outline" size="lg">Large</button>
          <button
            kuiButton
            size="icon-lg"
            aria-label="Submit"
            variant="outline"
          >
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            ></svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonSize {
  protected readonly styles = styles
  protected readonly page = page
}
