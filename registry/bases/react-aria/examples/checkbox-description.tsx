import { css } from "@kirana-style/core"

import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
}

export default function CheckboxDescription() {
  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.w72}>
        <Field orientation="horizontal">
          <Checkbox
            id="terms-checkbox-desc"
            name="terms-checkbox-desc"
            defaultSelected
          />
          <FieldContent>
            <FieldLabel htmlFor="terms-checkbox-desc">
              Accept terms and conditions
            </FieldLabel>
            <FieldDescription>
              By clicking this checkbox, you agree to the terms and conditions.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  )
}
