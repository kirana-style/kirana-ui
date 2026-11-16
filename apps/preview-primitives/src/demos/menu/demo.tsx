import { Menu } from "@kirana-ui/react/menu"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"trigger" | "popup" | "item" | "indicator" | "separator">
}) {
  const [pinned, setPinned] = useState(false)
  return (
    <Menu.Root>
      <Menu.Trigger {...s.trigger}>Options</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={4}>
          <Menu.Popup {...s.popup}>
            <Menu.Item {...s.item}>Rename</Menu.Item>
            <Menu.Item {...s.item}>Duplicate</Menu.Item>
            <Menu.Item disabled {...s.item}>
              Move to…
            </Menu.Item>
            <Menu.Separator {...s.separator} />
            <Menu.CheckboxItem
              checked={pinned}
              onCheckedChange={(next) => setPinned(next)}
              {...s.item}
            >
              Pinned
              <Menu.CheckboxItemIndicator {...s.indicator}>
                ✓
              </Menu.CheckboxItemIndicator>
            </Menu.CheckboxItem>
            <Menu.Separator {...s.separator} />
            <Menu.Item {...s.item}>Delete</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
