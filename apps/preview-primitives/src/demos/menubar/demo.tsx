import { Menu } from "@kirana-ui/react/menu"
import { Menubar } from "@kirana-ui/react/menubar"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"bar" | "trigger" | "popup" | "item" | "check" | "separator">
}) {
  return (
    <Menubar aria-label="Document" {...s.bar}>
      <Menu.Root>
        <Menu.Trigger {...s.trigger}>File</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="start">
            <Menu.Popup {...s.popup}>
              <Menu.Item {...s.item}>New document</Menu.Item>
              <Menu.Item {...s.item}>Open…</Menu.Item>
              <Menu.Separator {...s.separator} />
              <Menu.Item {...s.item}>Print…</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <Menu.Root>
        <Menu.Trigger {...s.trigger}>Edit</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="start">
            <Menu.Popup {...s.popup}>
              <Menu.Item {...s.item}>Undo</Menu.Item>
              <Menu.Item {...s.item}>Redo</Menu.Item>
              <Menu.Separator {...s.separator} />
              <Menu.Item {...s.item}>Cut</Menu.Item>
              <Menu.Item {...s.item}>Copy</Menu.Item>
              <Menu.Item {...s.item}>Paste</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <Menu.Root>
        <Menu.Trigger {...s.trigger}>View</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={8} align="start">
            <Menu.Popup {...s.popup}>
              <Menu.CheckboxItem defaultChecked {...s.item}>
                Toolbar
                <Menu.CheckboxItemIndicator {...s.check}>
                  ✓
                </Menu.CheckboxItemIndicator>
              </Menu.CheckboxItem>
              <Menu.CheckboxItem {...s.item}>
                Word count
                <Menu.CheckboxItemIndicator {...s.check}>
                  ✓
                </Menu.CheckboxItemIndicator>
              </Menu.CheckboxItem>
              <Menu.Separator {...s.separator} />
              <Menu.Item {...s.item}>Full screen</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </Menubar>
  )
}
