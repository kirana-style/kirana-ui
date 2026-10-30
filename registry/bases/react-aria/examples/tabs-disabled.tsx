import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"

export default function TabsDisabled() {
  return (
    <div sx={page.example}>
      <Tabs defaultSelectedKey="home">
        <TabsList>
          <TabsTrigger id="home">Home</TabsTrigger>
          <TabsTrigger id="settings" isDisabled>
            Disabled
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
