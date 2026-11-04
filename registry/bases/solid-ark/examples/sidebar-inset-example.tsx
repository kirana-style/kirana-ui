import { For, Show } from "solid-js"
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
import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, space } from "../../../core/scales"

export default function SidebarInsetExample() {
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

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              <For each={data.navMain}>
                {(item) => (
                  <>
                    <Collapsible
                      defaultOpen={item.isActive}
                      asChild={(props) => (
                        <SidebarMenuItem {...props()}>
                          <SidebarMenuButton
                            isActive={item.isActive}
                            asChild={(innerProps) => (
                              <a {...innerProps()} href={item.url}>
                                <IconPlaceholder {...item.icon} />
                                <span>{item.title}</span>
                              </a>
                            )}
                          />
                          <Show when={item.items?.length}>
                            <>
                              <CollapsibleTrigger
                                asChild={(innerProps) => (
                                  <SidebarMenuAction
                                    {...innerProps()}
                                    sx={styles.sidebarMenuAction}
                                  >
                                    <IconPlaceholder
                                      lucide="ChevronRightIcon"
                                      tabler="IconChevronRight"
                                      hugeicons="ArrowRight01Icon"
                                      phosphor="CaretRightIcon"
                                      remixicon="RiArrowRightSLine"
                                    />
                                    <span sx={styles.span}>Toggle</span>
                                  </SidebarMenuAction>
                                )}
                              />
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  <For each={item.items}>
                                    {(subItem) => (
                                      <SidebarMenuSubItem>
                                        <SidebarMenuSubButton
                                          asChild={(innerProps) => (
                                            <a
                                              {...innerProps()}
                                              href={subItem.url}
                                            >
                                              {subItem.title}
                                            </a>
                                          )}
                                        />
                                      </SidebarMenuSubItem>
                                    )}
                                  </For>
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </>
                          </Show>
                        </SidebarMenuItem>
                      )}
                    />
                  </>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup sx={styles.sidebarGroup}>
            <SidebarGroupContent>
              <SidebarMenu>
                <For each={data.navSecondary}>
                  {(item) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        size="sm"
                        asChild={(props) => (
                          <a {...props()} href={item.url}>
                            <IconPlaceholder {...item.icon} />
                            <span>{item.title}</span>
                          </a>
                        )}
                      />
                    </SidebarMenuItem>
                  )}
                </For>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header sx={styles.header}>
          <SidebarTrigger sx={styles.sidebarTrigger} />
        </header>
        <div sx={styles.div}>
          <div sx={styles.div2}>
            <div sx={styles.div3} />
            <div sx={styles.div4} />
            <div sx={styles.div5} />
          </div>
          <div sx={styles.div6} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
