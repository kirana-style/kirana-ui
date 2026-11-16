import { Field } from "@kirana-ui/react/field"
import { Fieldset } from "@kirana-ui/react/fieldset"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "legend" | "field" | "label" | "control">
}) {
  return (
    <Fieldset.Root {...s.root}>
      <Fieldset.Legend {...s.legend}>Shipping address</Fieldset.Legend>
      <Field.Root name="street" {...s.field}>
        <Field.Label {...s.label}>Street</Field.Label>
        <Field.Control placeholder="12 Harbour Road" {...s.control} />
      </Field.Root>
      <Field.Root name="city" {...s.field}>
        <Field.Label {...s.label}>City</Field.Label>
        <Field.Control placeholder="Lisbon" {...s.control} />
      </Field.Root>
    </Fieldset.Root>
  )
}
