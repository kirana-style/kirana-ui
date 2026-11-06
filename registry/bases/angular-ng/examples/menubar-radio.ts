import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar"

const styles = {
  w72: css({ width: { "*": null, base: space[72] } }),
}

@Component({
  selector: "menubar-radio",
  imports: [
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMenubar [sx]="styles.w72">
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>Profiles</button>
          <div kuiMenubarContent>
            <div
              kuiMenubarRadioGroup
              [value]="user()"
              (valueChange)="user.set($any($event))"
            >
              <div kuiMenubarRadioItem value="andy">Andy</div>
              <div kuiMenubarRadioItem value="benoit">Benoit</div>
              <div kuiMenubarRadioItem value="luis">Luis</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarItem inset>Edit...</div>
            <div kuiMenubarItem inset>Add Profile...</div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>Theme</button>
          <div kuiMenubarContent>
            <div
              kuiMenubarRadioGroup
              [value]="theme()"
              (valueChange)="theme.set($any($event))"
            >
              <div kuiMenubarRadioItem value="light">Light</div>
              <div kuiMenubarRadioItem value="dark">Dark</div>
              <div kuiMenubarRadioItem value="system">System</div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MenubarRadio {
  protected readonly user = signal("benoit")
  protected readonly theme = signal("system")
  protected readonly styles = styles
  protected readonly page = page
}
