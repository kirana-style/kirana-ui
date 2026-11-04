import { css } from "@kirana-style/core"
import { Field, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { page } from "../../../styles/page.styles"

export default function SwitchDisabled() {
  const styles = {
    fit: css({ width: "fit-content" }),
  }

  return (
    <div sx={page.example}>
      <Field orientation="horizontal" data-disabled="true" sx={styles.fit}>
        <Switch id="switch-disabled-unchecked" disabled />
        <FieldLabel for="switch-disabled-unchecked">Disabled</FieldLabel>
      </Field>
    </div>
  )
}
