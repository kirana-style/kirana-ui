import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"

const styles = {
  w64: css({ width: { "*": null, base: space[64] } }),
  gap4: css({ gap: { "*": null, base: space[4] } }),
  w12: css({ width: "50%" }),
}

@Component({
  selector: "popover-form",
  imports: [
    Button,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiPopover>
        <button kuiButton kuiPopoverTrigger variant="outline">
          Open Popover
        </button>
        <div kuiPopoverContent [sx]="styles.w64" align="start">
          <div kuiPopoverHeader>
            <h2 kuiPopoverTitle>Dimensions</h2>
            <p kuiPopoverDescription>Set the dimensions for the layer.</p>
          </div>
          <div kuiFieldGroup [sx]="styles.gap4">
            <div kuiField orientation="horizontal">
              <label kuiFieldLabel for="width" [sx]="styles.w12">Width</label>
              <input kuiInput id="width" value="100%" />
            </div>
            <div kuiField orientation="horizontal">
              <label kuiFieldLabel for="height" [sx]="styles.w12">Height</label>
              <input kuiInput id="height" value="25px" />
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class PopoverForm {
  protected readonly styles = styles
  protected readonly page = page
}
