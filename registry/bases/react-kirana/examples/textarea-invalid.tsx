import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

export default function TextareaInvalid() {
  return (
    <div sx={page.example}>
      <Field sx={page.narrow} data-invalid>
        <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
        <Textarea
          id="textarea-invalid"
          placeholder="Type your message here."
          aria-invalid
        />
        <FieldDescription>Please enter a valid message.</FieldDescription>
      </Field>
    </div>
  )
}
