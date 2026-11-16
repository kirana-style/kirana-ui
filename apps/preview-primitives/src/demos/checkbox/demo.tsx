import { Checkbox } from "@kirana-ui/react/checkbox"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"label" | "box" | "mark"> }) {
  return (
    <label {...s.label}>
      <Checkbox.Root {...s.box} name="releases" defaultChecked>
        <Checkbox.Indicator {...s.mark}>✓</Checkbox.Indicator>
      </Checkbox.Root>
      Email me about new releases
    </label>
  )
}
