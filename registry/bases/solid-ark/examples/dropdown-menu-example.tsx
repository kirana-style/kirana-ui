import { For, createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
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
import { createMutable } from "solid-js/store"

export default function DropdownMenuExample() {
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

  const [showSidebar, setShowSidebar] = createSignal(true)

  const [showStatusBar, setShowStatusBar] = createSignal(false)

  const [checkboxesStatusBar, setCheckboxesStatusBar] = createSignal(true)

  const [showActivityBar, setShowActivityBar] = createSignal(false)

  const [showPanel, setShowPanel] = createSignal(false)

  const notifications = createMutable({
    email: true,
    sms: false,
    push: true,
  })

  const [position, setPosition] = createSignal("bottom")

  const [paymentMethod, setPaymentMethod] = createSignal("card")

  const [showBookmarks, setShowBookmarks] = createSignal(true)

  const [showUrls, setShowUrls] = createSignal(false)

  const [theme, setTheme] = createSignal("system")

  return (
    <ExampleWrapper>
      <Example title="Basic">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Open
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Complex">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Complex Menu
              </Button>
            )}
          />
          <DropdownMenuContent sx={styles.w56}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                />{" "}
                Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                />{" "}
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="GearIcon"
                  remixicon="RiSettingsLine"
                />{" "}
                Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>View</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={showSidebar()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showSidebar>
                }) => setShowSidebar(details.checked)}
              >
                <IconPlaceholder
                  lucide="PanelLeftIcon"
                  tabler="IconLayoutSidebar"
                  hugeicons="LayoutLeftIcon"
                  phosphor="SidebarIcon"
                  remixicon="RiSideBarLine"
                />{" "}
                Sidebar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showStatusBar()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showStatusBar>
                }) => setShowStatusBar(details.checked)}
              >
                <IconPlaceholder
                  lucide="LayoutIcon"
                  tabler="IconLayout"
                  hugeicons="LayoutIcon"
                  phosphor="LayoutIcon"
                  remixicon="RiLayoutLine"
                />{" "}
                Status Bar
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <IconPlaceholder
                    lucide="UsersIcon"
                    tabler="IconUsers"
                    hugeicons="UserGroupIcon"
                    phosphor="UsersIcon"
                    remixicon="RiTeamLine"
                  />{" "}
                  Invite Users
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="MailIcon"
                          tabler="IconMail"
                          hugeicons="MailIcon"
                          phosphor="EnvelopeIcon"
                          remixicon="RiMailLine"
                        />{" "}
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="MessageSquareIcon"
                          tabler="IconMessage"
                          hugeicons="MessageIcon"
                          phosphor="ChatCircleIcon"
                          remixicon="RiChat1Line"
                        />{" "}
                        Message
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="PlusCircleIcon"
                          tabler="IconCirclePlus"
                          hugeicons="AddCircleIcon"
                          phosphor="PlusCircleIcon"
                          remixicon="RiAddCircleLine"
                        />{" "}
                        More...
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="HelpCircleIcon"
                  tabler="IconHelpCircle"
                  hugeicons="HelpCircleIcon"
                  phosphor="QuestionIcon"
                  remixicon="RiQuestionLine"
                />{" "}
                Support
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IconPlaceholder
                  lucide="LogOutIcon"
                  tabler="IconLogout"
                  hugeicons="LogoutIcon"
                  phosphor="SignOutIcon"
                  remixicon="RiLogoutBoxLine"
                />{" "}
                Sign Out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Sides" containerSx={styles.span}>
        <div sx={[styles.sides, example.row]}>
          <For
            each={
              [
                "inline-start",
                "left",
                "top",
                "bottom",
                "right",
                "inline-end",
              ] as const
            }
          >
            {(side) => (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(props) => (
                    <Button
                      {...props()}
                      variant="outline"
                      sx={styles.fitCapitalize}
                    >
                      {side.replace("-", " ")}
                    </Button>
                  )}
                />
                <DropdownMenuContent side={side}>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </For>
        </div>
      </Example>
      <Example title="With Icons">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Open
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              />{" "}
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              />{" "}
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="SettingsIcon"
                phosphor="GearIcon"
                remixicon="RiSettingsLine"
              />{" "}
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxLine"
              />{" "}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="With Shortcuts">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Open
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts{" "}
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="With Submenu">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Open
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="With Checkboxes">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Checkboxes
              </Button>
            )}
          />
          <DropdownMenuContent sx={styles.minW40}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={checkboxesStatusBar()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof checkboxesStatusBar>
                }) => setCheckboxesStatusBar(details.checked)}
              >
                <IconPlaceholder
                  lucide="LayoutIcon"
                  tabler="IconLayout"
                  hugeicons="LayoutIcon"
                  phosphor="LayoutIcon"
                  remixicon="RiLayoutLine"
                />{" "}
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showActivityBar>
                }) => setShowActivityBar(details.checked)}
                disabled
              >
                <IconPlaceholder
                  lucide="ActivityIcon"
                  tabler="IconActivity"
                  hugeicons="ActivityIcon"
                  phosphor="ActivityIcon"
                  remixicon="RiPulseLine"
                />{" "}
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showPanel>
                }) => setShowPanel(details.checked)}
              >
                <IconPlaceholder
                  lucide="PanelLeftIcon"
                  tabler="IconLayoutSidebar"
                  hugeicons="LayoutLeftIcon"
                  phosphor="SidebarIcon"
                  remixicon="RiSideBarLine"
                />{" "}
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Checkboxes with Icons">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Notifications
              </Button>
            )}
          />
          <DropdownMenuContent sx={styles.minW56}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={notifications.email}
                onCheckedChange={(details: {
                  checked: typeof notifications.email
                }) => (notifications.email = details.checked)}
              >
                <IconPlaceholder
                  lucide="MailIcon"
                  tabler="IconMail"
                  hugeicons="MailIcon"
                  phosphor="EnvelopeIcon"
                  remixicon="RiMailLine"
                />{" "}
                Email notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications.sms}
                onCheckedChange={(details: {
                  checked: typeof notifications.sms
                }) => (notifications.sms = details.checked)}
              >
                <IconPlaceholder
                  lucide="MessageSquareIcon"
                  tabler="IconMessage"
                  hugeicons="MessageIcon"
                  phosphor="ChatCircleIcon"
                  remixicon="RiChat1Line"
                />{" "}
                SMS notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications.push}
                onCheckedChange={(details: {
                  checked: typeof notifications.push
                }) => (notifications.push = details.checked)}
              >
                <IconPlaceholder
                  lucide="BellIcon"
                  tabler="IconBell"
                  hugeicons="NotificationIcon"
                  phosphor="BellIcon"
                  remixicon="RiNotificationLine"
                />{" "}
                Push notifications
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="With Radio Group">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Radio Group
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={position()}
                onValueChange={(details: {
                  value: ReturnType<typeof position>
                }) => setPosition(details.value)}
              >
                <DropdownMenuRadioItem value="top">
                  <IconPlaceholder
                    lucide="ArrowUpIcon"
                    tabler="IconArrowUp"
                    hugeicons="ArrowUp01Icon"
                    phosphor="ArrowUpIcon"
                    remixicon="RiArrowUpLine"
                  />{" "}
                  Top
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  <IconPlaceholder
                    lucide="ArrowDownIcon"
                    tabler="IconArrowDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="ArrowDownIcon"
                    remixicon="RiArrowDownLine"
                  />{" "}
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right" disabled>
                  <IconPlaceholder
                    lucide="ArrowRightIcon"
                    tabler="IconArrowRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="ArrowRightIcon"
                    remixicon="RiArrowRightLine"
                  />{" "}
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Radio with Icons">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Payment Method
              </Button>
            )}
          />
          <DropdownMenuContent sx={styles.minW56}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={paymentMethod()}
                onValueChange={(details: {
                  value: ReturnType<typeof paymentMethod>
                }) => setPaymentMethod(details.value)}
              >
                <DropdownMenuRadioItem value="card">
                  <IconPlaceholder
                    lucide="CreditCardIcon"
                    tabler="IconCreditCard"
                    hugeicons="CreditCardIcon"
                    phosphor="CreditCardIcon"
                    remixicon="RiBankCardLine"
                  />{" "}
                  Credit Card
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="paypal">
                  <IconPlaceholder
                    lucide="WalletIcon"
                    tabler="IconWallet"
                    hugeicons="WalletIcon"
                    phosphor="WalletIcon"
                    remixicon="RiWalletLine"
                  />{" "}
                  PayPal
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bank">
                  <IconPlaceholder
                    lucide="Building2Icon"
                    tabler="IconBuildingBank"
                    hugeicons="BankIcon"
                    phosphor="BankIcon"
                    remixicon="RiBankLine"
                  />{" "}
                  Bank Transfer
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="With Destructive Items">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Actions
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="PencilIcon"
                tabler="IconPencil"
                hugeicons="EditIcon"
                phosphor="PencilIcon"
                remixicon="RiPencilLine"
              />{" "}
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare"
                hugeicons="ShareIcon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              />{" "}
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="ArchiveIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              />{" "}
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />{" "}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="In Dialog">
        <Dialog>
          <DialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Open Dialog
              </Button>
            )}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dropdown Menu Example</DialogTitle>
              <DialogDescription>
                Click the button below to see the dropdown menu.
              </DialogDescription>
            </DialogHeader>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline" sx={styles.fit}>
                    Open Menu
                  </Button>
                )}
              />
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />{" "}
                  Copy
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ScissorsIcon"
                    tabler="IconCut"
                    hugeicons="ScissorIcon"
                    phosphor="ScissorsIcon"
                    remixicon="RiScissorsLine"
                  />{" "}
                  Cut
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ClipboardPasteIcon"
                    tabler="IconClipboard"
                    hugeicons="ClipboardIcon"
                    phosphor="ClipboardIcon"
                    remixicon="RiClipboardLine"
                  />{" "}
                  Paste
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Save Page...</DropdownMenuItem>
                      <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                      <DropdownMenuItem>Name Window...</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Developer Tools</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <IconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="DeleteIcon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />{" "}
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="With Inset">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.fit}>
                Open
              </Button>
            )}
          />
          <DropdownMenuContent sx={styles.w44}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="CopyIcon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />{" "}
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="ScissorsIcon"
                  tabler="IconCut"
                  hugeicons="ScissorIcon"
                  phosphor="ScissorsIcon"
                  remixicon="RiScissorsLine"
                />{" "}
                Cut
              </DropdownMenuItem>
              <DropdownMenuItem inset>Paste</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel inset>Appearance</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                inset
                checked={showBookmarks()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showBookmarks>
                }) => setShowBookmarks(details.checked)}
              >
                Bookmarks
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                inset
                checked={showUrls()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showUrls>
                }) => setShowUrls(details.checked)}
              >
                Full URLs
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel inset>Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={theme()}
                onValueChange={(details: { value: ReturnType<typeof theme> }) =>
                  setTheme(details.value)
                }
              >
                <DropdownMenuRadioItem inset value="light">
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem inset value="dark">
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem inset value="system">
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>
                More Options
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Save Page...</DropdownMenuItem>
                    <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
    </ExampleWrapper>
  )
}
