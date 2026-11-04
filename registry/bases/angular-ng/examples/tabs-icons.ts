import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

@Component({
  selector: "tabs-icons",
  imports: [Tabs, TabsList, TabsTrigger, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiTabs defaultValue="preview">
        <div kuiTabsList>
          <button kuiTabsTrigger value="preview">
            <svg
              iconPlaceholder
              lucide="AppWindowIcon"
              tabler="IconAppWindow"
              hugeicons="CursorInWindowIcon"
              phosphor="AppWindowIcon"
              remixicon="RiWindowLine"
            ></svg>
            Preview
          </button>
          <button kuiTabsTrigger value="code">
            <svg
              iconPlaceholder
              lucide="CodeIcon"
              tabler="IconBrandJavascript"
              hugeicons="CodeIcon"
              phosphor="CodeIcon"
              remixicon="RiCodeLine"
            ></svg>
            Code
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class TabsIcons {
  protected readonly page = page
}
