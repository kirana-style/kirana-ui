import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar"

const styles = {
  w72: css({ width: { "*": null, base: space[72] } }),
  w44: css({ width: { "*": null, base: space[44] } }),
}

@Component({
  selector: "menubar-demo",
  imports: [
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
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
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                New Tab
                <span kuiMenubarShortcut>⌘T</span>
              </div>
              <div kuiMenubarItem>
                New Window
                <span kuiMenubarShortcut>⌘N</span>
              </div>
              <div kuiMenubarItem disabled>New Incognito Window</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>Share</div>
                <div kuiMenubarSubContent>
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>Email link</div>
                    <div kuiMenubarItem>Messages</div>
                    <div kuiMenubarItem>Notes</div>
                  </div>
                </div>
              </ng-container>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                Print...
                <span kuiMenubarShortcut>⌘P</span>
              </div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>Edit</button>
          <div kuiMenubarContent>
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                Undo
                <span kuiMenubarShortcut>⌘Z</span>
              </div>
              <div kuiMenubarItem>
                Redo
                <span kuiMenubarShortcut>⇧⌘Z</span>
              </div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>Find</div>
                <div kuiMenubarSubContent>
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>Search the web</div>
                  </div>
                  <div kuiMenubarSeparator></div>
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>Find...</div>
                    <div kuiMenubarItem>Find Next</div>
                    <div kuiMenubarItem>Find Previous</div>
                  </div>
                </div>
              </ng-container>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem>Cut</div>
              <div kuiMenubarItem>Copy</div>
              <div kuiMenubarItem>Paste</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>View</button>
          <div kuiMenubarContent [sx]="styles.w44">
            <div kuiMenubarGroup>
              <div kuiMenubarCheckboxItem>Bookmarks Bar</div>
              <div kuiMenubarCheckboxItem checked>Full URLs</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>
                Reload
                <span kuiMenubarShortcut>⌘R</span>
              </div>
              <div kuiMenubarItem disabled inset>
                Force Reload
                <span kuiMenubarShortcut>⇧⌘R</span>
              </div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>Toggle Fullscreen</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>Hide Sidebar</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>Profiles</button>
          <div kuiMenubarContent>
            <div kuiMenubarRadioGroup value="benoit">
              <div kuiMenubarRadioItem value="andy">Andy</div>
              <div kuiMenubarRadioItem value="benoit">Benoit</div>
              <div kuiMenubarRadioItem value="Luis">Luis</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup><div kuiMenubarItem inset>Edit...</div></div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>Add Profile...</div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MenubarDemo {
  protected readonly styles = styles
  protected readonly page = page
}
