import { Drawer } from "@kirana-ui/react/drawer"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    "button" | "backdrop" | "popup" | "handle" | "title" | "description"
  >
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger {...s.button}>Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop {...s.backdrop} />
        <Drawer.Popup {...s.popup}>
          <div {...s.handle} aria-hidden="true" />
          <Drawer.Title {...s.title}>Notifications</Drawer.Title>
          <Drawer.Description {...s.description}>
            You are all caught up. Drag this down to close it.
          </Drawer.Description>
          <Drawer.Close {...s.button}>Done</Drawer.Close>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
