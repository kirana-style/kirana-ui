import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar"

const styles = {
  w72: css({ width: { "*": null, base: space[72] } }),
}

@Component({
  selector: "menubar-icons",
  imports: [
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMenubar [sx]="styles.w72">
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>File</button>
          <div kuiMenubarContent>
            <div kuiMenubarItem>
              <svg
                iconPlaceholder
                lucide="FileIcon"
                tabler="IconFile"
                hugeicons="FileIcon"
                phosphor="FileIcon"
                remixicon="RiFileLine"
              ></svg>
              New File
              <span kuiMenubarShortcut>⌘N</span>
            </div>
            <div kuiMenubarItem>
              <svg
                iconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="FolderIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              ></svg>
              Open Folder
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarItem>
              <svg
                iconPlaceholder
                lucide="SaveIcon"
                tabler="IconDeviceFloppy"
                hugeicons="FloppyDiskIcon"
                phosphor="FloppyDiskIcon"
                remixicon="RiSaveLine"
              ></svg>
              Save
              <span kuiMenubarShortcut>⌘S</span>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>More</button>
          <div kuiMenubarContent>
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="TerminalIcon"
                  remixicon="RiSettingsLine"
                ></svg>
                Settings
              </div>
              <div kuiMenubarItem>
                <svg
                  iconPlaceholder
                  lucide="HelpCircleIcon"
                  tabler="IconHelpCircle"
                  hugeicons="HelpCircleIcon"
                  phosphor="QuestionIcon"
                  remixicon="RiQuestionLine"
                ></svg>
                Help
              </div>
              <div kuiMenubarSeparator></div>
              <div kuiMenubarItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                ></svg>
                Delete
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MenubarIcons {
  protected readonly styles = styles
  protected readonly page = page
}
