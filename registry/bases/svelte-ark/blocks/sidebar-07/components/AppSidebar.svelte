<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from "../../../ui/sidebar"
  import NavMain from "./NavMain.svelte"
  import NavProjects from "./NavProjects.svelte"
  import NavUser from "./NavUser.svelte"
  import TeamSwitcher from "./TeamSwitcher.svelte"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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
          lucide: "AudioLinesIcon",
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
          tabler: "IconCommand",
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

<Sidebar collapsible="icon" {...rest} sx={[className as Sx]}>
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
