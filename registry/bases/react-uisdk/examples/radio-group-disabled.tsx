import { css } from "@kirana-style/core"

import { Field, FieldLabel } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

export default function RadioGroupDisabled() {
  return (
    <div sx={page.example}>
      <RadioGroup defaultValue="option2" sx={styles.fit}>
        <Field orientation="horizontal" data-disabled>
          <RadioGroupItem value="option1" id="disabled-1" disabled />
          <FieldLabel htmlFor="disabled-1" sx={styles.normal}>
            Disabled
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option2" id="disabled-2" />
          <FieldLabel htmlFor="disabled-2" sx={styles.normal}>
            Option 2
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option3" id="disabled-3" />
          <FieldLabel htmlFor="disabled-3" sx={styles.normal}>
            Option 3
          </FieldLabel>
        </Field>
      </RadioGroup>
    </div>
  )
}
