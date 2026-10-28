import { css } from "@kirana-style/core"

import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  gap3: css({ gap: { "*": null, base: space[3] } }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

export default function CheckboxGroup() {
  return (
    <div sx={page.example}>
      <FieldSet>
        <FieldLegend variant="label">
          Show these items on the desktop:
        </FieldLegend>
        <FieldDescription>
          Select the items you want to show on the desktop.
        </FieldDescription>
        <FieldGroup sx={styles.gap3}>
          <Field orientation="horizontal">
            <Checkbox
              id="finder-pref-9k2-hard-disks-ljj-checkbox"
              name="finder-pref-9k2-hard-disks-ljj-checkbox"
              defaultChecked
            />
            <FieldLabel
              htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
              sx={styles.normal}
            >
              Hard disks
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              id="finder-pref-9k2-external-disks-1yg-checkbox"
              name="finder-pref-9k2-external-disks-1yg-checkbox"
              defaultChecked
            />
            <FieldLabel
              htmlFor="finder-pref-9k2-external-disks-1yg-checkbox"
              sx={styles.normal}
            >
              External disks
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              id="finder-pref-9k2-cds-dvds-fzt-checkbox"
              name="finder-pref-9k2-cds-dvds-fzt-checkbox"
            />
            <FieldLabel
              htmlFor="finder-pref-9k2-cds-dvds-fzt-checkbox"
              sx={styles.normal}
            >
              CDs, DVDs, and iPods
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              id="finder-pref-9k2-connected-servers-6l2-checkbox"
              name="finder-pref-9k2-connected-servers-6l2-checkbox"
            />
            <FieldLabel
              htmlFor="finder-pref-9k2-connected-servers-6l2-checkbox"
              sx={styles.normal}
            >
              Connected servers
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
