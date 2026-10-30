import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"

export default function TabsIcons() {
  return (
    <div sx={page.example}>
      <Tabs defaultSelectedKey="preview">
        <TabsList>
          <TabsTrigger id="preview">
            <IconPlaceholder
              lucide="AppWindowIcon"
              tabler="IconAppWindow"
              hugeicons="CursorInWindowIcon"
              phosphor="AppWindowIcon"
              remixicon="RiWindowLine"
            />
            Preview
          </TabsTrigger>
          <TabsTrigger id="code">
            <IconPlaceholder
              lucide="CodeIcon"
              tabler="IconBrandJavascript"
              hugeicons="CodeIcon"
              phosphor="CodeIcon"
              remixicon="RiCodeLine"
            />
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
