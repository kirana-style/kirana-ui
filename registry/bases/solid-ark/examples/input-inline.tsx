import { Button } from "../ui/button"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"

export default function InputInline() {
  return (
    <div sx={page.example}>
      <Field orientation="horizontal">
        <Input type="search" placeholder="Search..." />
        <Button>Search</Button>
      </Field>
    </div>
  )
}
