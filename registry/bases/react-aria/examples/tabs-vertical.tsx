import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"

export default function TabsVertical() {
  return (
    <div sx={page.example}>
      <Tabs defaultSelectedKey="account" orientation="vertical">
        <TabsList>
          <TabsTrigger id="account">Account</TabsTrigger>
          <TabsTrigger id="password">Password</TabsTrigger>
          <TabsTrigger id="notifications">Notifications</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
