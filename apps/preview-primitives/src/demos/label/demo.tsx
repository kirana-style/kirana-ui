import { Input } from "@kirana-ui/react/input"
import { Label } from "@kirana-ui/react/label"
import { useId } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"root" | "label" | "input"> }) {
  // What ties the label to its control: a press on the label reaches the input.
  const id = useId()
  return (
    <div {...s.root}>
      <Label htmlFor={id} {...s.label}>
        Display name
      </Label>
      <Input id={id} defaultValue="Ada Lovelace" {...s.input} />
    </div>
  )
}
