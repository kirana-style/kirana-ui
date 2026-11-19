import { css } from "@kirana-style/core"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { containerSize, fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function RadioGroupInvalid() {
  const styles = {
    narrow: css({ width: "100%", maxWidth: containerSize.xs }),
    normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
  }

  return (
    <div sx={page.example}>
      <FieldSet sx={styles.narrow}>
        <FieldLegend variant="label">Notification Preferences</FieldLegend>
        <FieldDescription>
          Choose how you want to receive notifications.
        </FieldDescription>
        <RadioGroup defaultValue="email">
          <Field orientation="horizontal" data-invalid="true">
            <RadioGroupItem
              value="email"
              id="invalid-email"
              aria-invalid="true"
            />
            <FieldLabel for="invalid-email" sx={styles.normal}>
              Email only
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" data-invalid="true">
            <RadioGroupItem value="sms" id="invalid-sms" aria-invalid="true" />
            <FieldLabel for="invalid-sms" sx={styles.normal}>
              SMS only
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" data-invalid="true">
            <RadioGroupItem
              value="both"
              id="invalid-both"
              aria-invalid="true"
            />
            <FieldLabel for="invalid-both" sx={styles.normal}>
              Both Email & SMS
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}
