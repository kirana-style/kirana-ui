/**
 * Upstream's `tabs-example`, every section.
 */
import { css } from "@kirana-style/core"

import { axes } from "../../../core/axes"
import { containerSize, space, spacing } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { example } from "../../../styles/example.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const { nova, vega, lyra, maia, mira, luma, rhea } = axes.style

const styles = {
  row: css({ display: "flex", gap: space[4] }),
  // `border` with each style's corners and padding; Sera's has neither.
  panel: css({
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: {
      [nova]: radius.lg,
      [vega]: radius.lg,
      [lyra]: "0",
      [maia]: radius.xl,
      [mira]: radius.md,
      [luma]: radius.xl,
      [rhea]: radius.xl,
    },
    padding: {
      [nova]: space[4],
      [vega]: space[6],
      [lyra]: space[4],
      [maia]: space[6],
      [mira]: space[4],
      [luma]: space[6],
      [rhea]: space[6],
    },
  }),
  spread: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  // `size-8` over the icon button's own size in every style.
  more: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  fullRow: css({ gridColumn: "1 / -1" }),
  centred: css({
    marginInline: "auto",
    width: "100%",
    maxWidth: containerSize.lg,
  }),
  toolbar: css({ display: "flex", alignItems: "center", gap: space[4] }),
  actions: css({
    marginInlineStart: "auto",
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  search: css({ width: spacing(44) }),
}

export default function TabsExample() {
  return (
    <ExampleWrapper>
      <TabsBasic />
      <TabsLine />
      <TabsVariantsComparison />
      <TabsDisabled />
      <TabsWithIcons />
      <TabsIconOnly />
      <TabsMultiple />
      <TabsWithContent />
      <TabsLineWithContent />
      <TabsLineDisabled />
      <TabsWithDropdown />
      <TabsVertical />
      <TabsWithInputAndButton />
    </ExampleWrapper>
  )
}

function TabsBasic() {
  return (
    <Example title="Basic">
      <Tabs defaultSelectedKey="home" sx={example.row}>
        <TabsList>
          <TabsTrigger id="home">Home</TabsTrigger>
          <TabsTrigger id="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsLine() {
  return (
    <Example title="Line">
      <Tabs defaultSelectedKey="overview" sx={example.row}>
        <TabsList variant="line">
          <TabsTrigger id="overview">Overview</TabsTrigger>
          <TabsTrigger id="analytics">Analytics</TabsTrigger>
          <TabsTrigger id="reports">Reports</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsVariantsComparison() {
  return (
    <Example title="Variants Alignment">
      <div sx={[styles.row, example.row]}>
        <Tabs defaultSelectedKey="overview">
          <TabsList>
            <TabsTrigger id="overview">Overview</TabsTrigger>
            <TabsTrigger id="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultSelectedKey="overview">
          <TabsList variant="line">
            <TabsTrigger id="overview">Overview</TabsTrigger>
            <TabsTrigger id="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Example>
  )
}

function TabsDisabled() {
  return (
    <Example title="Disabled">
      <Tabs defaultSelectedKey="home" sx={example.row}>
        <TabsList>
          <TabsTrigger id="home">Home</TabsTrigger>
          <TabsTrigger id="settings" isDisabled>
            Disabled
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsWithIcons() {
  return (
    <Example title="With Icons">
      <Tabs defaultSelectedKey="preview" sx={example.row}>
        <TabsList>
          <TabsTrigger id="preview">
            <IconPlaceholder
              lucide="AppWindowIcon"
              tabler="IconAppWindow"
              hugeicons="CursorInWindowIcon"
              phosphor="AppWindowIcon"
              remixicon="RiWindowLine"
            />
            Preview
          </TabsTrigger>
          <TabsTrigger id="code">
            <IconPlaceholder
              lucide="CodeIcon"
              tabler="IconCode"
              hugeicons="CodeIcon"
              phosphor="CodeIcon"
              remixicon="RiCodeLine"
            />
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsIconOnly() {
  return (
    <Example title="Icon Only">
      <Tabs defaultSelectedKey="home" sx={example.row}>
        <TabsList>
          <TabsTrigger id="home">
            <IconPlaceholder
              lucide="HomeIcon"
              tabler="IconHome"
              hugeicons="HomeIcon"
              phosphor="HouseIcon"
              remixicon="RiHomeLine"
            />
          </TabsTrigger>
          <TabsTrigger id="search">
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </TabsTrigger>
          <TabsTrigger id="settings">
            <IconPlaceholder
              lucide="SettingsIcon"
              tabler="IconSettings"
              hugeicons="SettingsIcon"
              phosphor="GearIcon"
              remixicon="RiSettingsLine"
            />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsMultiple() {
  return (
    <Example title="Multiple">
      <Tabs defaultSelectedKey="overview" sx={example.row}>
        <TabsList>
          <TabsTrigger id="overview">Overview</TabsTrigger>
          <TabsTrigger id="analytics">Analytics</TabsTrigger>
          <TabsTrigger id="reports">Reports</TabsTrigger>
          <TabsTrigger id="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsWithContent() {
  return (
    <Example title="With Content">
      <Tabs defaultSelectedKey="account" sx={example.row}>
        <TabsList>
          <TabsTrigger id="account">Account</TabsTrigger>
          <TabsTrigger id="password">Password</TabsTrigger>
          <TabsTrigger id="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div sx={styles.panel}>
          <TabsContent id="account">
            Manage your account preferences and profile information.
          </TabsContent>
          <TabsContent id="password">
            Update your password to keep your account secure.
          </TabsContent>
          <TabsContent id="notifications">
            Configure how you receive notifications and alerts.
          </TabsContent>
        </div>
      </Tabs>
    </Example>
  )
}

function TabsLineWithContent() {
  return (
    <Example title="Line With Content">
      <Tabs defaultSelectedKey="account" sx={example.row}>
        <TabsList variant="line">
          <TabsTrigger id="account">Account</TabsTrigger>
          <TabsTrigger id="password">Password</TabsTrigger>
          <TabsTrigger id="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div sx={styles.panel}>
          <TabsContent id="account">
            Manage your account preferences and profile information.
          </TabsContent>
          <TabsContent id="password">
            Update your password to keep your account secure.
          </TabsContent>
          <TabsContent id="notifications">
            Configure how you receive notifications and alerts.
          </TabsContent>
        </div>
      </Tabs>
    </Example>
  )
}

function TabsLineDisabled() {
  return (
    <Example title="Line Disabled">
      <Tabs defaultSelectedKey="overview" sx={example.row}>
        <TabsList variant="line">
          <TabsTrigger id="overview">Overview</TabsTrigger>
          <TabsTrigger id="analytics">Analytics</TabsTrigger>
          <TabsTrigger id="reports" isDisabled>
            Reports
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
  )
}

function TabsWithDropdown() {
  return (
    <Example title="With Dropdown">
      <Tabs defaultSelectedKey="overview" sx={example.row}>
        <div sx={styles.spread}>
          <TabsList>
            <TabsTrigger id="overview">Overview</TabsTrigger>
            <TabsTrigger id="analytics">Analytics</TabsTrigger>
            <TabsTrigger id="reports">Reports</TabsTrigger>
          </TabsList>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" sx={styles.more}>
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
              <span sx={visuallyHidden}>More options</span>
            </Button>
            <DropdownMenu placement="bottom end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </div>

        <div sx={styles.panel}>
          <TabsContent id="overview">
            View your dashboard metrics and key performance indicators.
          </TabsContent>
          <TabsContent id="analytics">
            Detailed analytics and insights about your data.
          </TabsContent>
          <TabsContent id="reports">
            Generate and view custom reports.
          </TabsContent>
        </div>
      </Tabs>
    </Example>
  )
}

function TabsVertical() {
  return (
    <Example title="Vertical">
      <Tabs
        defaultSelectedKey="account"
        orientation="vertical"
        sx={example.row}
      >
        <TabsList>
          <TabsTrigger id="account">Account</TabsTrigger>
          <TabsTrigger id="password">Password</TabsTrigger>
          <TabsTrigger id="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div sx={styles.panel}>
          <TabsContent id="account">
            Manage your account preferences and profile information.
          </TabsContent>
          <TabsContent id="password">
            Update your password to keep your account secure. Use a strong
            password with a mix of letters, numbers, and symbols.
          </TabsContent>
          <TabsContent id="notifications">
            Configure how you receive notifications and alerts. Choose which
            types of notifications you want to receive and how you want to
            receive them.
          </TabsContent>
        </div>
      </Tabs>
    </Example>
  )
}

function TabsWithInputAndButton() {
  return (
    <Example title="With Input and Button" containerSx={styles.fullRow}>
      <Tabs defaultSelectedKey="overview" sx={styles.centred}>
        <div sx={styles.toolbar}>
          <TabsList>
            <TabsTrigger id="overview">Overview</TabsTrigger>
            <TabsTrigger id="analytics">Analytics</TabsTrigger>
          </TabsList>
          <div sx={styles.actions}>
            <Input placeholder="Search..." sx={styles.search} />
            <Button>Action</Button>
          </div>
        </div>
        <div sx={styles.panel}>
          <TabsContent id="overview">
            View your dashboard metrics and key performance indicators.
          </TabsContent>
          <TabsContent id="analytics">
            Detailed analytics and insights about your data.
          </TabsContent>
          <TabsContent id="reports">
            Generate and view custom reports.
          </TabsContent>
        </div>
      </Tabs>
    </Example>
  )
}
