import { css } from "@kirana-style/core"

import { Field, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
}

export default function SwitchDisabled() {
  return (
    <div sx={page.example}>
      <Field orientation="horizontal" data-disabled sx={styles.fit}>
        <Switch id="switch-disabled-unchecked" disabled />
        <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
      </Field>
    </div>
  )
}
