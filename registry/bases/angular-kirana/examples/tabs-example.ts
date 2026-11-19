import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { containerSize, space, spacing } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { example } from "../../../styles/example.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
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

@Component({
  selector: "tabs-example",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Example,
    ExampleWrapper,
    Input,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- TabsBasic -->
      <div kuiExample title="Basic">
        <div kuiTabs defaultValue="home" [sx]="example.row">
          <div kuiTabsList>
            <button kuiTabsTrigger value="home">Home</button>
            <button kuiTabsTrigger value="settings">Settings</button>
          </div>
        </div>
      </div>
      <!-- TabsLine -->
      <div kuiExample title="Line">
        <div kuiTabs defaultValue="overview" [sx]="example.row">
          <div kuiTabsList variant="line">
            <button kuiTabsTrigger value="overview">Overview</button>
            <button kuiTabsTrigger value="analytics">Analytics</button>
            <button kuiTabsTrigger value="reports">Reports</button>
          </div>
        </div>
      </div>
      <!-- TabsVariantsComparison -->
      <div kuiExample title="Variants Alignment">
        <div [sx]="[styles.row, example.row]">
          <div kuiTabs defaultValue="overview">
            <div kuiTabsList>
              <button kuiTabsTrigger value="overview">Overview</button>
              <button kuiTabsTrigger value="analytics">Analytics</button>
            </div>
          </div>
          <div kuiTabs defaultValue="overview">
            <div kuiTabsList variant="line">
              <button kuiTabsTrigger value="overview">Overview</button>
              <button kuiTabsTrigger value="analytics">Analytics</button>
            </div>
          </div>
        </div>
      </div>
      <!-- TabsDisabled -->
      <div kuiExample title="Disabled">
        <div kuiTabs defaultValue="home" [sx]="example.row">
          <div kuiTabsList>
            <button kuiTabsTrigger value="home">Home</button>
            <button kuiTabsTrigger value="settings" disabled>Disabled</button>
          </div>
        </div>
      </div>
      <!-- TabsWithIcons -->
      <div kuiExample title="With Icons">
        <div kuiTabs defaultValue="preview" [sx]="example.row">
          <div kuiTabsList>
            <button kuiTabsTrigger value="preview">
              <svg
                iconPlaceholder
                lucide="AppWindowIcon"
                tabler="IconAppWindow"
                hugeicons="CursorInWindowIcon"
                phosphor="AppWindowIcon"
                remixicon="RiWindowLine"
              ></svg>
              Preview
            </button>
            <button kuiTabsTrigger value="code">
              <svg
                iconPlaceholder
                lucide="CodeIcon"
                tabler="IconCode"
                hugeicons="CodeIcon"
                phosphor="CodeIcon"
                remixicon="RiCodeLine"
              ></svg>
              Code
            </button>
          </div>
        </div>
      </div>
      <!-- TabsIconOnly -->
      <div kuiExample title="Icon Only">
        <div kuiTabs defaultValue="home" [sx]="example.row">
          <div kuiTabsList>
            <button kuiTabsTrigger value="home">
              <svg
                iconPlaceholder
                lucide="HomeIcon"
                tabler="IconHome"
                hugeicons="HomeIcon"
                phosphor="HouseIcon"
                remixicon="RiHomeLine"
              ></svg>
            </button>
            <button kuiTabsTrigger value="search">
              <svg
                iconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              ></svg>
            </button>
            <button kuiTabsTrigger value="settings">
              <svg
                iconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="SettingsIcon"
                phosphor="GearIcon"
                remixicon="RiSettingsLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- TabsMultiple -->
      <div kuiExample title="Multiple">
        <div kuiTabs defaultValue="overview" [sx]="example.row">
          <div kuiTabsList>
            <button kuiTabsTrigger value="overview">Overview</button>
            <button kuiTabsTrigger value="analytics">Analytics</button>
            <button kuiTabsTrigger value="reports">Reports</button>
            <button kuiTabsTrigger value="settings">Settings</button>
          </div>
        </div>
      </div>
      <!-- TabsWithContent -->
      <div kuiExample title="With Content">
        <div kuiTabs defaultValue="account" [sx]="example.row">
          <div kuiTabsList>
            <button kuiTabsTrigger value="account">Account</button>
            <button kuiTabsTrigger value="password">Password</button>
            <button kuiTabsTrigger value="notifications">Notifications</button>
          </div>
          <div [sx]="styles.panel">
            <div kuiTabsContent value="account">
              Manage your account preferences and profile information.
            </div>
            <div kuiTabsContent value="password">
              Update your password to keep your account secure.
            </div>
            <div kuiTabsContent value="notifications">
              Configure how you receive notifications and alerts.
            </div>
          </div>
        </div>
      </div>
      <!-- TabsLineWithContent -->
      <div kuiExample title="Line With Content">
        <div kuiTabs defaultValue="account" [sx]="example.row">
          <div kuiTabsList variant="line">
            <button kuiTabsTrigger value="account">Account</button>
            <button kuiTabsTrigger value="password">Password</button>
            <button kuiTabsTrigger value="notifications">Notifications</button>
          </div>
          <div [sx]="styles.panel">
            <div kuiTabsContent value="account">
              Manage your account preferences and profile information.
            </div>
            <div kuiTabsContent value="password">
              Update your password to keep your account secure.
            </div>
            <div kuiTabsContent value="notifications">
              Configure how you receive notifications and alerts.
            </div>
          </div>
        </div>
      </div>
      <!-- TabsLineDisabled -->
      <div kuiExample title="Line Disabled">
        <div kuiTabs defaultValue="overview" [sx]="example.row">
          <div kuiTabsList variant="line">
            <button kuiTabsTrigger value="overview">Overview</button>
            <button kuiTabsTrigger value="analytics">Analytics</button>
            <button kuiTabsTrigger value="reports" disabled>Reports</button>
          </div>
        </div>
      </div>
      <!-- TabsWithDropdown -->
      <div kuiExample title="With Dropdown">
        <div kuiTabs defaultValue="overview" [sx]="example.row">
          <div [sx]="styles.spread">
            <div kuiTabsList>
              <button kuiTabsTrigger value="overview">Overview</button>
              <button kuiTabsTrigger value="analytics">Analytics</button>
              <button kuiTabsTrigger value="reports">Reports</button>
            </div>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="ghost"
                size="icon"
                [sx]="styles.more"
              >
                <svg
                  iconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                ></svg>
                <span [sx]="visuallyHidden">More options</span>
              </button>
              <div kuiDropdownMenuContent align="end">
                <div kuiDropdownMenuItem>Settings</div>
                <div kuiDropdownMenuItem>Export</div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuItem>Archive</div>
              </div>
            </ng-container>
          </div>
          <div [sx]="styles.panel">
            <div kuiTabsContent value="overview">
              View your dashboard metrics and key performance indicators.
            </div>
            <div kuiTabsContent value="analytics">
              Detailed analytics and insights about your data.
            </div>
            <div kuiTabsContent value="reports">
              Generate and view custom reports.
            </div>
          </div>
        </div>
      </div>
      <!-- TabsVertical -->
      <div kuiExample title="Vertical">
        <div
          kuiTabs
          defaultValue="account"
          orientation="vertical"
          [sx]="example.row"
        >
          <div kuiTabsList>
            <button kuiTabsTrigger value="account">Account</button>
            <button kuiTabsTrigger value="password">Password</button>
            <button kuiTabsTrigger value="notifications">Notifications</button>
          </div>
          <div [sx]="styles.panel">
            <div kuiTabsContent value="account">
              Manage your account preferences and profile information.
            </div>
            <div kuiTabsContent value="password">
              Update your password to keep your account secure. Use a strong
              password with a mix of letters, numbers, and symbols.
            </div>
            <div kuiTabsContent value="notifications">
              Configure how you receive notifications and alerts. Choose which
              types of notifications you want to receive and how you want to
              receive them.
            </div>
          </div>
        </div>
      </div>
      <!-- TabsWithInputAndButton -->
      <div
        kuiExample
        title="With Input and Button"
        [containerSx]="styles.fullRow"
      >
        <div kuiTabs defaultValue="overview" [sx]="styles.centred">
          <div [sx]="styles.toolbar">
            <div kuiTabsList>
              <button kuiTabsTrigger value="overview">Overview</button>
              <button kuiTabsTrigger value="analytics">Analytics</button>
            </div>
            <div [sx]="styles.actions">
              <input kuiInput placeholder="Search..." [sx]="styles.search" />
              <button kuiButton>Action</button>
            </div>
          </div>
          <div [sx]="styles.panel">
            <div kuiTabsContent value="overview">
              View your dashboard metrics and key performance indicators.
            </div>
            <div kuiTabsContent value="analytics">
              Detailed analytics and insights about your data.
            </div>
            <div kuiTabsContent value="reports">
              Generate and view custom reports.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TabsExample {
  protected readonly styles = styles
  protected readonly example = example
  protected readonly visuallyHidden = visuallyHidden
}
