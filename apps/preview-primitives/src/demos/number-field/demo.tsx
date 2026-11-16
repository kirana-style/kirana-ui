import { NumberField } from "@kirana-ui/react/number-field"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "label" | "group" | "step" | "input">
}) {
  return (
    <NumberField.Root defaultValue={2} min={1} max={8} {...s.root}>
      <span aria-hidden="true" {...s.label}>
        Tickets
      </span>
      <NumberField.Group {...s.group}>
        <NumberField.Decrement aria-label="One ticket fewer" {...s.step}>
          −
        </NumberField.Decrement>
        <NumberField.Input aria-label="Tickets" {...s.input} />
        <NumberField.Increment aria-label="One ticket more" {...s.step}>
          +
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}
