import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function InputGroupInlineEnd() {
  const styles = {
    narrow: css({ maxWidth: containerSize.sm }),
  }

  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldLabel for="inline-end-input">Input</FieldLabel>
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
