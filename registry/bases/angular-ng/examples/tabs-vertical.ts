import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

@Component({
  selector: "tabs-vertical",
  imports: [Tabs, TabsList, TabsTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiTabs defaultValue="account" orientation="vertical">
        <div kuiTabsList>
          <button kuiTabsTrigger value="account">Account</button>
          <button kuiTabsTrigger value="password">Password</button>
          <button kuiTabsTrigger value="notifications">Notifications</button>
        </div>
      </div>
    </div>
  `,
})
export default class TabsVertical {
  protected readonly page = page
}
