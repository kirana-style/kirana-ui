import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  fit: css({ width: "fit-content" }),
  // `capitalize` over the component's own text transform in every style (Sera's capitals).
  fitCapitalize: css({
    width: "fit-content",
    textTransform: { "*": null, base: "capitalize" },
  }),
  sides: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
  // Each replaces the menu's own value in every style, as `cn` drops the class it overrides: a plain
  // value would lose to the styles' conditional entries (Maia's, Luma's and Sera's `min-w-48`).
  minW40: css({ minWidth: { "*": null, base: spacing(40) } }),
  minW56: css({ minWidth: { "*": null, base: spacing(56) } }),
  w44: css({ width: { "*": null, base: spacing(44) } }),
  w56: css({ width: { "*": null, base: spacing(56) } }),
  span: css({ gridColumn: "span 2 / span 2" }),
}

const notifications = {
  email: true,
  sms: false,
  push: true,
}

@Component({
  selector: "dropdown-menu-example",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Example,
    ExampleWrapper,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- DropdownMenuBasic -->
      <div kuiExample title="Basic">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Open
          </button>
          <div kuiDropdownMenuContent>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>My Account</div>
              <div kuiDropdownMenuItem>Profile</div>
              <div kuiDropdownMenuItem>Billing</div>
              <div kuiDropdownMenuItem>Settings</div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuItem>GitHub</div>
            <div kuiDropdownMenuItem>Support</div>
            <div kuiDropdownMenuItem disabled>API</div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuComplex -->
      <div kuiExample title="Complex">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Complex Menu
          </button>
          <div kuiDropdownMenuContent [sx]="styles.w56">
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>My Account</div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                ></svg>
                Profile
                <span kuiDropdownMenuShortcut>⇧⌘P</span>
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                ></svg>
                Billing
                <span kuiDropdownMenuShortcut>⌘B</span>
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="GearIcon"
                  remixicon="RiSettingsLine"
                ></svg>
                Settings
                <span kuiDropdownMenuShortcut>⌘S</span>
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>View</div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="showSidebar">
                <svg
                  iconPlaceholder
                  lucide="PanelLeftIcon"
                  tabler="IconLayoutSidebar"
                  hugeicons="LayoutLeftIcon"
                  phosphor="SidebarIcon"
                  remixicon="RiSideBarLine"
                ></svg>
                Sidebar
              </div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="showStatusBar">
                <svg
                  iconPlaceholder
                  lucide="LayoutIcon"
                  tabler="IconLayout"
                  hugeicons="LayoutIcon"
                  phosphor="LayoutIcon"
                  remixicon="RiLayoutLine"
                ></svg>
                Status Bar
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <ng-container kuiDropdownMenuSub>
                <div kuiDropdownMenuSubTrigger>
                  <svg
                    iconPlaceholder
                    lucide="UsersIcon"
                    tabler="IconUsers"
                    hugeicons="UserGroupIcon"
                    phosphor="UsersIcon"
                    remixicon="RiTeamLine"
                  ></svg>
                  Invite Users
                </div>
                <ng-container kuiDropdownMenuPortal>
                  <div kuiDropdownMenuSubContent>
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="MailIcon"
                          tabler="IconMail"
                          hugeicons="MailIcon"
                          phosphor="EnvelopeIcon"
                          remixicon="RiMailLine"
                        ></svg>
                        Email
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="MessageSquareIcon"
                          tabler="IconMessage"
                          hugeicons="MessageIcon"
                          phosphor="ChatCircleIcon"
                          remixicon="RiChat1Line"
                        ></svg>
                        Message
                      </div>
                    </div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="PlusCircleIcon"
                          tabler="IconCirclePlus"
                          hugeicons="AddCircleIcon"
                          phosphor="PlusCircleIcon"
                          remixicon="RiAddCircleLine"
                        ></svg>
                        More...
                      </div>
                    </div>
                  </div>
                </ng-container>
              </ng-container>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="HelpCircleIcon"
                  tabler="IconHelpCircle"
                  hugeicons="HelpCircleIcon"
                  phosphor="QuestionIcon"
                  remixicon="RiQuestionLine"
                ></svg>
                Support
              </div>
              <div kuiDropdownMenuItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="LogOutIcon"
                  tabler="IconLogout"
                  hugeicons="LogoutIcon"
                  phosphor="SignOutIcon"
                  remixicon="RiLogoutBoxLine"
                ></svg>
                Sign Out
                <span kuiDropdownMenuShortcut>⇧⌘Q</span>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuSides -->
      <div kuiExample title="Sides" [containerSx]="styles.span">
        <div [sx]="[styles.sides, example.row]">
          @for (
            side of [
              "inline-start",
              "left",
              "top",
              "bottom",
              "right",
              "inline-end",
            ];
            track side
          ) {
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="outline"
                [sx]="styles.fitCapitalize"
              >
                {{ side.replace("-", " ") }}
              </button>
              <div kuiDropdownMenuContent [side]="$any(side)">
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>Profile</div>
                  <div kuiDropdownMenuItem>Billing</div>
                  <div kuiDropdownMenuItem>Settings</div>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- DropdownMenuWithIcons -->
      <div kuiExample title="With Icons">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Open
          </button>
          <div kuiDropdownMenuContent>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              ></svg>
              Profile
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              ></svg>
              Billing
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="SettingsIcon"
                phosphor="GearIcon"
                remixicon="RiSettingsLine"
              ></svg>
              Settings
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuItem variant="destructive">
              <svg
                iconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxLine"
              ></svg>
              Log out
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithShortcuts -->
      <div kuiExample title="With Shortcuts">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Open
          </button>
          <div kuiDropdownMenuContent>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>My Account</div>
              <div kuiDropdownMenuItem>
                Profile
                <span kuiDropdownMenuShortcut>⇧⌘P</span>
              </div>
              <div kuiDropdownMenuItem>
                Billing
                <span kuiDropdownMenuShortcut>⌘B</span>
              </div>
              <div kuiDropdownMenuItem>
                Settings
                <span kuiDropdownMenuShortcut>⌘S</span>
              </div>
              <div kuiDropdownMenuItem>
                Keyboard shortcuts
                <span kuiDropdownMenuShortcut>⌘K</span>
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuItem>
              Log out
              <span kuiDropdownMenuShortcut>⇧⌘Q</span>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithSubmenu -->
      <div kuiExample title="With Submenu">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Open
          </button>
          <div kuiDropdownMenuContent>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuItem>Team</div>
              <ng-container kuiDropdownMenuSub>
                <div kuiDropdownMenuSubTrigger>Invite users</div>
                <ng-container kuiDropdownMenuPortal>
                  <div kuiDropdownMenuSubContent>
                    <div kuiDropdownMenuItem>Email</div>
                    <div kuiDropdownMenuItem>Message</div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>More...</div>
                  </div>
                </ng-container>
              </ng-container>
              <div kuiDropdownMenuItem>
                New Team
                <span kuiDropdownMenuShortcut>⌘+T</span>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithCheckboxes -->
      <div kuiExample title="With Checkboxes">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Checkboxes
          </button>
          <div kuiDropdownMenuContent [sx]="styles.minW40">
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>Appearance</div>
              <div
                kuiDropdownMenuCheckboxItem
                [(checked)]="checkboxesStatusBar"
              >
                <svg
                  iconPlaceholder
                  lucide="LayoutIcon"
                  tabler="IconLayout"
                  hugeicons="LayoutIcon"
                  phosphor="LayoutIcon"
                  remixicon="RiLayoutLine"
                ></svg>
                Status Bar
              </div>
              <div
                kuiDropdownMenuCheckboxItem
                [(checked)]="showActivityBar"
                disabled
              >
                <svg
                  iconPlaceholder
                  lucide="ActivityIcon"
                  tabler="IconActivity"
                  hugeicons="ActivityIcon"
                  phosphor="ActivityIcon"
                  remixicon="RiPulseLine"
                ></svg>
                Activity Bar
              </div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="showPanel">
                <svg
                  iconPlaceholder
                  lucide="PanelLeftIcon"
                  tabler="IconLayoutSidebar"
                  hugeicons="LayoutLeftIcon"
                  phosphor="SidebarIcon"
                  remixicon="RiSideBarLine"
                ></svg>
                Panel
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithCheckboxesIcons -->
      <div kuiExample title="Checkboxes with Icons">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Notifications
          </button>
          <div kuiDropdownMenuContent [sx]="styles.minW56">
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>Notification Preferences</div>
              <div
                kuiDropdownMenuCheckboxItem
                [(checked)]="notifications.email"
              >
                <svg
                  iconPlaceholder
                  lucide="MailIcon"
                  tabler="IconMail"
                  hugeicons="MailIcon"
                  phosphor="EnvelopeIcon"
                  remixicon="RiMailLine"
                ></svg>
                Email notifications
              </div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.sms">
                <svg
                  iconPlaceholder
                  lucide="MessageSquareIcon"
                  tabler="IconMessage"
                  hugeicons="MessageIcon"
                  phosphor="ChatCircleIcon"
                  remixicon="RiChat1Line"
                ></svg>
                SMS notifications
              </div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.push">
                <svg
                  iconPlaceholder
                  lucide="BellIcon"
                  tabler="IconBell"
                  hugeicons="NotificationIcon"
                  phosphor="BellIcon"
                  remixicon="RiNotificationLine"
                ></svg>
                Push notifications
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithRadio -->
      <div kuiExample title="With Radio Group">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Radio Group
          </button>
          <div kuiDropdownMenuContent>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>Panel Position</div>
              <div kuiDropdownMenuRadioGroup [(value)]="position">
                <div kuiDropdownMenuRadioItem value="top">
                  <svg
                    iconPlaceholder
                    lucide="ArrowUpIcon"
                    tabler="IconArrowUp"
                    hugeicons="ArrowUp01Icon"
                    phosphor="ArrowUpIcon"
                    remixicon="RiArrowUpLine"
                  ></svg>
                  Top
                </div>
                <div kuiDropdownMenuRadioItem value="bottom">
                  <svg
                    iconPlaceholder
                    lucide="ArrowDownIcon"
                    tabler="IconArrowDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="ArrowDownIcon"
                    remixicon="RiArrowDownLine"
                  ></svg>
                  Bottom
                </div>
                <div kuiDropdownMenuRadioItem value="right" disabled>
                  <svg
                    iconPlaceholder
                    lucide="ArrowRightIcon"
                    tabler="IconArrowRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="ArrowRightIcon"
                    remixicon="RiArrowRightLine"
                  ></svg>
                  Right
                </div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithRadioIcons -->
      <div kuiExample title="Radio with Icons">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Payment Method
          </button>
          <div kuiDropdownMenuContent [sx]="styles.minW56">
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>Select Payment Method</div>
              <div kuiDropdownMenuRadioGroup [(value)]="paymentMethod">
                <div kuiDropdownMenuRadioItem value="card">
                  <svg
                    iconPlaceholder
                    lucide="CreditCardIcon"
                    tabler="IconCreditCard"
                    hugeicons="CreditCardIcon"
                    phosphor="CreditCardIcon"
                    remixicon="RiBankCardLine"
                  ></svg>
                  Credit Card
                </div>
                <div kuiDropdownMenuRadioItem value="paypal">
                  <svg
                    iconPlaceholder
                    lucide="WalletIcon"
                    tabler="IconWallet"
                    hugeicons="WalletIcon"
                    phosphor="WalletIcon"
                    remixicon="RiWalletLine"
                  ></svg>
                  PayPal
                </div>
                <div kuiDropdownMenuRadioItem value="bank">
                  <svg
                    iconPlaceholder
                    lucide="Building2Icon"
                    tabler="IconBuildingBank"
                    hugeicons="BankIcon"
                    phosphor="BankIcon"
                    remixicon="RiBankLine"
                  ></svg>
                  Bank Transfer
                </div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithDestructive -->
      <div kuiExample title="With Destructive Items">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Actions
          </button>
          <div kuiDropdownMenuContent>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="PencilIcon"
                tabler="IconPencil"
                hugeicons="EditIcon"
                phosphor="PencilIcon"
                remixicon="RiPencilLine"
              ></svg>
              Edit
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare"
                hugeicons="ShareIcon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              ></svg>
              Share
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="ArchiveIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
              Archive
            </div>
            <div kuiDropdownMenuItem variant="destructive">
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
        </ng-container>
      </div>
      <!-- DropdownMenuInDialog -->
      <div kuiExample title="In Dialog">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Dropdown Menu Example</h2>
              <p kuiDialogDescription>
                Click the button below to see the dropdown menu.
              </p>
            </div>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="outline"
                [sx]="styles.fit"
              >
                Open Menu
              </button>
              <div kuiDropdownMenuContent>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                  Copy
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ScissorsIcon"
                    tabler="IconCut"
                    hugeicons="ScissorIcon"
                    phosphor="ScissorsIcon"
                    remixicon="RiScissorsLine"
                  ></svg>
                  Cut
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ClipboardPasteIcon"
                    tabler="IconClipboard"
                    hugeicons="ClipboardIcon"
                    phosphor="ClipboardIcon"
                    remixicon="RiClipboardLine"
                  ></svg>
                  Paste
                </div>
                <div kuiDropdownMenuSeparator></div>
                <ng-container kuiDropdownMenuSub>
                  <div kuiDropdownMenuSubTrigger>More Options</div>
                  <ng-container kuiDropdownMenuPortal>
                    <div kuiDropdownMenuSubContent>
                      <div kuiDropdownMenuItem>Save Page...</div>
                      <div kuiDropdownMenuItem>Create Shortcut...</div>
                      <div kuiDropdownMenuItem>Name Window...</div>
                      <div kuiDropdownMenuSeparator></div>
                      <div kuiDropdownMenuItem>Developer Tools</div>
                    </div>
                  </ng-container>
                </ng-container>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuItem variant="destructive">
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
            </ng-container>
          </div>
        </ng-container>
      </div>
      <!-- DropdownMenuWithInset -->
      <div kuiExample title="With Inset">
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Open
          </button>
          <div kuiDropdownMenuContent [sx]="styles.w44">
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>Actions</div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="CopyIcon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
                Copy
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                  phosphor="ScissorsIcon"
                  remixicon="RiScissorsLine"
                ></svg>
                Cut
              </div>
              <div kuiDropdownMenuItem inset>Paste</div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel inset>Appearance</div>
              <div
                kuiDropdownMenuCheckboxItem
                inset
                [(checked)]="showBookmarks"
              >
                Bookmarks
              </div>
              <div kuiDropdownMenuCheckboxItem inset [(checked)]="showUrls">
                Full URLs
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel inset>Theme</div>
              <div kuiDropdownMenuRadioGroup [(value)]="theme">
                <div kuiDropdownMenuRadioItem inset value="light">Light</div>
                <div kuiDropdownMenuRadioItem inset value="dark">Dark</div>
                <div kuiDropdownMenuRadioItem inset value="system">System</div>
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <ng-container kuiDropdownMenuSub>
              <div kuiDropdownMenuSubTrigger inset>More Options</div>
              <ng-container kuiDropdownMenuPortal>
                <div kuiDropdownMenuSubContent>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>Save Page...</div>
                    <div kuiDropdownMenuItem>Create Shortcut...</div>
                  </div>
                </div>
              </ng-container>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class DropdownMenuExample {
  protected readonly showSidebar = signal(true)
  protected readonly showStatusBar = signal(false)
  protected readonly checkboxesStatusBar = signal(true)
  protected readonly showActivityBar = signal(false)
  protected readonly showPanel = signal(false)
  protected readonly position = signal("bottom")
  protected readonly paymentMethod = signal("card")
  protected readonly showBookmarks = signal(true)
  protected readonly showUrls = signal(false)
  protected readonly theme = signal("system")
  protected readonly styles = styles
  protected readonly notifications = notifications
  protected readonly example = example
}
