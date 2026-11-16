import { Resizable } from "@kirana-ui/react/resizable"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"group" | "panel" | "handle">
}) {
  return (
    <Resizable.Group {...s.group}>
      <Resizable.Panel defaultSize={35} minSize={20} {...s.panel}>
        Files
      </Resizable.Panel>
      <Resizable.Handle aria-label="Resize the panels" {...s.handle} />
      <Resizable.Panel defaultSize={65} minSize={20} {...s.panel}>
        Preview
      </Resizable.Panel>
    </Resizable.Group>
  )
}
