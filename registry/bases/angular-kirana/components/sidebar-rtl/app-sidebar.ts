import { Component, computed } from "@angular/core"
import { useTranslation } from "../../components/language-selector"
import type { Translations } from "../../components/language-selector"
import { SidebarProvider } from "../../ui/sidebar"
import { SidebarContentInner } from "./sidebar-content-inner"

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

@Component({
  selector: "kui-app-sidebar",
  imports: [SidebarContentInner, SidebarProvider],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarProvider>
      <kui-sidebar-content-inner
        [dir]="dir()"
        [t]="t()"
        [navMain]="navMain()"
        [projects]="projects()"
        [user]="user"
      />
    </div>
  `,
})
export class AppSidebar {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly navMain = computed(() => [
    {
      title: this.t().playground,
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
        { title: this.t().history, url: "#" },
        { title: this.t().starred, url: "#" },
        { title: this.t().settings, url: "#" },
      ],
    },
    {
      title: this.t().models,
      url: "#",
      icon: {
        lucide: "BotIcon",
        tabler: "IconRobot",
        hugeicons: "RoboticIcon",
        phosphor: "RobotIcon",
        remixicon: "RiRobotLine",
      },
      items: [
        { title: this.t().genesis, url: "#" },
        { title: this.t().explorer, url: "#" },
        { title: this.t().quantum, url: "#" },
      ],
    },
    {
      title: this.t().documentation,
      url: "#",
      icon: {
        lucide: "BookOpenIcon",
        tabler: "IconBook",
        hugeicons: "BookOpen02Icon",
        phosphor: "BookOpenIcon",
        remixicon: "RiBookOpenLine",
      },
      items: [
        { title: this.t().introduction, url: "#" },
        { title: this.t().getStarted, url: "#" },
        { title: this.t().tutorials, url: "#" },
        { title: this.t().changelog, url: "#" },
      ],
    },
    {
      title: this.t().settings,
      url: "#",
      icon: {
        lucide: "Settings2Icon",
        tabler: "IconSettings",
        hugeicons: "Settings05Icon",
        phosphor: "GearIcon",
        remixicon: "RiSettingsLine",
      },
      items: [
        { title: this.t().general, url: "#" },
        { title: this.t().team, url: "#" },
        { title: this.t().billing, url: "#" },
        { title: this.t().limits, url: "#" },
      ],
    },
  ])
  protected readonly projects = computed(() => [
    {
      name: this.t().designEngineering,
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
      name: this.t().salesMarketing,
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
      name: this.t().travel,
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
  protected readonly user = {
    name: "kirana",
    email: "m@example.com",
    avatar: "/avatars/kirana.png",
  }
}
