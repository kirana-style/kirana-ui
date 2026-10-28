import { css } from "@kirana-style/core"

import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  textDestructive: css({ color: theme.destructive }),
}

export default function InputRequired() {
  return (
    <div sx={page.example}>
      <Field>
        <FieldLabel htmlFor="input-required">
          Required Field <span sx={styles.textDestructive}>*</span>
        </FieldLabel>
        <Input
          id="input-required"
          placeholder="This field is required"
          required
        />
        <FieldDescription>This field must be filled out.</FieldDescription>
      </Field>
    </div>
  )
}
