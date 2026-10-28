import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

export default function TextareaDisabled() {
  return (
    <div sx={page.example}>
      <Field sx={page.narrow} data-disabled>
        <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
        <Textarea
          id="textarea-disabled"
          placeholder="Type your message here."
          disabled
        />
      </Field>
    </div>
  )
}
