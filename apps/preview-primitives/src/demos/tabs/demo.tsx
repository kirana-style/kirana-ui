import { Tabs } from "@kirana-ui/react/tabs"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "list" | "tab" | "indicator" | "panel">
}) {
  return (
    <Tabs.Root defaultValue="account" {...s.root}>
      <Tabs.List {...s.list}>
        <Tabs.Tab value="account" {...s.tab}>
          Account
        </Tabs.Tab>
        <Tabs.Tab value="password" {...s.tab}>
          Password
        </Tabs.Tab>
        <Tabs.Tab value="billing" {...s.tab}>
          Billing
        </Tabs.Tab>
        <Tabs.Indicator {...s.indicator} />
      </Tabs.List>
      <Tabs.Panel value="account" {...s.panel}>
        Change your name and the address we write to.
      </Tabs.Panel>
      <Tabs.Panel value="password" {...s.panel}>
        Choose a new password, or sign in with a passkey.
      </Tabs.Panel>
      <Tabs.Panel value="billing" {...s.panel}>
        See your plan, your card and every invoice.
      </Tabs.Panel>
    </Tabs.Root>
  )
}
