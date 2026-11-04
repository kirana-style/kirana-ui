import { AppSidebar } from "./app-sidebar"
import { useTranslation } from "../../components/language-selector"
import { DirectionProvider } from "../../ui/direction"
import { css } from "@kirana-style/core"
import type { Translations } from "../../components/language-selector"

export function AppSidebarWithProvider() {
  const styles = {
    // Upstream's page fills its frame; here the root sits in the centred `page.example`.
    appSidebarWithProviderDiv: css({
      position: "relative",
      width: "100%",
    }),
  }

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

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={styles.appSidebarWithProviderDiv} dir={translation.dir}>
        <AppSidebar />
      </div>
    </DirectionProvider>
  )
}
