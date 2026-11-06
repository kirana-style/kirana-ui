import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar"

const styles = {
  w72: css({ width: { "*": null, base: space[72] } }),
  w64: css({ width: { "*": null, base: space[64] } }),
}

@Component({
  selector: "menubar-checkbox",
  imports: [
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMenubar [sx]="styles.w72">
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>View</button>
          <div kuiMenubarContent [sx]="styles.w64">
            <div kuiMenubarCheckboxItem>Always Show Bookmarks Bar</div>
            <div kuiMenubarCheckboxItem checked>Always Show Full URLs</div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarItem inset>
              Reload
              <span kuiMenubarShortcut>⌘R</span>
            </div>
            <div kuiMenubarItem disabled inset>
              Force Reload
              <span kuiMenubarShortcut>⇧⌘R</span>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>Format</button>
          <div kuiMenubarContent>
            <div kuiMenubarCheckboxItem checked>Strikethrough</div>
            <div kuiMenubarCheckboxItem>Code</div>
            <div kuiMenubarCheckboxItem>Superscript</div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MenubarCheckbox {
  protected readonly styles = styles
  protected readonly page = page
}
