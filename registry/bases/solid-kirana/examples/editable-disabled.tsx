import { Editable, EditableInput, EditablePreview } from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"
import { page } from "../../../styles/page.styles"

export default function EditableDisabled() {
  return (
    <div sx={page.example}>
      <Field sx={page.narrow} data-disabled="true">
        <FieldLabel for="editable-disabled-name">Workspace</FieldLabel>
        <Editable disabled defaultValue="Acme Inc.">
          <EditablePreview />
          <EditableInput id="editable-disabled-name" />
        </Editable>
      </Field>
    </div>
  )
}
