import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { axes, inEveryStyle } from "../../../core/axes"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, fontSize, lineHeight, space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item"
import { Label } from "../ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { "[data-open]": theme.sidebarAccent },
    color: { "[data-open]": theme.sidebarAccentForeground },
  }),
  item: css({
    padding: { "*": null, base: space["0"] },
  }),
  // `text-sm`: the size, and the title keeps its own `leading-snug`, as upstream's does; Lyra's title
  // sets no leading, so there `text-sm` brings its own line height.
  itemTitle: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { [axes.style.lyra]: lineHeight.sm },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
  }),
  sidebarGroup: css({
    paddingBlock: { "*": null, base: space["0"] },
  }),
  sidebarGroupContent: css({
    position: { "*": null, base: "relative" },
  }),
  label: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  // `pl-8` for the icon, over Input's own padding in every style.
  sidebarInput: css({
    paddingInlineStart: inEveryStyle({ base: space[8] }),
  }),
  iconPlaceholder2: css({
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    left: space[2],
    width: space[4],
    height: space[4],

    translate: "0 -50%",
    opacity: "50%",
    userSelect: "none",
  }),
  header: css({
    display: "flex",
    height: space[16],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  sidebarTrigger: css({
    marginLeft: { "*": null, base: `calc(${space[1]} * -1)` },
  }),
  div: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
  }),
  div2: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: space[4],
    gridTemplateColumns: { [breakpoint.md]: "repeat(3, minmax(0, 1fr))" },
  }),
  div3: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  div4: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  div5: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  div6: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: "1 1 0%",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
}

@Component({
  selector: "sidebar-example",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
    Label,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiSidebarProvider>
      <div kuiSidebar>
        <div kuiSidebarHeader>
          <ul kuiSidebarMenu>
            <li kuiSidebarMenuItem>
              <ng-container kuiDropdownMenu>
                <button
                  kuiSidebarMenuButton
                  kuiDropdownMenuTrigger
                  size="lg"
                  [sx]="styles.sidebarMenuButton"
                >
                  <div kuiItem [sx]="styles.item" size="xs">
                    <div kuiItemContent>
                      <div kuiItemTitle [sx]="styles.itemTitle">
                        Documentation
                      </div>
                      <p kuiItemDescription>v{{ selectedVersion() }}</p>
                    </div>
                    <div kuiItemActions>
                      <svg
                        iconPlaceholder
                        lucide="ChevronsUpDownIcon"
                        tabler="IconSelector"
                        hugeicons="UnfoldMoreIcon"
                        phosphor="CaretUpDownIcon"
                        remixicon="RiArrowUpDownLine"
                      ></svg>
                    </div>
                  </div>
                </button>
                <div kuiDropdownMenuContent>
                  @for (version of data.versions; track version) {
                    <div
                      kuiDropdownMenuItem
                      (select)="selectedVersion.set(version)"
                    >
                      v{{ version }}
                      {{ " " }}
                      @if (version === selectedVersion()) {
                        <svg
                          iconPlaceholder
                          lucide="CheckIcon"
                          tabler="IconCheck"
                          hugeicons="Tick02Icon"
                          phosphor="CheckIcon"
                          remixicon="RiCheckLine"
                          [sx]="styles.iconPlaceholder"
                        ></svg>
                      }
                    </div>
                  }
                </div>
              </ng-container>
            </li>
          </ul>
          <form>
            <div kuiSidebarGroup [sx]="styles.sidebarGroup">
              <div kuiSidebarGroupContent [sx]="styles.sidebarGroupContent">
                <label kuiLabel for="search" [sx]="styles.label">Search</label>
                <input
                  kuiSidebarInput
                  id="search"
                  placeholder="Search the docs..."
                  [sx]="styles.sidebarInput"
                />
                <svg
                  iconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                  [sx]="styles.iconPlaceholder2"
                ></svg>
              </div>
            </div>
          </form>
        </div>
        <div kuiSidebarContent>
          @for (item of data.navMain; track item.title) {
            <div kuiSidebarGroup>
              <div kuiSidebarGroupLabel>{{ item.title }}</div>
              <div kuiSidebarGroupContent>
                <ul kuiSidebarMenu>
                  @for (subItem of item.items; track subItem.title) {
                    <li kuiSidebarMenuItem>
                      <a
                        kuiSidebarMenuButton
                        [isActive]="subItem.isActive"
                        [attr.href]="subItem.url"
                        >{{ subItem.title }}</a
                      >
                    </li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
        <button kuiSidebarRail></button>
      </div>
      <main kuiSidebarInset>
        <header [sx]="styles.header">
          <button kuiSidebarTrigger [sx]="styles.sidebarTrigger"></button>
        </header>
        <div [sx]="styles.div">
          <div [sx]="styles.div2">
            <div [sx]="styles.div3"></div>
            <div [sx]="styles.div4"></div>
            <div [sx]="styles.div5"></div>
          </div>
          <div [sx]="styles.div6"></div>
        </div>
      </main>
    </div>
  `,
})
export default class SidebarExample {
  protected readonly selectedVersion = signal(data.versions[0])
  protected readonly styles = styles
  protected readonly data = data
}
