import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

@Component({
  selector: "tabs-line",
  imports: [Tabs, TabsList, TabsTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiTabs defaultValue="overview">
        <div kuiTabsList variant="line">
          <button kuiTabsTrigger value="overview">Overview</button>
          <button kuiTabsTrigger value="analytics">Analytics</button>
          <button kuiTabsTrigger value="reports">Reports</button>
        </div>
      </div>
    </div>
  `,
})
export default class TabsLine {
  protected readonly page = page
}
