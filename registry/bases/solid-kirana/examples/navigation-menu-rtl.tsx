import { ListItem } from "../components/navigation-menu-rtl/list-item"
import { For } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function NavigationMenuRtl() {
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
        alertDialogDesc:
          "דיאלוג מודאלי שמפריע למשתמש עם תוכן חשוב ומצפה לתגובה.",
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <NavigationMenu
          dir={translation.dir}
          align={translation.dir === "rtl" ? "end" : "start"}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {translation.t.gettingStarted}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                dir={translation.dir}
                data-lang={
                  translation.dir === "rtl" ? translation.language : undefined
                }
              >
                <ul sx={styles.ul}>
                  <ListItem href="/docs" title={translation.t.introduction}>
                    {translation.t.introductionDesc}
                  </ListItem>
                  <ListItem
                    href="/docs/installation"
                    title={translation.t.installation}
                  >
                    {translation.t.installationDesc}
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title={translation.t.typography}
                  >
                    {translation.t.typographyDesc}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem sx={styles.navigationMenuItem}>
              <NavigationMenuTrigger>
                {translation.t.components}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                dir={translation.dir}
                data-lang={
                  translation.dir === "rtl" ? translation.language : undefined
                }
              >
                <ul sx={styles.ul2}>
                  <For each={components}>
                    {(component) => (
                      <ListItem
                        title={translation.t[component.titleKey]}
                        href={component.href}
                      >
                        {translation.t[component.descriptionKey]}
                      </ListItem>
                    )}
                  </For>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {translation.t.withIcon}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                dir={translation.dir}
                data-lang={
                  translation.dir === "rtl" ? translation.language : undefined
                }
              >
                <ul sx={styles.ul3}>
                  <li>
                    <NavigationMenuLink
                      asChild={(props) => (
                        <a
                          {...props()}
                          href="#"
                          {...styleProps(props().class, styles.a)}
                        >
                          <IconPlaceholder
                            lucide="CircleAlertIcon"
                            tabler="IconExclamationCircle"
                            hugeicons="AlertCircleIcon"
                            phosphor="WarningCircleIcon"
                            remixicon="RiErrorWarningLine"
                          />{" "}
                          {translation.t.backlog}
                        </a>
                      )}
                    />
                    <NavigationMenuLink
                      asChild={(props) => (
                        <a
                          {...props()}
                          href="#"
                          {...styleProps(props().class, styles.a2)}
                        >
                          <IconPlaceholder
                            lucide="CircleDashedIcon"
                            tabler="IconCircleDashed"
                            hugeicons="DashedLineCircleIcon"
                            phosphor="CircleDashedIcon"
                            remixicon="RiLoaderLine"
                          />{" "}
                          {translation.t.toDo}
                        </a>
                      )}
                    />
                    <NavigationMenuLink
                      asChild={(props) => (
                        <a
                          {...props()}
                          href="#"
                          {...styleProps(props().class, styles.a3)}
                        >
                          <IconPlaceholder
                            lucide="CircleCheckIcon"
                            tabler="IconCircleCheckFilled"
                            hugeicons="CheckmarkCircle01Icon"
                            phosphor="CheckCircleIcon"
                            remixicon="RiCheckboxCircleFill"
                          />{" "}
                          {translation.t.done}
                        </a>
                      )}
                    />
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                sx={navigationMenuTriggerStyle}
                data-lang={
                  translation.dir === "rtl" ? translation.language : undefined
                }
                asChild={(props) => (
                  <a {...props()} href="/docs">
                    {translation.t.docs}
                  </a>
                )}
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </DirectionProvider>
  )
}
