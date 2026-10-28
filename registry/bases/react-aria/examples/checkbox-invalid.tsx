import { css } from "@kirana-style/core"

import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w56: css({ marginInline: "auto", width: { "*": null, base: space[56] } }),
}

export default function CheckboxInvalid() {
  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.w56}>
        <Field orientation="horizontal" data-invalid>
          <Checkbox
            id="terms-checkbox-invalid"
            name="terms-checkbox-invalid"
            isInvalid
          />
          <FieldLabel htmlFor="terms-checkbox-invalid">
            Accept terms and conditions
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  )
}
