import { createSignal } from "solid-js"

import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"
import { page } from "../../../styles/page.styles"

export default function TimeFieldDemo() {
  const [start, setStart] = createSignal<string | null>("09:30")

  return (
    <div sx={page.example}>
      <Field sx={page.narrow}>
        <FieldLabel id="time-field-demo-label">Meeting starts at</FieldLabel>
        <TimeField
          aria-labelledby="time-field-demo-label"
          locale="en-US"
          value={start()}
          onValueChange={(next) => setStart(next)}
        />
      </Field>
    </div>
  )
}
