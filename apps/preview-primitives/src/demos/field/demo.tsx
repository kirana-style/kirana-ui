import { Field } from "@kirana-ui/react/field"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "label" | "control" | "description" | "error">
}) {
  return (
    <Field.Root name="email" validationMode="onBlur" {...s.root}>
      <Field.Label {...s.label}>Email</Field.Label>
      <Field.Control
        type="email"
        required
        placeholder="ada@example.com"
        {...s.control}
      />
      <Field.Description {...s.description}>
        We only write when your order ships.
      </Field.Description>
      <Field.Error {...s.error} />
    </Field.Root>
  )
}
