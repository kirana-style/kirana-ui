import * as React from "react"

import {
  DropdownMenu,
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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { breakpoint, fontSize, space } from "../../../core/scales"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.sidebarAccent },
    color: { '[aria-expanded="true"]': theme.sidebarAccentForeground },
  }),
  item: css({
    padding: { "*": null, base: space["0"] },
  }),
  // `text-sm`: the size alone; the title keeps its own `leading-snug`, as upstream's does.
  itemTitle: css({
    fontSize: { "*": null, base: fontSize.sm },
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
  sidebarInput: css({
    paddingLeft: { "*": null, base: space[8] },
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

export default function SidebarExample() {
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

  const [selectedVersion, setSelectedVersion] = React.useState(data.versions[0])

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger>
                <SidebarMenuButton size="lg" sx={styles.sidebarMenuButton}>
                  <Item sx={styles.item} size="xs">
                    <ItemContent>
                      <ItemTitle sx={styles.itemTitle}>Documentation</ItemTitle>
                      <ItemDescription>v{selectedVersion}</ItemDescription>
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
                <DropdownMenu>
                  {data.versions.map((version) => (
                    <DropdownMenuItem
                      key={version}
                      onAction={() => setSelectedVersion(version)}
                    >
                      v{version}{" "}
                      {version === selectedVersion && (
                        <IconPlaceholder
                          lucide="CheckIcon"
                          tabler="IconCheck"
                          hugeicons="Tick02Icon"
                          phosphor="CheckIcon"
                          remixicon="RiCheckLine"
                          {...styleProps(styles.iconPlaceholder)}
                        />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenu>
              </DropdownMenuTrigger>
            </SidebarMenuItem>
          </SidebarMenu>
          <form>
            <SidebarGroup sx={styles.sidebarGroup}>
              <SidebarGroupContent sx={styles.sidebarGroupContent}>
                <Label htmlFor="search" sx={styles.label}>
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
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton
                        href={subItem.url}
                        isActive={subItem.isActive}
                      >
                        {subItem.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
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
