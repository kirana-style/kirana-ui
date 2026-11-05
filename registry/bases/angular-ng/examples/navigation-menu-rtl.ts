import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { DirectionProvider } from "../ui/direction"
import { ListItem } from "../components/navigation-menu-rtl/list-item"

const styles = {
  ul: css({
    width: space[96],
  }),
  navigationMenuItem: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
  }),
  ul2: css({
    display: "grid",
    width: {
      base: "400px",
      [breakpoint.md]: "500px",
      [breakpoint.lg]: "600px",
    },
    gap: space[2],
    gridTemplateColumns: { [breakpoint.md]: "repeat(2, minmax(0, 1fr))" },
  }),
  ul3: css({
    display: "grid",
    width: "200px",
  }),
  a: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
  a2: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
  a3: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      gettingStarted: "Getting started",
      introduction: "Introduction",
      introductionDesc: "Re-usable components built with Tailwind CSS.",
      installation: "Installation",
      installationDesc: "How to install dependencies and structure your app.",
      typography: "Typography",
      typographyDesc: "Styles for headings, paragraphs, lists...etc",
      components: "Components",
      alertDialog: "Alert Dialog",
      alertDialogDesc:
        "A modal dialog that interrupts the user with important content and expects a response.",
      hoverCard: "Hover Card",
      hoverCardDesc:
        "For sighted users to preview content available behind a link.",
      progress: "Progress",
      progressDesc:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      scrollArea: "Scroll-area",
      scrollAreaDesc: "Visually or semantically separates content.",
      tabs: "Tabs",
      tabsDesc:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      tooltip: "Tooltip",
      tooltipDesc:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      withIcon: "With Icon",
      backlog: "Backlog",
      toDo: "To Do",
      done: "Done",
      docs: "Docs",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      gettingStarted: "البدء",
      introduction: "مقدمة",
      introductionDesc:
        "مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.",
      installation: "التثبيت",
      installationDesc: "كيفية تثبيت التبعيات وتنظيم تطبيقك.",
      typography: "الطباعة",
      typographyDesc: "أنماط للعناوين والفقرات والقوائم...إلخ",
      components: "المكونات",
      alertDialog: "حوار التنبيه",
      alertDialogDesc: "حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.",
      hoverCard: "بطاقة التحويم",
      hoverCardDesc: "للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.",
      progress: "التقدم",
      progressDesc:
        "يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.",
      scrollArea: "منطقة التمرير",
      scrollAreaDesc: "يفصل المحتوى بصريًا أو دلاليًا.",
      tabs: "التبويبات",
      tabsDesc:
        "مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.",
      tooltip: "تلميح",
      tooltipDesc:
        "نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.",
      withIcon: "مع أيقونة",
      backlog: "قائمة الانتظار",
      toDo: "المهام",
      done: "منجز",
      docs: "الوثائق",
    },
  },
  he: {
    dir: "rtl",
    values: {
      gettingStarted: "התחלה",
      introduction: "הקדמה",
      introductionDesc: "רכיבים לשימוש חוזר שנבנו עם Tailwind CSS.",
      installation: "התקנה",
      installationDesc: "כיצד להתקין תלויות ולבנות את האפליקציה שלך.",
      typography: "טיפוגרפיה",
      typographyDesc: "סגנונות לכותרות, פסקאות, רשימות...וכו'",
      components: "רכיבים",
      alertDialog: "דיאלוג התראה",
      alertDialogDesc: "דיאלוג מודאלי שמפריע למשתמש עם תוכן חשוב ומצפה לתגובה.",
      hoverCard: "כרטיס ריחוף",
      hoverCardDesc:
        "למשתמשים רואים כדי להציג תצוגה מקדימה של תוכן זמין מאחורי קישור.",
      progress: "התקדמות",
      progressDesc:
        "מציג אינדיקטור המציג את התקדמות ההשלמה של משימה, בדרך כלל מוצג כסרגל התקדמות.",
      scrollArea: "אזור גלילה",
      scrollAreaDesc: "מפריד תוכן חזותית או סמנטית.",
      tabs: "כרטיסיות",
      tabsDesc:
        "קבוצה של חלקי תוכן מרובדים—המכונים לוחות כרטיסיות—המוצגים אחד בכל פעם.",
      tooltip: "טולטיפ",
      tooltipDesc:
        "חלון קופץ המציג מידע הקשור לאלמנט כאשר האלמנט מקבל מיקוד מקלדת או כאשר העכבר מרחף מעליו.",
      withIcon: "עם אייקון",
      backlog: "רשימת המתנה",
      toDo: "לעשות",
      done: "הושלם",
      docs: "תיעוד",
    },
  },
}

const components = [
  {
    titleKey: "alertDialog" as const,
    descriptionKey: "alertDialogDesc" as const,
    href: "/docs/primitives/alert-dialog",
  },
  {
    titleKey: "hoverCard" as const,
    descriptionKey: "hoverCardDesc" as const,
    href: "/docs/primitives/hover-card",
  },
  {
    titleKey: "progress" as const,
    descriptionKey: "progressDesc" as const,
    href: "/docs/primitives/progress",
  },
  {
    titleKey: "scrollArea" as const,
    descriptionKey: "scrollAreaDesc" as const,
    href: "/docs/primitives/scroll-area",
  },
  {
    titleKey: "tabs" as const,
    descriptionKey: "tabsDesc" as const,
    href: "/docs/primitives/tabs",
  },
  {
    titleKey: "tooltip" as const,
    descriptionKey: "tooltipDesc" as const,
    href: "/docs/primitives/tooltip",
  },
] as const

@Component({
  selector: "navigation-menu-rtl",
  imports: [
    DirectionProvider,
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <nav
          kuiNavigationMenu
          [attr.dir]="dir()"
          [align]="dir() === 'rtl' ? 'end' : 'start'"
        >
          <ul kuiNavigationMenuList>
            <li kuiNavigationMenuItem>
              <button kuiNavigationMenuTrigger>{{ t().gettingStarted }}</button>
              <div
                kuiNavigationMenuContent
                [attr.dir]="dir()"
                [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
              >
                <ul [sx]="styles.ul">
                  <kui-list-item href="/docs" [title]="t().introduction">
                    {{ t().introductionDesc }}
                  </kui-list-item>
                  <kui-list-item
                    href="/docs/installation"
                    [title]="t().installation"
                  >
                    {{ t().installationDesc }}
                  </kui-list-item>
                  <kui-list-item
                    href="/docs/primitives/typography"
                    [title]="t().typography"
                  >
                    {{ t().typographyDesc }}
                  </kui-list-item>
                </ul>
              </div>
            </li>
            <li kuiNavigationMenuItem [sx]="styles.navigationMenuItem">
              <button kuiNavigationMenuTrigger>{{ t().components }}</button>
              <div
                kuiNavigationMenuContent
                [attr.dir]="dir()"
                [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
              >
                <ul [sx]="styles.ul2">
                  @for (component of components; track component.titleKey) {
                    <kui-list-item
                      [title]="t()[component.titleKey]"
                      [href]="component.href"
                    >
                      {{ t()[component.descriptionKey] }}
                    </kui-list-item>
                  }
                </ul>
              </div>
            </li>
            <li kuiNavigationMenuItem>
              <button kuiNavigationMenuTrigger>{{ t().withIcon }}</button>
              <div
                kuiNavigationMenuContent
                [attr.dir]="dir()"
                [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
              >
                <ul [sx]="styles.ul3">
                  <li>
                    <a kuiNavigationMenuLink href="#" [sx]="styles.a">
                      <svg
                        iconPlaceholder
                        lucide="CircleAlertIcon"
                        tabler="IconExclamationCircle"
                        hugeicons="AlertCircleIcon"
                        phosphor="WarningCircleIcon"
                        remixicon="RiErrorWarningLine"
                      ></svg>
                      {{ t().backlog }}
                    </a>
                    <a kuiNavigationMenuLink href="#" [sx]="styles.a2">
                      <svg
                        iconPlaceholder
                        lucide="CircleDashedIcon"
                        tabler="IconCircleDashed"
                        hugeicons="DashedLineCircleIcon"
                        phosphor="CircleDashedIcon"
                        remixicon="RiLoaderLine"
                      ></svg>
                      {{ t().toDo }}
                    </a>
                    <a kuiNavigationMenuLink href="#" [sx]="styles.a3">
                      <svg
                        iconPlaceholder
                        lucide="CircleCheckIcon"
                        tabler="IconCircleCheckFilled"
                        hugeicons="CheckmarkCircle01Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleFill"
                      ></svg>
                      {{ t().done }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li kuiNavigationMenuItem>
              <a
                kuiNavigationMenuLink
                [sx]="navigationMenuTriggerStyle"
                [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                href="/docs"
                >{{ t().docs }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </ng-container>
  `,
})
export default class NavigationMenuRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly components = components
  protected readonly navigationMenuTriggerStyle = navigationMenuTriggerStyle
  protected readonly page = page
}
