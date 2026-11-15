import { css } from "@kirana-style/core"

import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { page } from "../../../styles/page.styles"

const styles = {
  tiny: css({ width: "100%", maxWidth: "10rem" }),
}

export default function SwitchSizes() {
  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.tiny}>
        <Field orientation="horizontal">
          <Switch id="switch-size-sm" size="sm" />
          <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="switch-size-default" size="default" />
          <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  )
}
