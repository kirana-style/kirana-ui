import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar"

const styles = {
  sidebarMenuAction: css({
    rotate: { "[data-open]": "90deg" },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  sidebarGroup: css({
    marginTop: { "*": null, base: "auto" },
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
      title: "Dashboard",
      url: "#",
      icon: {
        lucide: "HomeIcon",
        tabler: "IconHome",
        hugeicons: "Home01Icon",
        phosphor: "HouseIcon",
        remixicon: "RiHomeLine",
      },
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: {
        lucide: "ChartLineIcon",
        tabler: "IconChartLine",
        hugeicons: "ChartIcon",
        phosphor: "ChartLineIcon",
        remixicon: "RiLineChartLine",
      },
      items: [
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Metrics",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: {
        lucide: "ShoppingBagIcon",
        tabler: "IconShoppingBag",
        hugeicons: "ShoppingBag01Icon",
        phosphor: "BagIcon",
        remixicon: "RiShoppingBagLine",
      },
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Completed",
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: {
        lucide: "ShoppingCartIcon",
        tabler: "IconShoppingCart",
        hugeicons: "ShoppingCart01Icon",
        phosphor: "ShoppingCartIcon",
        remixicon: "RiShoppingCartLine",
      },
      items: [
        {
          title: "All Products",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Invoices",
      url: "#",
      icon: {
        lucide: "FileIcon",
        tabler: "IconFile",
        hugeicons: "File01Icon",
        phosphor: "FileIcon",
        remixicon: "RiFileLine",
      },
    },
    {
      title: "Customers",
      url: "#",
      icon: {
        lucide: "UserIcon",
        tabler: "IconUser",
        hugeicons: "UserIcon",
        phosphor: "UserIcon",
        remixicon: "RiUserLine",
      },
    },
    {
      title: "Settings",
      url: "#",
      icon: {
        lucide: "Settings2Icon",
        tabler: "IconSettings",
        hugeicons: "Settings05Icon",
        phosphor: "GearIcon",
        remixicon: "RiSettingsLine",
      },
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: {
        lucide: "LifeBuoy",
        tabler: "IconLifebuoy",
        hugeicons: "ChartRingIcon",
        phosphor: "LifebuoyIcon",
        remixicon: "RiLifebuoyLine",
      },
    },
    {
      title: "Feedback",
      url: "#",
      icon: {
        lucide: "Send",
        tabler: "IconSend",
        hugeicons: "SentIcon",
        phosphor: "PaperPlaneTiltIcon",
        remixicon: "RiSendPlaneLine",
      },
    },
  ],
}

@Component({
  selector: "sidebar-inset-example",
  imports: [
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiSidebarProvider>
      <div kuiSidebar variant="inset">
        <div kuiSidebarContent>
          <div kuiSidebarGroup>
            <div kuiSidebarGroupLabel>Dashboard</div>
            <ul kuiSidebarMenu>
              @for (item of data.navMain; track item.title) {
                <li
                  kuiSidebarMenuItem
                  kuiCollapsible
                  [defaultOpen]="item.isActive"
                >
                  <a
                    kuiSidebarMenuButton
                    [isActive]="item.isActive"
                    [attr.href]="item.url"
                  >
                    <svg
                      iconPlaceholder
                      [lucide]="item.icon.lucide"
                      [tabler]="item.icon.tabler"
                      [hugeicons]="item.icon.hugeicons"
                      [phosphor]="item.icon.phosphor"
                      [remixicon]="item.icon.remixicon"
                    ></svg>
                    <span>{{ item.title }}</span>
                  </a>
                  @if (item.items?.length) {
                    <button
                      kuiSidebarMenuAction
                      kuiCollapsibleTrigger
                      [sx]="styles.sidebarMenuAction"
                    >
                      <svg
                        iconPlaceholder
                        lucide="ChevronRightIcon"
                        tabler="IconChevronRight"
                        hugeicons="ArrowRight01Icon"
                        phosphor="CaretRightIcon"
                        remixicon="RiArrowRightSLine"
                      ></svg>
                      <span [sx]="styles.span">Toggle</span>
                    </button>
                    <div kuiCollapsibleContent>
                      <ul kuiSidebarMenuSub>
                        @for (subItem of item.items; track subItem.title) {
                          <li kuiSidebarMenuSubItem>
                            <a
                              kuiSidebarMenuSubButton
                              [attr.href]="subItem.url"
                              >{{ subItem.title }}</a
                            >
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </li>
              }
            </ul>
          </div>
          <div kuiSidebarGroup [sx]="styles.sidebarGroup">
            <div kuiSidebarGroupContent>
              <ul kuiSidebarMenu>
                @for (item of data.navSecondary; track item.title) {
                  <li kuiSidebarMenuItem>
                    <a kuiSidebarMenuButton size="sm" [attr.href]="item.url">
                      <svg
                        iconPlaceholder
                        [lucide]="item.icon.lucide"
                        [tabler]="item.icon.tabler"
                        [hugeicons]="item.icon.hugeicons"
                        [phosphor]="item.icon.phosphor"
                        [remixicon]="item.icon.remixicon"
                      ></svg>
                      <span>{{ item.title }}</span>
                    </a>
                  </li>
                }
              </ul>
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
export default class SidebarInsetExample {
  protected readonly styles = styles
  protected readonly data = data
}
