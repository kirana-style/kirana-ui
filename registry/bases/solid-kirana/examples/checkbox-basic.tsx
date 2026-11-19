import { css } from "@kirana-style/core"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function CheckboxBasic() {
  const styles = {
    w56: css({ marginInline: "auto", width: { "*": null, base: space[56] } }),
  }

  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.w56}>
        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
          <FieldLabel for="terms-checkbox-basic">
            Accept terms and conditions
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  )
}
