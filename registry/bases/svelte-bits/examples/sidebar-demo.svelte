<script lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
  } from "../ui/sidebar"
  import { css } from "@kirana-style/core"
  import { duration, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import { WRAPPER_COLLAPSED } from "../../../styles/sidebar.styles"
  import TeamSwitcher from "../components/sidebar-demo/TeamSwitcher.svelte"
  import NavMain from "../components/sidebar-demo/NavMain.svelte"
  import NavProjects from "../components/sidebar-demo/NavProjects.svelte"
  import NavUser from "../components/sidebar-demo/NavUser.svelte"

  const styles = {
    // Upstream shows the sidebar as a block (`type="block"`): edge to edge, the frame unpadded.
    flush: css({ padding: { "*": null, base: "0" } }),
    appSidebarHeader: css({
      display: "flex",
      height: {
        base: space[16],
        [WRAPPER_COLLAPSED]: space[12],
      },
      flexShrink: "0",
      alignItems: "center",
      gap: space[2],
      transitionProperty: "width,height",
      transitionDuration: duration[150],
      transitionTimingFunction: "linear",
    }),
    appSidebarDiv: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
      paddingInline: space[4],
    }),
    appSidebarSidebarTrigger: css({
      marginLeft: { "*": null, base: `calc(${space[1]} * -1)` },
    }),
  }

  const data = {
    user: {
      name: "kirana",
      email: "m@example.com",
      avatar: "/avatars/kirana.png",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: {
          lucide: "GalleryVerticalEndIcon",
          tabler: "IconLayoutRows",
          hugeicons: "LayoutBottomIcon",
          phosphor: "RowsIcon",
          remixicon: "RiGalleryLine",
        },
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: {
          lucide: "AudioWaveformIcon",
          tabler: "IconWaveSine",
          hugeicons: "AudioWave01Icon",
          phosphor: "WaveformIcon",
          remixicon: "RiPulseLine",
        },
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: {
          lucide: "CommandIcon",
          tabler: "IconInnerShadowTop",
          hugeicons: "CommandIcon",
          phosphor: "CommandIcon",
          remixicon: "RiCommandLine",
        },
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: {
          lucide: "TerminalSquareIcon",
          tabler: "IconTerminal2",
          hugeicons: "ComputerTerminalIcon",
          phosphor: "TerminalIcon",
          remixicon: "RiTerminalBoxLine",
        },
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: {
          lucide: "BotIcon",
          tabler: "IconRobot",
          hugeicons: "RoboticIcon",
          phosphor: "RobotIcon",
          remixicon: "RiRobotLine",
        },
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: {
          lucide: "BookOpenIcon",
          tabler: "IconBook",
          hugeicons: "BookOpen02Icon",
          phosphor: "BookOpenIcon",
          remixicon: "RiBookOpenLine",
        },
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
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
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: {
          lucide: "FrameIcon",
          tabler: "IconFrame",
          hugeicons: "CropIcon",
          phosphor: "CropIcon",
          remixicon: "RiCropLine",
        },
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: {
          lucide: "PieChartIcon",
          tabler: "IconChartPie",
          hugeicons: "PieChartIcon",
          phosphor: "ChartPieIcon",
          remixicon: "RiPieChartLine",
        },
      },
      {
        name: "Travel",
        url: "#",
        icon: {
          lucide: "MapIcon",
          tabler: "IconMap",
          hugeicons: "MapsIcon",
          phosphor: "MapTrifoldIcon",
          remixicon: "RiMapLine",
        },
      },
    ],
  }
</script>

<div sx={[page.example, styles.flush]}>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header sx={styles.appSidebarHeader}>
        <div sx={styles.appSidebarDiv}>
          <SidebarTrigger sx={styles.appSidebarSidebarTrigger} />
        </div>
      </header>
    </SidebarInset>
  </SidebarProvider>
</div>
