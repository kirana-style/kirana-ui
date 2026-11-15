import { css } from "@kirana-style/core"

import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

export default function SwitchDescription() {
  return (
    <div sx={page.example}>
      <Field orientation="horizontal" sx={styles.narrow}>
        <FieldContent>
          <FieldLabel htmlFor="switch-focus-mode">
            Share across devices
          </FieldLabel>
          <FieldDescription>
            Focus is shared across devices, and turns off when you leave the
            app.
          </FieldDescription>
        </FieldContent>
        <Switch id="switch-focus-mode" />
      </Field>
    </div>
  )
}
