"use client"

import { Editable, EditableInput, EditablePreview } from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"
import { page } from "../../../styles/page.styles"

export default function EditableDemo() {
  return (
    <div sx={page.example}>
      <Field sx={page.narrow}>
        <FieldLabel htmlFor="editable-demo-name">Project name</FieldLabel>
        <Editable defaultValue="Marketing site" placeholder="Untitled project">
          <EditablePreview />
          <EditableInput id="editable-demo-name" />
        </Editable>
      </Field>
    </div>
  )
}
