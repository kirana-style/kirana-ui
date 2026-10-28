import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"

export default function InputButtonGroup() {
  return (
    <div sx={page.example}>
      <Field>
        <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
        <ButtonGroup>
          <Input id="input-button-group" placeholder="Type to search..." />
          <Button variant="outline">Search</Button>
        </ButtonGroup>
      </Field>
    </div>
  )
}
