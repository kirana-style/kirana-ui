import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, fontSize, lineHeight, space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Field } from "../ui/field"
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
  sidebarProvider: css({
    backgroundColor: theme.background,
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
  sidebarMenuButton: css({
    backgroundColor: { '[data-state="open"]': theme.sidebarAccent },
    color: { '[data-state="open"]': theme.sidebarAccentForeground },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
  }),
  card: css({
    marginInline: { "*": null, base: `calc(${space[2]} * -1)` },
  }),
  cardTitle: css({
    fontSize: { "*": null, base: fontSize.sm },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.sm,
      [axes.style.mira]: lineHeight.sm,
      [axes.style.luma]: lineHeight.sm,
      [axes.style.rhea]: lineHeight.sm,
      [axes.style.sera]: lineHeight.sm,
    },
  }),
  button: css({
    width: { "*": null, base: "100%" },
    // `bg-sidebar-primary`, a utility, beats the button's hover too: one colour, no hover.
    backgroundColor: { "*": null, base: theme.sidebarPrimary },
    color: theme.sidebarPrimaryForeground,
  }),
  header: css({
    display: "flex",
    height: space[16],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
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
  selector: "sidebar-floating-example",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Field,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
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
    <div kuiSidebarProvider [sx]="styles.sidebarProvider">
      <div kuiSidebar variant="floating">
        <div kuiSidebarHeader>
          <ul kuiSidebarMenu>
            <li kuiSidebarMenuItem>
              <a kuiSidebarMenuButton size="lg" href="#">
                <div kuiItem [sx]="styles.item" size="xs">
                  <div kuiItemContent>
                    <div kuiItemTitle [sx]="styles.itemTitle">
                      Documentation
                    </div>
                    <p kuiItemDescription>v1.0.0</p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div kuiSidebarContent>
          <div kuiSidebarGroup>
            <ul kuiSidebarMenu>
              @for (item of data.navMain; track item.title) {
                <ng-container kuiDropdownMenu>
                  <li kuiSidebarMenuItem>
                    <button
                      kuiSidebarMenuButton
                      kuiDropdownMenuTrigger
                      [sx]="styles.sidebarMenuButton"
                    >
                      {{ item.title }}
                      {{ " " }}
                      <svg
                        iconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                        [sx]="styles.iconPlaceholder"
                      ></svg>
                    </button>
                    @if (item.items?.length) {
                      <div kuiDropdownMenuContent side="right" align="start">
                        <div kuiDropdownMenuGroup>
                          @for (subItem of item.items; track subItem.title) {
                            <a kuiDropdownMenuItem [attr.href]="subItem.url">{{
                              subItem.title
                            }}</a>
                          }
                        </div>
                      </div>
                    }
                  </li>
                </ng-container>
              }
            </ul>
          </div>
        </div>
        <div kuiSidebarFooter>
          <div kuiSidebarGroup>
            <div kuiCard size="sm" [sx]="styles.card">
              <div kuiCardHeader>
                <div kuiCardTitle [sx]="styles.cardTitle">
                  Subscribe to our newsletter
                </div>
                <div kuiCardDescription>
                  Opt-in to receive updates and news about the sidebar.
                </div>
              </div>
              <div kuiCardContent>
                <form>
                  <div kuiField>
                    <input kuiSidebarInput type="email" placeholder="Email" />
                    <button kuiButton [sx]="styles.button" size="sm">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
export default class SidebarFloatingExample {
  protected readonly styles = styles
  protected readonly data = data
}
