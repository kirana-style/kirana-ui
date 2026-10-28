import { css } from "@kirana-style/core"

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
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  gap3: css({ gap: { "*": null, base: space[3] } }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

export default function FieldCheckbox() {
  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.narrow}>
        <FieldSet>
          <FieldLegend variant="label">
            Show these items on the desktop
          </FieldLegend>
          <FieldDescription>
            Select the items you want to show on the desktop.
          </FieldDescription>
          <FieldGroup sx={styles.gap3}>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
              <FieldLabel
                htmlFor="finder-pref-9k2-hard-disks-ljj"
                sx={styles.normal}
                defaultChecked
              >
                Hard disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-external-disks-1yg" />
              <FieldLabel
                htmlFor="finder-pref-9k2-external-disks-1yg"
                sx={styles.normal}
              >
                External disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
              <FieldLabel
                htmlFor="finder-pref-9k2-cds-dvds-fzt"
                sx={styles.normal}
              >
                CDs, DVDs, and iPods
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
              <FieldLabel
                htmlFor="finder-pref-9k2-connected-servers-6l2"
                sx={styles.normal}
              >
                Connected servers
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-sync-folders-nep" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
              Sync Desktop & Documents folders
            </FieldLabel>
            <FieldDescription>
              Your Desktop & Documents folders are being synced with iCloud
              Drive. You can access them from other devices.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}
