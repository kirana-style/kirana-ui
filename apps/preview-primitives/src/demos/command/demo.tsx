import { Command } from "@kirana-ui/react/command"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

// Other words "Open file" answers to.
const OPEN_KEYWORDS = ["load", "browse"]

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "input"
    | "list"
    | "heading"
    | "item"
    | "separator"
    | "empty"
    | "status"
  >
}) {
  const [last, setLast] = useState("nothing yet")

  return (
    <Command.Root {...s.root} loop onSelect={(value) => setLast(value)}>
      <Command.Input
        {...s.input}
        aria-label="Command"
        placeholder="Type a command"
      />
      <Command.List {...s.list} aria-label="Commands">
        <Command.Group>
          <Command.GroupHeading {...s.heading}>File</Command.GroupHeading>
          <Command.Item {...s.item} value="New file">
            New file
          </Command.Item>
          <Command.Item {...s.item} value="Open file" keywords={OPEN_KEYWORDS}>
            Open file
          </Command.Item>
          <Command.Item {...s.item} value="Save">
            Save
          </Command.Item>
        </Command.Group>
        <Command.Separator {...s.separator} />
        <Command.Group>
          <Command.GroupHeading {...s.heading}>Edit</Command.GroupHeading>
          <Command.Item {...s.item} value="Copy">
            Copy
          </Command.Item>
          <Command.Item {...s.item} value="Paste" disabled>
            Paste
          </Command.Item>
        </Command.Group>
        <Command.Empty {...s.empty}>No command found</Command.Empty>
      </Command.List>
      <p {...s.status}>Last run: {last}</p>
    </Command.Root>
  )
}
