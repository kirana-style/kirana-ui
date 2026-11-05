import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize, fontSize, lineHeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { DirectionProvider } from "../ui/direction"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const styles = {
  tabs: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardContent: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  cardContent2: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  cardContent3: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  cardContent4: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      overview: "Overview",
      analytics: "Analytics",
      reports: "Reports",
      settings: "Settings",
      overviewTitle: "Overview",
      overviewDesc:
        "View your key metrics and recent project activity. Track progress across all your active projects.",
      overviewContent: "You have 12 active projects and 3 pending tasks.",
      analyticsTitle: "Analytics",
      analyticsDesc:
        "Track performance and user engagement metrics. Monitor trends and identify growth opportunities.",
      analyticsContent: "Page views are up 25% compared to last month.",
      reportsTitle: "Reports",
      reportsDesc:
        "Generate and download your detailed reports. Export data in multiple formats for analysis.",
      reportsContent: "You have 5 reports ready and available to export.",
      settingsTitle: "Settings",
      settingsDesc:
        "Manage your account preferences and options. Customize your experience to fit your needs.",
      settingsContent: "Configure notifications, security, and themes.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      overview: "نظرة عامة",
      analytics: "التحليلات",
      reports: "التقارير",
      settings: "الإعدادات",
      overviewTitle: "نظرة عامة",
      overviewDesc:
        "عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر جميع مشاريعك النشطة.",
      overviewContent: "لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.",
      analyticsTitle: "التحليلات",
      analyticsDesc:
        "تتبع مقاييس الأداء ومشاركة المستخدمين. راقب الاتجاهات وحدد فرص النمو.",
      analyticsContent: "زادت مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.",
      reportsTitle: "التقارير",
      reportsDesc:
        "إنشاء وتنزيل تقاريرك التفصيلية. تصدير البيانات بتنسيقات متعددة للتحليل.",
      reportsContent: "لديك ٥ تقارير جاهزة ومتاحة للتصدير.",
      settingsTitle: "الإعدادات",
      settingsDesc:
        "إدارة تفضيلات حسابك وخياراته. تخصيص تجربتك لتناسب احتياجاتك.",
      settingsContent: "تكوين الإشعارات والأمان والسمات.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      overview: "סקירה כללית",
      analytics: "אנליטיקה",
      reports: "דוחות",
      settings: "הגדרות",
      overviewTitle: "סקירה כללית",
      overviewDesc:
        "הצג את המדדים העיקריים שלך ופעילות הפרויקט האחרונה. עקוב אחר התקדמות בכל הפרויקטים הפעילים שלך.",
      overviewContent: "יש לך 12 פרויקטים פעילים ו-3 משימות ממתינות.",
      analyticsTitle: "אנליטיקה",
      analyticsDesc:
        "עקוב אחר ביצועים ומדדי מעורבות משתמשים. עקוב אחר מגמות וזהה הזדמנויות צמיחה.",
      analyticsContent: "צפיות בדף עלו ב-25% בהשוואה לחודש שעבר.",
      reportsTitle: "דוחות",
      reportsDesc:
        "צור והורד את הדוחות המפורטים שלך. ייצא נתונים בפורמטים מרובים לניתוח.",
      reportsContent: "יש לך 5 דוחות מוכנים וזמינים לייצוא.",
      settingsTitle: "הגדרות",
      settingsDesc:
        "נהל את העדפות החשבון והאפשרויות שלך. התאם אישית את החוויה שלך כך שתתאים לצרכים שלך.",
      settingsContent: "הגדר התראות, אבטחה וערכות נושא.",
    },
  },
}

@Component({
  selector: "tabs-rtl",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DirectionProvider,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiTabs
          defaultValue="overview"
          [sx]="styles.tabs"
          [attr.dir]="dir()"
        >
          <div kuiTabsList [attr.dir]="dir()">
            <button kuiTabsTrigger value="overview">{{ t().overview }}</button>
            <button kuiTabsTrigger value="analytics">
              {{ t().analytics }}
            </button>
            <button kuiTabsTrigger value="reports">{{ t().reports }}</button>
            <button kuiTabsTrigger value="settings">{{ t().settings }}</button>
          </div>
          <div kuiTabsContent value="overview">
            <div kuiCard [attr.dir]="dir()">
              <div kuiCardHeader>
                <div kuiCardTitle>{{ t().overviewTitle }}</div>
                <div kuiCardDescription>{{ t().overviewDesc }}</div>
              </div>
              <div kuiCardContent [sx]="styles.cardContent">
                {{ t().overviewContent }}
              </div>
            </div>
          </div>
          <div kuiTabsContent value="analytics">
            <div kuiCard [attr.dir]="dir()">
              <div kuiCardHeader>
                <div kuiCardTitle>{{ t().analyticsTitle }}</div>
                <div kuiCardDescription>{{ t().analyticsDesc }}</div>
              </div>
              <div kuiCardContent [sx]="styles.cardContent2">
                {{ t().analyticsContent }}
              </div>
            </div>
          </div>
          <div kuiTabsContent value="reports">
            <div kuiCard [attr.dir]="dir()">
              <div kuiCardHeader>
                <div kuiCardTitle>{{ t().reportsTitle }}</div>
                <div kuiCardDescription>{{ t().reportsDesc }}</div>
              </div>
              <div kuiCardContent [sx]="styles.cardContent3">
                {{ t().reportsContent }}
              </div>
            </div>
          </div>
          <div kuiTabsContent value="settings">
            <div kuiCard [attr.dir]="dir()">
              <div kuiCardHeader>
                <div kuiCardTitle>{{ t().settingsTitle }}</div>
                <div kuiCardDescription>{{ t().settingsDesc }}</div>
              </div>
              <div kuiCardContent [sx]="styles.cardContent4">
                {{ t().settingsContent }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class TabsRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
