<script setup lang="ts">
import { computed } from "vue"
import { useTranslation } from "../../components/language-selector"
import type { Translations } from "../../components/language-selector"
import { SidebarProvider } from "../../ui/sidebar"
import SidebarContentInner from "./SidebarContentInner.vue"

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

const { dir, t } = useTranslation(translations, "ar")
const navMain = computed(() => [
  {
    title: t.value.playground,
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
      { title: t.value.history, url: "#" },
      { title: t.value.starred, url: "#" },
      { title: t.value.settings, url: "#" },
    ],
  },
  {
    title: t.value.models,
    url: "#",
    icon: {
      lucide: "BotIcon",
      tabler: "IconRobot",
      hugeicons: "RoboticIcon",
      phosphor: "RobotIcon",
      remixicon: "RiRobotLine",
    },
    items: [
      { title: t.value.genesis, url: "#" },
      { title: t.value.explorer, url: "#" },
      { title: t.value.quantum, url: "#" },
    ],
  },
  {
    title: t.value.documentation,
    url: "#",
    icon: {
      lucide: "BookOpenIcon",
      tabler: "IconBook",
      hugeicons: "BookOpen02Icon",
      phosphor: "BookOpenIcon",
      remixicon: "RiBookOpenLine",
    },
    items: [
      { title: t.value.introduction, url: "#" },
      { title: t.value.getStarted, url: "#" },
      { title: t.value.tutorials, url: "#" },
      { title: t.value.changelog, url: "#" },
    ],
  },
  {
    title: t.value.settings,
    url: "#",
    icon: {
      lucide: "Settings2Icon",
      tabler: "IconSettings",
      hugeicons: "Settings05Icon",
      phosphor: "GearIcon",
      remixicon: "RiSettingsLine",
    },
    items: [
      { title: t.value.general, url: "#" },
      { title: t.value.team, url: "#" },
      { title: t.value.billing, url: "#" },
      { title: t.value.limits, url: "#" },
    ],
  },
])
const projects = computed(() => [
  {
    name: t.value.designEngineering,
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
    name: t.value.salesMarketing,
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
    name: t.value.travel,
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
</script>

<template>
  <SidebarProvider>
    <SidebarContentInner
      :dir="dir"
      :t="t"
      :nav-main="navMain"
      :projects="projects"
      :user="user"
    />
  </SidebarProvider>
</template>
