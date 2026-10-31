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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, fontSize, lineHeight, space } from "../../../core/scales"

const styles = {
  sidebarProvider: css({
    backgroundColor: theme.background,
  }),
  item: css({
    padding: { "*": null, base: space["0"] },
  }),
  // `text-sm`: the size alone; the title keeps its own `leading-snug`, as upstream's does.
  itemTitle: css({
    fontSize: { "*": null, base: fontSize.sm },
  }),
  sidebarMenuButton: css({
    backgroundColor: { "[data-popup-open]": theme.sidebarAccent },
    color: { "[data-popup-open]": theme.sidebarAccentForeground },
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
    backgroundColor: theme.sidebarPrimary,
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

export default function SidebarFloatingExample() {
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

  return (
    <SidebarProvider sx={styles.sidebarProvider}>
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<a href="#" />}>
                <Item sx={styles.item} size="xs">
                  <ItemContent>
                    <ItemTitle sx={styles.itemTitle}>Documentation</ItemTitle>
                    <ItemDescription>v1.0.0</ItemDescription>
                  </ItemContent>
                </Item>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <DropdownMenu key={item.title}>
                  <SidebarMenuItem>
                    <DropdownMenuTrigger
                      render={
                        <SidebarMenuButton sx={styles.sidebarMenuButton} />
                      }
                    >
                      {item.title}{" "}
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                        {...styleProps(styles.iconPlaceholder)}
                      />
                    </DropdownMenuTrigger>
                    {item.items?.length ? (
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuGroup>
                          {item.items.map((subItem) => (
                            <DropdownMenuItem
                              render={<a href={subItem.url} />}
                              key={subItem.title}
                            >
                              {subItem.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    ) : null}
                  </SidebarMenuItem>
                </DropdownMenu>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <Card size="sm" sx={styles.card}>
              <CardHeader>
                <CardTitle sx={styles.cardTitle}>
                  Subscribe to our newsletter
                </CardTitle>
                <CardDescription>
                  Opt-in to receive updates and news about the sidebar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Field>
                    <SidebarInput type="email" placeholder="Email" />
                    <Button sx={styles.button} size="sm">
                      Subscribe
                    </Button>
                  </Field>
                </form>
              </CardContent>
            </Card>
          </SidebarGroup>
        </SidebarFooter>
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
