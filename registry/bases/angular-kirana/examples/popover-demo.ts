import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  w80: css({ width: { "*": null, base: space[80] } }),
  gridGap4: css({ display: "grid", gap: { "*": null, base: space[4] } }),
  spaceY2: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  leadingNoneFontMedium: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  gridGap2: css({ display: "grid", gap: { "*": null, base: space[2] } }),
  gridGridCols3ItemsCenter: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
  colSpan2H8: css({ gridColumn: "span 2 / span 2", height: space[8] }),
}

@Component({
  selector: "popover-demo",
  imports: [
    Button,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiPopover>
        <button kuiButton kuiPopoverTrigger variant="outline">
          Open popover
        </button>
        <div kuiPopoverContent [sx]="styles.w80">
          <div [sx]="styles.gridGap4">
            <div [sx]="styles.spaceY2">
              <h4 [sx]="styles.leadingNoneFontMedium">Dimensions</h4>
              <p [sx]="styles.textSmTextMutedForegroun">
                Set the dimensions for the layer.
              </p>
            </div>
            <div [sx]="styles.gridGap2">
              <div [sx]="styles.gridGridCols3ItemsCenter">
                <label kuiLabel for="width">Width</label>
                <input
                  kuiInput
                  id="width"
                  value="100%"
                  [sx]="styles.colSpan2H8"
                />
              </div>
              <div [sx]="styles.gridGridCols3ItemsCenter">
                <label kuiLabel for="maxWidth">Max. width</label>
                <input
                  kuiInput
                  id="maxWidth"
                  value="300px"
                  [sx]="styles.colSpan2H8"
                />
              </div>
              <div [sx]="styles.gridGridCols3ItemsCenter">
                <label kuiLabel for="height">Height</label>
                <input
                  kuiInput
                  id="height"
                  value="25px"
                  [sx]="styles.colSpan2H8"
                />
              </div>
              <div [sx]="styles.gridGridCols3ItemsCenter">
                <label kuiLabel for="maxHeight">Max. height</label>
                <input
                  kuiInput
                  id="maxHeight"
                  value="none"
                  [sx]="styles.colSpan2H8"
                />
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class PopoverDemo {
  protected readonly styles = styles
  protected readonly page = page
}
