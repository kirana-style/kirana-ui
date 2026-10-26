import { css } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const column = css({ display: "flex", flexDirection: "column", gap: space[6] })

export default function TabsDemo() {
  return (
    <div sx={[page.example, column]}>
      <Tabs defaultSelectedKey="account">
        <TabsList>
          <TabsTrigger id="account">Account</TabsTrigger>
          <TabsTrigger id="password">Password</TabsTrigger>
          <TabsTrigger id="billing" isDisabled>
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent id="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent id="password">Change your password here.</TabsContent>
      </Tabs>
      <Tabs defaultSelectedKey="overview" orientation="vertical">
        <TabsList variant="line">
          <TabsTrigger id="overview">Overview</TabsTrigger>
          <TabsTrigger id="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent id="overview">Your dashboard at a glance.</TabsContent>
        <TabsContent id="analytics">What changed this week.</TabsContent>
      </Tabs>
    </div>
  )
}
