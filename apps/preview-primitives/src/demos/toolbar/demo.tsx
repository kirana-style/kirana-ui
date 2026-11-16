import { Toggle } from "@kirana-ui/react/toggle"
import { ToggleGroup } from "@kirana-ui/react/toggle-group"
import { Toolbar } from "@kirana-ui/react/toolbar"
import { useState } from "react"
import type { ChangeEvent } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "group" | "item" | "separator" | "input">
}) {
  const [size, setSize] = useState("14")
  return (
    <Toolbar.Root aria-label="Formatting" {...s.root}>
      <ToggleGroup multiple aria-label="Marks" {...s.group}>
        <Toggle value="bold" {...s.item}>
          Bold
        </Toggle>
        <Toggle value="italic" {...s.item}>
          Italic
        </Toggle>
      </ToggleGroup>
      <Toolbar.Separator {...s.separator} />
      <Toolbar.Input
        aria-label="Font size"
        value={size}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSize(event.currentTarget.value)
        }
        {...s.input}
      />
      <Toolbar.Button onClick={() => setSize("14")} {...s.item}>
        Reset
      </Toolbar.Button>
      <Toolbar.Separator {...s.separator} />
      <Toolbar.Link href="#help" {...s.item}>
        Help
      </Toolbar.Link>
    </Toolbar.Root>
  )
}
