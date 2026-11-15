import { css } from "@kirana-style/core"

import { Field, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
}

export default function FieldSwitch() {
  return (
    <div sx={page.example}>
      <Field orientation="horizontal" sx={styles.fit}>
        <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
        <Switch id="2fa" />
      </Field>
    </div>
  )
}
