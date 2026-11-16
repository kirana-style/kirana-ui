import { Toggle } from "@kirana-ui/react/toggle"
import { ToggleGroup } from "@kirana-ui/react/toggle-group"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"group" | "toggle"> }) {
  // The values of the pressed toggles: here one at most.
  const [align, setAlign] = useState(["left"])
  return (
    <ToggleGroup
      aria-label="Text alignment"
      value={align}
      onValueChange={setAlign}
      {...s.group}
    >
      <Toggle value="left" {...s.toggle}>
        Left
      </Toggle>
      <Toggle value="centre" {...s.toggle}>
        Centre
      </Toggle>
      <Toggle value="right" {...s.toggle}>
        Right
      </Toggle>
    </ToggleGroup>
  )
}
