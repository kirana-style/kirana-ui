import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
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
} from "../ui/command"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

export default function CommandManyItems() {
  const [open, setOpen] = React.useState(false)

  return (
    <div sx={page.example}>
      <div sx={styles.flexCol4}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.wFit}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList
              renderEmptyState={() => (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            >
              <CommandGroup heading="Navigation">
                <CommandItem textValue="Home">
                  <IconPlaceholder
                    lucide="HomeIcon"
                    tabler="IconHome"
                    hugeicons="HomeIcon"
                    phosphor="HouseIcon"
                    remixicon="RiHomeLine"
                  />
                  <span>Home</span>
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Inbox">
                  <IconPlaceholder
                    lucide="InboxIcon"
                    tabler="IconInbox"
                    hugeicons="InboxIcon"
                    phosphor="TrayIcon"
                    remixicon="RiInboxLine"
                  />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Documents">
                  <IconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="FileIcon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  />
                  <span>Documents</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Folders">
                  <IconPlaceholder
                    lucide="FolderIcon"
                    tabler="IconFolder"
                    hugeicons="FolderIcon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                  />
                  <span>Folders</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem textValue="New File">
                  <IconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                  />
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="New Folder">
                  <IconPlaceholder
                    lucide="FolderPlusIcon"
                    tabler="IconFolderPlus"
                    hugeicons="FolderAddIcon"
                    phosphor="FolderPlusIcon"
                    remixicon="RiFolderAddLine"
                  />
                  <span>New Folder</span>
                  <CommandShortcut>⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Copy">
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />
                  <span>Copy</span>
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Cut">
                  <IconPlaceholder
                    lucide="ScissorsIcon"
                    tabler="IconCut"
                    hugeicons="ScissorIcon"
                    phosphor="ScissorsIcon"
                    remixicon="RiScissorsLine"
                  />
                  <span>Cut</span>
                  <CommandShortcut>⌘X</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Paste">
                  <IconPlaceholder
                    lucide="ClipboardPasteIcon"
                    tabler="IconClipboard"
                    hugeicons="ClipboardIcon"
                    phosphor="ClipboardIcon"
                    remixicon="RiClipboardLine"
                  />
                  <span>Paste</span>
                  <CommandShortcut>⌘V</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Delete">
                  <IconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="DeleteIcon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />
                  <span>Delete</span>
                  <CommandShortcut>⌫</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="View">
                <CommandItem textValue="Grid View">
                  <IconPlaceholder
                    lucide="LayoutGridIcon"
                    tabler="IconLayoutGrid"
                    hugeicons="GridIcon"
                    phosphor="GridFourIcon"
                    remixicon="RiGridLine"
                  />
                  <span>Grid View</span>
                </CommandItem>
                <CommandItem textValue="List View">
                  <IconPlaceholder
                    lucide="ListIcon"
                    tabler="IconListDetails"
                    hugeicons="Menu01Icon"
                    phosphor="ListIcon"
                    remixicon="RiListUnordered"
                  />
                  <span>List View</span>
                </CommandItem>
                <CommandItem textValue="Zoom In">
                  <IconPlaceholder
                    lucide="ZoomInIcon"
                    tabler="IconZoomIn"
                    hugeicons="ZoomInAreaIcon"
                    phosphor="MagnifyingGlassMinusIcon"
                    remixicon="RiSearchEyeLine"
                  />
                  <span>Zoom In</span>
                  <CommandShortcut>⌘+</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Zoom Out">
                  <IconPlaceholder
                    lucide="ZoomOutIcon"
                    tabler="IconZoomOut"
                    hugeicons="ZoomOutAreaIcon"
                    phosphor="MagnifyingGlassPlusIcon"
                    remixicon="RiZoomInLine"
                  />
                  <span>Zoom Out</span>
                  <CommandShortcut>⌘-</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <CommandItem textValue="Profile">
                  <IconPlaceholder
                    lucide="UserIcon"
                    tabler="IconUser"
                    hugeicons="UserIcon"
                    phosphor="UserIcon"
                    remixicon="RiUserLine"
                  />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Billing">
                  <IconPlaceholder
                    lucide="CreditCardIcon"
                    tabler="IconCreditCard"
                    hugeicons="CreditCardIcon"
                    phosphor="CreditCardIcon"
                    remixicon="RiBankCardLine"
                  />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Settings">
                  <IconPlaceholder
                    lucide="SettingsIcon"
                    tabler="IconSettings"
                    hugeicons="SettingsIcon"
                    phosphor="TerminalIcon"
                    remixicon="RiSettingsLine"
                  />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Notifications">
                  <IconPlaceholder
                    lucide="BellIcon"
                    tabler="IconBell"
                    hugeicons="NotificationIcon"
                    phosphor="BellIcon"
                    remixicon="RiNotificationLine"
                  />
                  <span>Notifications</span>
                </CommandItem>
                <CommandItem textValue="Help & Support">
                  <IconPlaceholder
                    lucide="HelpCircleIcon"
                    tabler="IconHelpCircle"
                    hugeicons="HelpCircleIcon"
                    phosphor="QuestionIcon"
                    remixicon="RiQuestionLine"
                  />
                  <span>Help & Support</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem textValue="Calculator">
                  <IconPlaceholder
                    lucide="CalculatorIcon"
                    tabler="IconCalculator"
                    hugeicons="CalculatorIcon"
                    phosphor="CalculatorIcon"
                    remixicon="RiCalculatorLine"
                  />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem textValue="Calendar">
                  <IconPlaceholder
                    lucide="CalendarIcon"
                    tabler="IconCalendar"
                    hugeicons="CalendarIcon"
                    phosphor="CalendarIcon"
                    remixicon="RiCalendarLine"
                  />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem textValue="Image Editor">
                  <IconPlaceholder
                    lucide="ImageIcon"
                    tabler="IconPhoto"
                    hugeicons="ImageIcon"
                    phosphor="ImageIcon"
                    remixicon="RiImageLine"
                  />
                  <span>Image Editor</span>
                </CommandItem>
                <CommandItem textValue="Code Editor">
                  <IconPlaceholder
                    lucide="CodeIcon"
                    tabler="IconBrandJavascript"
                    hugeicons="CodeIcon"
                    phosphor="CodeIcon"
                    remixicon="RiCodeLine"
                  />
                  <span>Code Editor</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  )
}
