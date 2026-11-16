import { ContextMenu } from "@kirana-ui/react/context-menu"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"area" | "hint" | "popup" | "item" | "separator">
}) {
  const [last, setLast] = useState<string>()

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger {...s.area}>
        Right-click here
        <span {...s.hint}>
          {last ? `You chose ${last}` : "or press and hold on a touch screen"}
        </span>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup {...s.popup} aria-label="Actions">
            <ContextMenu.Item {...s.item} onClick={() => setLast("Cut")}>
              Cut
            </ContextMenu.Item>
            <ContextMenu.Item {...s.item} onClick={() => setLast("Copy")}>
              Copy
            </ContextMenu.Item>
            <ContextMenu.Item {...s.item} onClick={() => setLast("Paste")}>
              Paste
            </ContextMenu.Item>
            <ContextMenu.Separator {...s.separator} />
            <ContextMenu.Item {...s.item} onClick={() => setLast("Select all")}>
              Select all
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
