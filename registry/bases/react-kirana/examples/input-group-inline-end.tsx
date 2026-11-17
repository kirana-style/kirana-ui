import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

export default function InputGroupInlineEnd() {
  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="inline-end-input"
            type="password"
            placeholder="Enter password"
          />
          <InputGroupAddon align="inline-end">
            <IconPlaceholder
              lucide="EyeOffIcon"
              tabler="IconEyeClosed"
              hugeicons="ViewOffIcon"
              phosphor="EyeSlashIcon"
              remixicon="RiEyeOffLine"
            />
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Icon positioned at the end.</FieldDescription>
      </Field>
    </div>
  )
}
