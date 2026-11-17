import { css } from "@kirana-style/core"

import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w56: css({ marginInline: "auto", width: { "*": null, base: space[56] } }),
}

export default function CheckboxDisabled() {
  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.w56}>
        <Field orientation="horizontal" data-disabled>
          <Checkbox
            id="toggle-checkbox-disabled"
            name="toggle-checkbox-disabled"
            disabled
          />
          <FieldLabel htmlFor="toggle-checkbox-disabled">
            Enable notifications
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  )
}
