import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"

export default function TabsLine() {
  return (
    <div sx={page.example}>
      <Tabs defaultSelectedKey="overview">
        <TabsList variant="line">
          <TabsTrigger id="overview">Overview</TabsTrigger>
          <TabsTrigger id="analytics">Analytics</TabsTrigger>
          <TabsTrigger id="reports">Reports</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
