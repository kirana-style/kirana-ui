import { Toggle } from "@kirana-ui/react/toggle"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"toggle"> }) {
  return (
    <Toggle aria-label="Bold" {...s.toggle}>
      B
    </Toggle>
  )
}
