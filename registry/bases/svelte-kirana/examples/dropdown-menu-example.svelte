<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
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

  let showSidebar = $state(true)

  let showStatusBar = $state(false)

  let checkboxesStatusBar = $state(true)

  let showActivityBar = $state(false)

  let showPanel = $state(false)

  const notifications = $state({
    email: true,
    sms: false,
    push: true,
  })

  let position = $state("bottom")

  let paymentMethod = $state("card")

  let showBookmarks = $state(true)

  let showUrls = $state(false)

  let theme = $state("system")
</script>

<ExampleWrapper>
  <!-- DropdownMenuBasic -->
  <Example title="Basic">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Open
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          GitHub
        </DropdownMenuItem>
        <DropdownMenuItem>
          Support
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          API
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuComplex -->
  <Example title="Complex">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Complex Menu
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.w56}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <IconPlaceholder lucide="UserIcon" tabler="IconUser" hugeicons="UserIcon" phosphor="UserIcon" remixicon="RiUserLine" />
            Profile
            <DropdownMenuShortcut>
              ⇧⌘P
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" />
            Billing
            <DropdownMenuShortcut>
              ⌘B
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder lucide="SettingsIcon" tabler="IconSettings" hugeicons="SettingsIcon" phosphor="GearIcon" remixicon="RiSettingsLine" />
            Settings
            <DropdownMenuShortcut>
              ⌘S
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            View
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={(details: { checked: typeof showSidebar }) => (showSidebar = details.checked)}>
            <IconPlaceholder lucide="PanelLeftIcon" tabler="IconLayoutSidebar" hugeicons="LayoutLeftIcon" phosphor="SidebarIcon" remixicon="RiSideBarLine" />
            Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={(details: { checked: typeof showStatusBar }) => (showStatusBar = details.checked)}>
            <IconPlaceholder lucide="LayoutIcon" tabler="IconLayout" hugeicons="LayoutIcon" phosphor="LayoutIcon" remixicon="RiLayoutLine" />
            Status Bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconPlaceholder lucide="UsersIcon" tabler="IconUsers" hugeicons="UserGroupIcon" phosphor="UsersIcon" remixicon="RiTeamLine" />
              Invite Users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="MailIcon" tabler="IconMail" hugeicons="MailIcon" phosphor="EnvelopeIcon" remixicon="RiMailLine" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="MessageSquareIcon" tabler="IconMessage" hugeicons="MessageIcon" phosphor="ChatCircleIcon" remixicon="RiChat1Line" />
                    Message
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="PlusCircleIcon" tabler="IconCirclePlus" hugeicons="AddCircleIcon" phosphor="PlusCircleIcon" remixicon="RiAddCircleLine" />
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
            <IconPlaceholder lucide="HelpCircleIcon" tabler="IconHelpCircle" hugeicons="HelpCircleIcon" phosphor="QuestionIcon" remixicon="RiQuestionLine" />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <IconPlaceholder lucide="LogOutIcon" tabler="IconLogout" hugeicons="LogoutIcon" phosphor="SignOutIcon" remixicon="RiLogoutBoxLine" />
            Sign Out
            <DropdownMenuShortcut>
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuSides -->
  <Example title="Sides" containerSx={styles.span}>
    <div sx={[styles.sides, example.row]}>
      {#each [
            'inline-start',
            'left',
            'top',
            'bottom',
            'right',
            'inline-end',
          ] as const as side (side)}
        <DropdownMenu>
          <DropdownMenuTrigger>
            {#snippet asChild(props)}
              <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fitCapitalize}>
                {side.replace("-", " ")}
              </Button>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent side={side}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      {/each}
    </div>
  </Example>
  <!-- DropdownMenuWithIcons -->
  <Example title="With Icons">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Open
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconPlaceholder lucide="UserIcon" tabler="IconUser" hugeicons="UserIcon" phosphor="UserIcon" remixicon="RiUserLine" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="SettingsIcon" tabler="IconSettings" hugeicons="SettingsIcon" phosphor="GearIcon" remixicon="RiSettingsLine" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <IconPlaceholder lucide="LogOutIcon" tabler="IconLogout" hugeicons="LogoutIcon" phosphor="SignOutIcon" remixicon="RiLogoutBoxLine" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithShortcuts -->
  <Example title="With Shortcuts">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Open
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>
              ⇧⌘P
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>
              ⌘B
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>
              ⌘S
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>
              ⌘K
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>
            ⇧⌘Q
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithSubmenu -->
  <Example title="With Submenu">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Open
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Team
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  More...
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>
              ⌘+T
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithCheckboxes -->
  <Example title="With Checkboxes">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Checkboxes
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.minW40}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Appearance
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={checkboxesStatusBar} onCheckedChange={(details: { checked: typeof checkboxesStatusBar }) => (checkboxesStatusBar = details.checked)}>
            <IconPlaceholder lucide="LayoutIcon" tabler="IconLayout" hugeicons="LayoutIcon" phosphor="LayoutIcon" remixicon="RiLayoutLine" />
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={(details: { checked: typeof showActivityBar }) => (showActivityBar = details.checked)} disabled>
            <IconPlaceholder lucide="ActivityIcon" tabler="IconActivity" hugeicons="ActivityIcon" phosphor="ActivityIcon" remixicon="RiPulseLine" />
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={(details: { checked: typeof showPanel }) => (showPanel = details.checked)}>
            <IconPlaceholder lucide="PanelLeftIcon" tabler="IconLayoutSidebar" hugeicons="LayoutLeftIcon" phosphor="SidebarIcon" remixicon="RiSideBarLine" />
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithCheckboxesIcons -->
  <Example title="Checkboxes with Icons">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Notifications
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.minW56}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Notification Preferences
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={notifications.email} onCheckedChange={(details: { checked: typeof notifications.email }) => (notifications.email = details.checked)}>
            <IconPlaceholder lucide="MailIcon" tabler="IconMail" hugeicons="MailIcon" phosphor="EnvelopeIcon" remixicon="RiMailLine" />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={notifications.sms} onCheckedChange={(details: { checked: typeof notifications.sms }) => (notifications.sms = details.checked)}>
            <IconPlaceholder lucide="MessageSquareIcon" tabler="IconMessage" hugeicons="MessageIcon" phosphor="ChatCircleIcon" remixicon="RiChat1Line" />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={notifications.push} onCheckedChange={(details: { checked: typeof notifications.push }) => (notifications.push = details.checked)}>
            <IconPlaceholder lucide="BellIcon" tabler="IconBell" hugeicons="NotificationIcon" phosphor="BellIcon" remixicon="RiNotificationLine" />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithRadio -->
  <Example title="With Radio Group">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Radio Group
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Panel Position
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={(details: { value: typeof position }) => (position = details.value)}>
            <DropdownMenuRadioItem value="top">
              <IconPlaceholder lucide="ArrowUpIcon" tabler="IconArrowUp" hugeicons="ArrowUp01Icon" phosphor="ArrowUpIcon" remixicon="RiArrowUpLine" />
              Top
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              <IconPlaceholder lucide="ArrowDownIcon" tabler="IconArrowDown" hugeicons="ArrowDown01Icon" phosphor="ArrowDownIcon" remixicon="RiArrowDownLine" />
              Bottom
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>
              <IconPlaceholder lucide="ArrowRightIcon" tabler="IconArrowRight" hugeicons="ArrowRight01Icon" phosphor="ArrowRightIcon" remixicon="RiArrowRightLine" />
              Right
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithRadioIcons -->
  <Example title="Radio with Icons">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Payment Method
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.minW56}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Select Payment Method
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={paymentMethod} onValueChange={(details: { value: typeof paymentMethod }) => (paymentMethod = details.value)}>
            <DropdownMenuRadioItem value="card">
              <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" />
              Credit Card
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <IconPlaceholder lucide="WalletIcon" tabler="IconWallet" hugeicons="WalletIcon" phosphor="WalletIcon" remixicon="RiWalletLine" />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <IconPlaceholder lucide="Building2Icon" tabler="IconBuildingBank" hugeicons="BankIcon" phosphor="BankIcon" remixicon="RiBankLine" />
              Bank Transfer
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuWithDestructive -->
  <Example title="With Destructive Items">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Actions
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconPlaceholder lucide="PencilIcon" tabler="IconPencil" hugeicons="EditIcon" phosphor="PencilIcon" remixicon="RiPencilLine" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPlaceholder lucide="ShareIcon" tabler="IconShare" hugeicons="ShareIcon" phosphor="ShareIcon" remixicon="RiShareLine" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconPlaceholder lucide="ArchiveIcon" tabler="IconArchive" hugeicons="Archive02Icon" phosphor="ArchiveIcon" remixicon="RiArchiveLine" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <IconPlaceholder lucide="TrashIcon" tabler="IconTrash" hugeicons="DeleteIcon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
  <!-- DropdownMenuInDialog -->
  <Example title="In Dialog">
    <Dialog>
      <DialogTrigger>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">
            Open Dialog
          </Button>
        {/snippet}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Dropdown Menu Example
          </DialogTitle>
          <DialogDescription>
            Click the button below to see the dropdown menu.
          </DialogDescription>
        </DialogHeader>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {#snippet asChild(props)}
              <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
                Open Menu
              </Button>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" hugeicons="CopyIcon" phosphor="CopyIcon" remixicon="RiFileCopyLine" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="ScissorsIcon" tabler="IconCut" hugeicons="ScissorIcon" phosphor="ScissorsIcon" remixicon="RiScissorsLine" />
              Cut
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="ClipboardPasteIcon" tabler="IconClipboard" hugeicons="ClipboardIcon" phosphor="ClipboardIcon" remixicon="RiClipboardLine" />
              Paste
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                More Options
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    Save Page...
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Create Shortcut...
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Name Window...
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Developer Tools
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder lucide="TrashIcon" tabler="IconTrash" hugeicons="DeleteIcon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogContent>
    </Dialog>
  </Example>
  <!-- DropdownMenuWithInset -->
  <Example title="With Inset">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
            Open
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent sx={styles.w44}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" hugeicons="CopyIcon" phosphor="CopyIcon" remixicon="RiFileCopyLine" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder lucide="ScissorsIcon" tabler="IconCut" hugeicons="ScissorIcon" phosphor="ScissorsIcon" remixicon="RiScissorsLine" />
            Cut
          </DropdownMenuItem>
          <DropdownMenuItem inset>
            Paste
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>
            Appearance
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem inset checked={showBookmarks} onCheckedChange={(details: { checked: typeof showBookmarks }) => (showBookmarks = details.checked)}>
            Bookmarks
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem inset checked={showUrls} onCheckedChange={(details: { checked: typeof showUrls }) => (showUrls = details.checked)}>
            Full URLs
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>
            Theme
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={(details: { value: typeof theme }) => (theme = details.value)}>
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
                <DropdownMenuItem>
                  Save Page...
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Create Shortcut...
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
</ExampleWrapper>
