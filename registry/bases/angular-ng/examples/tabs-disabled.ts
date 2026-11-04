import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

@Component({
  selector: "tabs-disabled",
  imports: [Tabs, TabsList, TabsTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiTabs defaultValue="home">
        <div kuiTabsList>
          <button kuiTabsTrigger value="home">Home</button>
          <button kuiTabsTrigger value="settings" disabled>Disabled</button>
        </div>
      </div>
    </div>
  `,
})
export default class TabsDisabled {
  protected readonly page = page
}
