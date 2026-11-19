import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "../../../ui/sidebar"
import { NavFavorites } from "./nav-favorites"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavWorkspaces } from "./nav-workspaces"
import { TeamSwitcher } from "./team-switcher"

const styles = {
  sidebarLeftNavSecondary: css({
    marginTop: "auto",
  }),
}

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: {
        lucide: "CommandIcon",
        tabler: "IconCommand",
        hugeicons: "CommandIcon",
        phosphor: "CommandIcon",
        remixicon: "RiCommandLine",
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
    {
      title: "Ask AI",
      url: "#",
      icon: {
        lucide: "SparklesIcon",
        tabler: "IconSparkles",
        hugeicons: "SparklesIcon",
        phosphor: "SparkleIcon",
        remixicon: "RiSparklingLine",
      },
    },
    {
      title: "Home",
      url: "#",
      icon: {
        lucide: "HomeIcon",
        tabler: "IconHome",
        hugeicons: "HomeIcon",
        phosphor: "HouseIcon",
        remixicon: "RiHomeLine",
      },
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: {
        lucide: "InboxIcon",
        tabler: "IconInbox",
        hugeicons: "InboxIcon",
        phosphor: "TrayIcon",
        remixicon: "RiInboxLine",
      },
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: {
        lucide: "CalendarIcon",
        tabler: "IconCalendar",
        hugeicons: "CalendarIcon",
        phosphor: "CalendarIcon",
        remixicon: "RiCalendarLine",
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
    {
      title: "Templates",
      url: "#",
      icon: {
        lucide: "BlocksIcon",
        tabler: "IconCube",
        hugeicons: "CubeIcon",
        phosphor: "CubeIcon",
        remixicon: "RiBox3Line",
      },
    },
    {
      title: "Trash",
      url: "#",
      icon: {
        lucide: "Trash2Icon",
        tabler: "IconTrash",
        hugeicons: "Delete02Icon",
        phosphor: "TrashIcon",
        remixicon: "RiDeleteBinLine",
      },
    },
    {
      title: "Help",
      url: "#",
      icon: {
        lucide: "MessageCircleQuestionIcon",
        tabler: "IconMessageQuestion",
        hugeicons: "MessageQuestionIcon",
        phosphor: "ChatCircleIcon",
        remixicon: "RiQuestionLine",
      },
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
}

@Component({
  selector: "kui-sidebar-left",
  imports: [
    NavFavorites,
    NavMain,
    NavSecondary,
    NavWorkspaces,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    TeamSwitcher,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar>
      <div kuiSidebarHeader>
        <kui-team-switcher [teams]="data.teams" />
        <kui-nav-main [items]="data.navMain" />
      </div>
      <div kuiSidebarContent>
        <kui-nav-favorites [favorites]="data.favorites" />
        <kui-nav-workspaces [workspaces]="data.workspaces" />
        <kui-nav-secondary
          [items]="data.navSecondary"
          [sx]="styles.sidebarLeftNavSecondary"
        />
      </div>
      <button kuiSidebarRail></button>
    </div>
  `,
})
export class SidebarLeft {
  protected readonly styles = styles
  protected readonly data = data
}
