import { Tooltip } from "@kirana-ui/react/tooltip"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"trigger" | "popup" | "arrow">
}) {
  return (
    <Tooltip.Root delay={300}>
      <Tooltip.Trigger {...s.trigger}>Publish</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup {...s.popup}>
            Everyone with the link can read it
            <Tooltip.Arrow {...s.arrow} />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
