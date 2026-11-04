import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"

const styles = {
  gap3: css({ gap: { "*": null, base: space[3] } }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

@Component({
  selector: "checkbox-group",
  imports: [
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <fieldset kuiFieldSet>
        <legend kuiFieldLegend variant="label">
          Show these items on the desktop:
        </legend>
        <p kuiFieldDescription>
          Select the items you want to show on the desktop.
        </p>
        <div kuiFieldGroup [sx]="styles.gap3">
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="finder-pref-9k2-hard-disks-ljj-checkbox"
              name="finder-pref-9k2-hard-disks-ljj-checkbox"
              defaultChecked
            ></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-hard-disks-ljj-checkbox"
              [sx]="styles.normal"
              >Hard disks</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="finder-pref-9k2-external-disks-1yg-checkbox"
              name="finder-pref-9k2-external-disks-1yg-checkbox"
              defaultChecked
            ></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-external-disks-1yg-checkbox"
              [sx]="styles.normal"
              >External disks</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="finder-pref-9k2-cds-dvds-fzt-checkbox"
              name="finder-pref-9k2-cds-dvds-fzt-checkbox"
            ></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-cds-dvds-fzt-checkbox"
              [sx]="styles.normal"
              >CDs, DVDs, and iPods</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="finder-pref-9k2-connected-servers-6l2-checkbox"
              name="finder-pref-9k2-connected-servers-6l2-checkbox"
            ></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-connected-servers-6l2-checkbox"
              [sx]="styles.normal"
              >Connected servers</label
            >
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export default class CheckboxGroup {
  protected readonly styles = styles
  protected readonly page = page
}
