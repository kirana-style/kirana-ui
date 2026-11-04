import { SidebarContentInner } from "./sidebar-content-inner"
import { createMemo, splitProps } from "solid-js"
import { useTranslation } from "../../components/language-selector"
import { SidebarProvider } from "../../ui/sidebar"
import type { Sx } from "@kirana-style/core"
import type { Translations } from "../../components/language-selector"

export function AppSidebar(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        teamName: "Acme Inc",
        teamPlan: "Enterprise",
        platform: "Platform",
        projects: "Projects",
        viewProject: "View Project",
        shareProject: "Share Project",
        deleteProject: "Delete Project",
        more: "More",
        upgradeToPro: "Upgrade to Pro",
        account: "Account",
        billing: "Billing",
        notifications: "Notifications",
        logOut: "Log out",
        playground: "Playground",
        history: "History",
        starred: "Starred",
        settings: "Settings",
        models: "Models",
        genesis: "Genesis",
        explorer: "Explorer",
        quantum: "Quantum",
        documentation: "Documentation",
        introduction: "Introduction",
        getStarted: "Get Started",
        tutorials: "Tutorials",
        changelog: "Changelog",
        general: "General",
        team: "Team",
        limits: "Limits",
        designEngineering: "Design Engineering",
        salesMarketing: "Sales & Marketing",
        travel: "Travel",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        teamName: "شركة أكمي",
        teamPlan: "المؤسسة",
        platform: "المنصة",
        projects: "المشاريع",
        viewProject: "عرض المشروع",
        shareProject: "مشاركة المشروع",
        deleteProject: "حذف المشروع",
        more: "المزيد",
        upgradeToPro: "ترقية إلى Pro",
        account: "الحساب",
        billing: "الفوترة",
        notifications: "الإشعارات",
        logOut: "تسجيل الخروج",
        playground: "ملعب",
        history: "السجل",
        starred: "المميز",
        settings: "الإعدادات",
        models: "النماذج",
        genesis: "جينيسيس",
        explorer: "إكسبلورر",
        quantum: "كوانتوم",
        documentation: "التوثيق",
        introduction: "مقدمة",
        getStarted: "ابدأ",
        tutorials: "الدروس",
        changelog: "سجل التغييرات",
        general: "عام",
        team: "الفريق",
        limits: "الحدود",
        designEngineering: "هندسة التصميم",
        salesMarketing: "المبيعات والتسويق",
        travel: "السفر",
      },
    },
    he: {
      dir: "rtl",
      values: {
        teamName: "אקמי בע״מ",
        teamPlan: "ארגוני",
        platform: "פלטפורמה",
        projects: "פרויקטים",
        viewProject: "הצג פרויקט",
        shareProject: "שתף פרויקט",
        deleteProject: "מחק פרויקט",
        more: "עוד",
        upgradeToPro: "שדרג ל-Pro",
        account: "חשבון",
        billing: "חיוב",
        notifications: "התראות",
        logOut: "התנתק",
        playground: "מגרש משחקים",
        history: "היסטוריה",
        starred: "מועדפים",
        settings: "הגדרות",
        models: "מודלים",
        genesis: "ג'נסיס",
        explorer: "אקספלורר",
        quantum: "קוונטום",
        documentation: "תיעוד",
        introduction: "מבוא",
        getStarted: "התחל",
        tutorials: "מדריכים",
        changelog: "יומן שינויים",
        general: "כללי",
        team: "צוות",
        limits: "מגבלות",
        designEngineering: "הנדסת עיצוב",
        salesMarketing: "מכירות ושיווק",
        travel: "נסיעות",
      },
    },
  }

  const translation = useTranslation(translations, "ar")
  const navMain = createMemo(() => [
    {
      title: translation.t.playground,
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
        { title: translation.t.history, url: "#" },
        { title: translation.t.starred, url: "#" },
        { title: translation.t.settings, url: "#" },
      ],
    },
    {
      title: translation.t.models,
      url: "#",
      icon: {
        lucide: "BotIcon",
        tabler: "IconRobot",
        hugeicons: "RoboticIcon",
        phosphor: "RobotIcon",
        remixicon: "RiRobotLine",
      },
      items: [
        { title: translation.t.genesis, url: "#" },
        { title: translation.t.explorer, url: "#" },
        { title: translation.t.quantum, url: "#" },
      ],
    },
    {
      title: translation.t.documentation,
      url: "#",
      icon: {
        lucide: "BookOpenIcon",
        tabler: "IconBook",
        hugeicons: "BookOpen02Icon",
        phosphor: "BookOpenIcon",
        remixicon: "RiBookOpenLine",
      },
      items: [
        { title: translation.t.introduction, url: "#" },
        { title: translation.t.getStarted, url: "#" },
        { title: translation.t.tutorials, url: "#" },
        { title: translation.t.changelog, url: "#" },
      ],
    },
    {
      title: translation.t.settings,
      url: "#",
      icon: {
        lucide: "Settings2Icon",
        tabler: "IconSettings",
        hugeicons: "Settings05Icon",
        phosphor: "GearIcon",
        remixicon: "RiSettingsLine",
      },
      items: [
        { title: translation.t.general, url: "#" },
        { title: translation.t.team, url: "#" },
        { title: translation.t.billing, url: "#" },
        { title: translation.t.limits, url: "#" },
      ],
    },
  ])
  const projects = createMemo(() => [
    {
      name: translation.t.designEngineering,
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
      name: translation.t.salesMarketing,
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
      name: translation.t.travel,
      url: "#",
      icon: {
        lucide: "MapIcon",
        tabler: "IconMap",
        hugeicons: "MapsIcon",
        phosphor: "MapTrifoldIcon",
        remixicon: "RiMapLine",
      },
    },
  ])
  const user = {
    name: "kirana",
    email: "m@example.com",
    avatar: "/avatars/kirana.png",
  }

  return (
    <SidebarProvider {...rest} class={local.class} sx={[local.sx]}>
      <SidebarContentInner
        dir={translation.dir}
        t={translation.t}
        navMain={navMain()}
        projects={projects()}
        user={user}
      />
    </SidebarProvider>
  )
}
