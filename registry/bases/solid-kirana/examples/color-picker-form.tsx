import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import {
  ColorPicker,
  ColorPickerContent,
  ColorPickerTrigger,
} from "../ui/color-picker"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  form: css({
    display: "grid",
    width: "100%",
    maxWidth: containerSize.xs,
    gap: space[4],
  }),
  submit: css({ justifySelf: "start" }),
}

export default function ColorPickerForm() {
  const [saved, setSaved] = createSignal<string | null>(null)

  return (
    <div sx={page.example}>
      <form
        sx={styles.form}
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          setSaved(String(data.get("brand")))
        }}
      >
        <Field>
          <FieldLabel for="brand-colour">Brand colour</FieldLabel>
          <ColorPicker name="brand" defaultValue="#e11d48">
            <ColorPickerTrigger id="brand-colour" />
            <ColorPickerContent aria-label="Brand colour" />
          </ColorPicker>
          <FieldDescription>
            {saved() ? `Saved ${saved()}.` : "Used for buttons and links."}
          </FieldDescription>
        </Field>
        <Button type="submit" sx={styles.submit}>
          Save
        </Button>
      </form>
    </div>
  )
}
