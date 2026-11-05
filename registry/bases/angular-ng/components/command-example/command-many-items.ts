import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { example } from "../../../../styles/example.styles"
import { space } from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../ui/command"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

@Component({
  selector: "kui-command-many-items",
  imports: [
    Button,
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    Example,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Many Groups & Items">
      <div [sx]="[styles.flexCol4, example.row]">
        <button
          kuiButton
          (click)="open.set(true)"
          variant="outline"
          [sx]="styles.wFit"
        >
          Open Menu
        </button>
        <kui-command-dialog [(open)]="open">
          <div kuiCommand>
            <div
              kuiCommandInput
              placeholder="Type a command or search..."
            ></div>
            <div kuiCommandList>
              <div kuiCommandEmpty>No results found.</div>
              <div kuiCommandGroup heading="Navigation">
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="HomeIcon"
                    tabler="IconHome"
                    hugeicons="HomeIcon"
                    phosphor="HouseIcon"
                    remixicon="RiHomeLine"
                  ></svg>
                  <span>Home</span>
                  <span kuiCommandShortcut>⌘H</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="InboxIcon"
                    tabler="IconInbox"
                    hugeicons="InboxIcon"
                    phosphor="TrayIcon"
                    remixicon="RiInboxLine"
                  ></svg>
                  <span>Inbox</span>
                  <span kuiCommandShortcut>⌘I</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="File02Icon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  ></svg>
                  <span>Documents</span>
                  <span kuiCommandShortcut>⌘D</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="FolderIcon"
                    tabler="IconFolder"
                    hugeicons="FolderIcon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                  ></svg>
                  <span>Folders</span>
                  <span kuiCommandShortcut>⌘F</span>
                </div>
              </div>
              <div kuiCommandSeparator></div>
              <div kuiCommandGroup heading="Actions">
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                  ></svg>
                  <span>New File</span>
                  <span kuiCommandShortcut>⌘N</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="FolderPlusIcon"
                    tabler="IconFolderPlus"
                    hugeicons="FolderAddIcon"
                    phosphor="FolderPlusIcon"
                    remixicon="RiFolderAddLine"
                  ></svg>
                  <span>New Folder</span>
                  <span kuiCommandShortcut>⇧⌘N</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                  <span>Copy</span>
                  <span kuiCommandShortcut>⌘C</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="ScissorsIcon"
                    tabler="IconCut"
                    hugeicons="ScissorIcon"
                    phosphor="ScissorsIcon"
                    remixicon="RiScissorsLine"
                  ></svg>
                  <span>Cut</span>
                  <span kuiCommandShortcut>⌘X</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="ClipboardPasteIcon"
                    tabler="IconClipboard"
                    hugeicons="ClipboardIcon"
                    phosphor="ClipboardIcon"
                    remixicon="RiClipboardLine"
                  ></svg>
                  <span>Paste</span>
                  <span kuiCommandShortcut>⌘V</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="DeleteIcon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  ></svg>
                  <span>Delete</span>
                  <span kuiCommandShortcut>⌫</span>
                </div>
              </div>
              <div kuiCommandSeparator></div>
              <div kuiCommandGroup heading="View">
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="LayoutGridIcon"
                    tabler="IconLayoutGrid"
                    hugeicons="GridIcon"
                    phosphor="GridFourIcon"
                    remixicon="RiGridLine"
                  ></svg>
                  <span>Grid View</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="ListIcon"
                    tabler="IconList"
                    hugeicons="Menu05Icon"
                    phosphor="ListIcon"
                    remixicon="RiListUnordered"
                  ></svg>
                  <span>List View</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="ZoomInIcon"
                    tabler="IconZoomIn"
                    hugeicons="ZoomInAreaIcon"
                    phosphor="MagnifyingGlassPlusIcon"
                    remixicon="RiZoomInLine"
                  ></svg>
                  <span>Zoom In</span>
                  <span kuiCommandShortcut>⌘+</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="ZoomOutIcon"
                    tabler="IconZoomOut"
                    hugeicons="ZoomOutAreaIcon"
                    phosphor="MagnifyingGlassMinusIcon"
                    remixicon="RiSearchEyeLine"
                  ></svg>
                  <span>Zoom Out</span>
                  <span kuiCommandShortcut>⌘-</span>
                </div>
              </div>
              <div kuiCommandSeparator></div>
              <div kuiCommandGroup heading="Account">
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="UserIcon"
                    tabler="IconUser"
                    hugeicons="UserIcon"
                    phosphor="UserIcon"
                    remixicon="RiUserLine"
                  ></svg>
                  <span>Profile</span>
                  <span kuiCommandShortcut>⌘P</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="CreditCardIcon"
                    tabler="IconCreditCard"
                    hugeicons="CreditCardIcon"
                    phosphor="CreditCardIcon"
                    remixicon="RiBankCardLine"
                  ></svg>
                  <span>Billing</span>
                  <span kuiCommandShortcut>⌘B</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="SettingsIcon"
                    tabler="IconSettings"
                    hugeicons="SettingsIcon"
                    phosphor="GearIcon"
                    remixicon="RiSettingsLine"
                  ></svg>
                  <span>Settings</span>
                  <span kuiCommandShortcut>⌘S</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="BellIcon"
                    tabler="IconBell"
                    hugeicons="NotificationIcon"
                    phosphor="BellIcon"
                    remixicon="RiNotificationLine"
                  ></svg>
                  <span>Notifications</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="HelpCircleIcon"
                    tabler="IconHelpCircle"
                    hugeicons="HelpCircleIcon"
                    phosphor="QuestionIcon"
                    remixicon="RiQuestionLine"
                  ></svg>
                  <span>Help & Support</span>
                </div>
              </div>
              <div kuiCommandSeparator></div>
              <div kuiCommandGroup heading="Tools">
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="CalculatorIcon"
                    tabler="IconCalculator"
                    hugeicons="CalculatorIcon"
                    phosphor="CalculatorIcon"
                    remixicon="RiCalculatorLine"
                  ></svg>
                  <span>Calculator</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="CalendarIcon"
                    tabler="IconCalendar"
                    hugeicons="CalendarIcon"
                    phosphor="CalendarBlankIcon"
                    remixicon="RiCalendarLine"
                  ></svg>
                  <span>Calendar</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="ImageIcon"
                    tabler="IconPhoto"
                    hugeicons="ImageIcon"
                    phosphor="ImageIcon"
                    remixicon="RiImageLine"
                  ></svg>
                  <span>Image Editor</span>
                </div>
                <div kuiCommandItem>
                  <svg
                    iconPlaceholder
                    lucide="CodeIcon"
                    tabler="IconCode"
                    hugeicons="CodeIcon"
                    phosphor="CodeIcon"
                    remixicon="RiCodeLine"
                  ></svg>
                  <span>Code Editor</span>
                </div>
              </div>
            </div>
          </div>
        </kui-command-dialog>
      </div>
    </div>
  `,
})
export class CommandManyItems {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly example = example
}
