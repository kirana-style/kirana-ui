import { Field } from "@kirana-ui/react/field"
import { TimeField } from "@kirana-ui/react/time-field"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "label" | "field" | "segment">
}) {
  return (
    <Field.Root name="start" {...s.root}>
      <Field.Label {...s.label}>Meeting starts at</Field.Label>
      <TimeField.Root locale="en-US" defaultValue="09:30" {...s.field}>
        <TimeField.Segments>
          {(segment) => <TimeField.Segment {...s.segment} segment={segment} />}
        </TimeField.Segments>
        <TimeField.Input />
      </TimeField.Root>
    </Field.Root>
  )
}
