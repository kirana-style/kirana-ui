import { css } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const column = css({ display: "flex", flexDirection: "column", gap: space[6] })

export default function TabsDemo() {
  return (
    <div sx={[page.example, column]}>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <Tabs defaultValue="overview" orientation="vertical">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Your dashboard at a glance.</TabsContent>
        <TabsContent value="analytics">What changed this week.</TabsContent>
      </Tabs>
    </div>
  )
}
