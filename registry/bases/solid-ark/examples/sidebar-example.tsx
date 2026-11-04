import { For, Show, createSignal } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { IconPlaceholder } from "../ui/icon-placeholder"
import { axes, inEveryStyle } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, fontSize, lineHeight, space } from "../../../core/scales"

export default function SidebarExample() {
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
  const [selectedVersion, setSelectedVersion] = createSignal(data.versions[0])

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(props) => (
                    <SidebarMenuButton
                      {...props()}
                      size="lg"
                      sx={styles.sidebarMenuButton}
                    >
                      <Item sx={styles.item} size="xs">
                        <ItemContent>
                          <ItemTitle sx={styles.itemTitle}>
                            Documentation
                          </ItemTitle>
                          <ItemDescription>
                            v{selectedVersion()}
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <IconPlaceholder
                            lucide="ChevronsUpDownIcon"
                            tabler="IconSelector"
                            hugeicons="UnfoldMoreIcon"
                            phosphor="CaretUpDownIcon"
                            remixicon="RiArrowUpDownLine"
                          />
                        </ItemActions>
                      </Item>
                    </SidebarMenuButton>
                  )}
                />
                <DropdownMenuContent>
                  <For each={data.versions}>
                    {(version) => (
                      <DropdownMenuItem
                        onSelect={() => setSelectedVersion(version)}
                      >
                        v{version}{" "}
                        <Show when={version === selectedVersion()}>
                          <IconPlaceholder
                            lucide="CheckIcon"
                            tabler="IconCheck"
                            hugeicons="Tick02Icon"
                            phosphor="CheckIcon"
                            remixicon="RiCheckLine"
                            {...styleProps(styles.iconPlaceholder)}
                          />
                        </Show>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <form>
            <SidebarGroup sx={styles.sidebarGroup}>
              <SidebarGroupContent sx={styles.sidebarGroupContent}>
                <Label for="search" sx={styles.label}>
                  Search
                </Label>
                <SidebarInput
                  id="search"
                  placeholder="Search the docs..."
                  sx={styles.sidebarInput}
                />
                <IconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                  {...styleProps(styles.iconPlaceholder2)}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        </SidebarHeader>
        <SidebarContent>
          <For each={data.navMain}>
            {(item) => (
              <SidebarGroup>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <For each={item.items}>
                      {(subItem) => (
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            isActive={subItem.isActive}
                            asChild={(props) => (
                              <a {...props()} href={subItem.url}>
                                {subItem.title}
                              </a>
                            )}
                          />
                        </SidebarMenuItem>
                      )}
                    </For>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </For>
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
