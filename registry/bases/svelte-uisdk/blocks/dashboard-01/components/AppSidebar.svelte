<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import NavDocuments from "./NavDocuments.svelte"
  import NavMain from "./NavMain.svelte"
  import NavSecondary from "./NavSecondary.svelte"
  import NavUser from "./NavUser.svelte"
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import {
    fontSize,
    fontWeight,
    lineHeight,
    space,
  } from "../../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    sidebarMenuButton: css({
      // `data-[slot=sidebar-menu-button]:p-1.5!`: the button itself.
      paddingInline: { "*": null, base: space["1.5"] },
      paddingBlock: { "*": null, base: space["1.5"] },
    }),
    iconPlaceholder: css({
      width: { "*": null, base: space[5] },
      height: { "*": null, base: space[5] },
    }),
    appSidebarSpan: css({
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
      fontWeight: fontWeight.semibold,
    }),
    appSidebarNavSecondary: css({
      marginTop: "auto",
    }),
  }

  const data = {
    user: {
      name: "kirana",
      email: "m@example.com",
      avatar: "/avatars/kirana.png",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: {
          lucide: "LayoutDashboardIcon",
          tabler: "IconDashboard",
          hugeicons: "DashboardSquare01Icon",
          phosphor: "SquaresFourIcon",
          remixicon: "RiDashboardLine",
        },
      },
      {
        title: "Lifecycle",
        url: "#",
        icon: {
          lucide: "ListIcon",
          tabler: "IconListDetails",
          hugeicons: "Menu01Icon",
          phosphor: "ListIcon",
          remixicon: "RiListUnordered",
        },
      },
      {
        title: "Analytics",
        url: "#",
        icon: {
          lucide: "ChartBarIcon",
          tabler: "IconChartBar",
          hugeicons: "ChartHistogramIcon",
          phosphor: "ChartBarIcon",
          remixicon: "RiBarChartLine",
        },
      },
      {
        title: "Projects",
        url: "#",
        icon: {
          lucide: "FolderIcon",
          tabler: "IconFolder",
          hugeicons: "Folder01Icon",
          phosphor: "FolderIcon",
          remixicon: "RiFolderLine",
        },
      },
      {
        title: "Team",
        url: "#",
        icon: {
          lucide: "UsersIcon",
          tabler: "IconUsers",
          hugeicons: "UserGroupIcon",
          phosphor: "UsersIcon",
          remixicon: "RiGroupLine",
        },
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: {
          lucide: "CameraIcon",
          tabler: "IconCamera",
          hugeicons: "Camera01Icon",
          phosphor: "CameraIcon",
          remixicon: "RiCameraLine",
        },
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: {
          lucide: "FileTextIcon",
          tabler: "IconFileDescription",
          hugeicons: "File01Icon",
          phosphor: "FileTextIcon",
          remixicon: "RiFileTextLine",
        },
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: {
          lucide: "FileTextIcon",
          tabler: "IconFileAi",
          hugeicons: "File01Icon",
          phosphor: "FileTextIcon",
          remixicon: "RiFileTextLine",
        },
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
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
      {
        title: "Get Help",
        url: "#",
        icon: {
          lucide: "CircleHelpIcon",
          tabler: "IconHelp",
          hugeicons: "HelpCircleIcon",
          phosphor: "QuestionIcon",
          remixicon: "RiQuestionLine",
        },
      },
      {
        title: "Search",
        url: "#",
        icon: {
          lucide: "SearchIcon",
          tabler: "IconSearch",
          hugeicons: "SearchIcon",
          phosphor: "MagnifyingGlassIcon",
          remixicon: "RiSearchLine",
        },
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: {
          lucide: "DatabaseIcon",
          tabler: "IconDatabase",
          hugeicons: "Database01Icon",
          phosphor: "DatabaseIcon",
          remixicon: "RiDatabase2Line",
        },
      },
      {
        name: "Reports",
        url: "#",
        icon: {
          lucide: "FileChartColumnIcon",
          tabler: "IconReport",
          hugeicons: "Analytics01Icon",
          phosphor: "ChartLineIcon",
          remixicon: "RiFileChartLine",
        },
      },
      {
        name: "Word Assistant",
        url: "#",
        icon: {
          lucide: "FileIcon",
          tabler: "IconFileWord",
          hugeicons: "File01Icon",
          phosphor: "FileIcon",
          remixicon: "RiFileLine",
        },
      },
    ],
  }
</script>

<Sidebar collapsible="offcanvas" {...rest} sx={className as Sx}>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton sx={styles.sidebarMenuButton}>
          {#snippet asChild(props)}
            <a {...props()} href="#">
              <IconPlaceholder lucide="CommandIcon" tabler="IconInnerShadowTop" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" sx={styles.iconPlaceholder} />
              <span sx={styles.appSidebarSpan}>
                Acme Inc.
              </span>
            </a>
          {/snippet}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={data.navMain} />
    <NavDocuments items={data.documents} />
    <NavSecondary items={data.navSecondary} sx={styles.appSidebarNavSecondary} />
  </SidebarContent>
  <SidebarFooter>
    <NavUser user={data.user} />
  </SidebarFooter>
</Sidebar>
