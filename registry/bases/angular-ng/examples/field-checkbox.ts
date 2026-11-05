import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  gap3: css({ gap: { "*": null, base: space[3] } }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

@Component({
  selector: "field-checkbox",
  imports: [
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <fieldset kuiFieldSet>
          <legend kuiFieldLegend variant="label">
            Show these items on the desktop
          </legend>
          <p kuiFieldDescription>
            Select the items you want to show on the desktop.
          </p>
          <div kuiFieldGroup [sx]="styles.gap3">
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="finder-pref-9k2-hard-disks-ljj"></span>
              <label
                kuiFieldLabel
                for="finder-pref-9k2-hard-disks-ljj"
                [sx]="styles.normal"
                default-checked
                >Hard disks</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="finder-pref-9k2-external-disks-1yg"></span>
              <label
                kuiFieldLabel
                for="finder-pref-9k2-external-disks-1yg"
                [sx]="styles.normal"
                >External disks</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="finder-pref-9k2-cds-dvds-fzt"></span>
              <label
                kuiFieldLabel
                for="finder-pref-9k2-cds-dvds-fzt"
                [sx]="styles.normal"
                >CDs, DVDs, and iPods</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span
                kuiCheckbox
                id="finder-pref-9k2-connected-servers-6l2"
              ></span>
              <label
                kuiFieldLabel
                for="finder-pref-9k2-connected-servers-6l2"
                [sx]="styles.normal"
                >Connected servers</label
              >
            </div>
          </div>
        </fieldset>
        <div kuiFieldSeparator></div>
        <div kuiField orientation="horizontal">
          <span
            kuiCheckbox
            id="finder-pref-9k2-sync-folders-nep"
            defaultChecked
          ></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="finder-pref-9k2-sync-folders-nep"
              >Sync Desktop & Documents folders</label
            >
            <p kuiFieldDescription>
              Your Desktop & Documents folders are being synced with iCloud
              Drive. You can access them from other devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class FieldCheckbox {
  protected readonly styles = styles
  protected readonly page = page
}
