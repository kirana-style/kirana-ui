import { Collapsible } from "@kirana-ui/react/collapsible"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "trigger" | "panel" | "text">
}) {
  return (
    <Collapsible.Root {...s.root}>
      <Collapsible.Trigger {...s.trigger}>Recovery keys</Collapsible.Trigger>
      <Collapsible.Panel {...s.panel}>
        <p {...s.text}>alien-bean-pasta</p>
        <p {...s.text}>wild-irish-burrito</p>
        <p {...s.text}>horse-battery-staple</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
