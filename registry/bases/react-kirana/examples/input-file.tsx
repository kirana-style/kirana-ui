import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"

export default function InputFile() {
  return (
    <div sx={page.example}>
      <Field>
        <FieldLabel htmlFor="picture">Picture</FieldLabel>
        <Input id="picture" type="file" />
        <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>
    </div>
  )
}
