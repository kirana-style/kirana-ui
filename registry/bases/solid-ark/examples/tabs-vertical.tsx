import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"

export default function TabsVertical() {
  return (
    <div sx={page.example}>
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
