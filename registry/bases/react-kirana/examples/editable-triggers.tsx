"use client"

import {
  Editable,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
} from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"
import { page } from "../../../styles/page.styles"

export default function EditableTriggers() {
  return (
    <div sx={page.example}>
      <Field sx={page.narrow}>
        <FieldLabel htmlFor="editable-triggers-name">Display name</FieldLabel>
        <Editable defaultValue="Ada Lovelace" placeholder="Your name">
          <EditablePreview />
          <EditableInput id="editable-triggers-name" />
          <EditableEditTrigger />
          <EditableSubmitTrigger />
          <EditableCancelTrigger />
        </Editable>
      </Field>
    </div>
  )
}
