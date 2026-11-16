import { Popover } from "@kirana-ui/react/popover"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"trigger" | "popup" | "title" | "description" | "close">
}) {
  return (
    <Popover.Root>
      <Popover.Trigger {...s.trigger}>Notifications</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup {...s.popup}>
            <Popover.Title {...s.title}>Notifications</Popover.Title>
            <Popover.Description {...s.description}>
              You are all caught up. New mentions and replies will show here.
            </Popover.Description>
            <Popover.Close {...s.close}>Got it</Popover.Close>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
