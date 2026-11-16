import { DateField } from "@kirana-ui/react/date-field"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"field" | "segment"> }) {
  return (
    <DateField.Root
      {...s.field}
      locale="en-US"
      name="born"
      aria-label="Date of birth"
    >
      <DateField.Segments>
        {(segment) => <DateField.Segment {...s.segment} segment={segment} />}
      </DateField.Segments>
      <DateField.Input />
    </DateField.Root>
  )
}
