import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar"

const styles = {
  w72: css({ width: { "*": null, base: space[72] } }),
}

@Component({
  selector: "menubar-submenu",
  imports: [
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMenubar [sx]="styles.w72">
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>File</button>
          <div kuiMenubarContent>
            <ng-container kuiMenubarSub>
              <div kuiMenubarSubTrigger>Share</div>
              <div kuiMenubarSubContent>
                <div kuiMenubarItem>Email link</div>
                <div kuiMenubarItem>Messages</div>
                <div kuiMenubarItem>Notes</div>
              </div>
            </ng-container>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarItem>
              Print...
              <span kuiMenubarShortcut>⌘P</span>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>Edit</button>
          <div kuiMenubarContent>
            <div kuiMenubarItem>
              Undo
              <span kuiMenubarShortcut>⌘Z</span>
            </div>
            <div kuiMenubarItem>
              Redo
              <span kuiMenubarShortcut>⇧⌘Z</span>
            </div>
            <div kuiMenubarSeparator></div>
            <ng-container kuiMenubarSub>
              <div kuiMenubarSubTrigger>Find</div>
              <div kuiMenubarSubContent>
                <div kuiMenubarItem>Find...</div>
                <div kuiMenubarItem>Find Next</div>
                <div kuiMenubarItem>Find Previous</div>
              </div>
            </ng-container>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarItem>Cut</div>
            <div kuiMenubarItem>Copy</div>
            <div kuiMenubarItem>Paste</div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MenubarSubmenu {
  protected readonly styles = styles
  protected readonly page = page
}
