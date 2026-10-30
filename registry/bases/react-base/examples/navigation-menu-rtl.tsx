import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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
  listItemDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  listItemDiv2: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  listItemDiv3: css({
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    color: theme.mutedForeground,
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

export default function NavigationMenuRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <NavigationMenu dir={dir} align={dir === "rtl" ? "end" : "start"}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{t.gettingStarted}</NavigationMenuTrigger>
            <NavigationMenuContent
              dir={dir}
              data-lang={dir === "rtl" ? language : undefined}
            >
              <ul sx={styles.ul}>
                <ListItem href="/docs" title={t.introduction}>
                  {t.introductionDesc}
                </ListItem>
                <ListItem href="/docs/installation" title={t.installation}>
                  {t.installationDesc}
                </ListItem>
                <ListItem
                  href="/docs/primitives/typography"
                  title={t.typography}
                >
                  {t.typographyDesc}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem sx={styles.navigationMenuItem}>
            <NavigationMenuTrigger>{t.components}</NavigationMenuTrigger>
            <NavigationMenuContent
              dir={dir}
              data-lang={dir === "rtl" ? language : undefined}
            >
              <ul sx={styles.ul2}>
                {components.map((component) => (
                  <ListItem
                    key={component.titleKey}
                    title={t[component.titleKey]}
                    href={component.href}
                  >
                    {t[component.descriptionKey]}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{t.withIcon}</NavigationMenuTrigger>
            <NavigationMenuContent
              dir={dir}
              data-lang={dir === "rtl" ? language : undefined}
            >
              <ul sx={styles.ul3}>
                <li>
                  <NavigationMenuLink render={<a href="#" sx={styles.a} />}>
                    <IconPlaceholder
                      lucide="CircleAlertIcon"
                      tabler="IconExclamationCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="WarningCircleIcon"
                      remixicon="RiErrorWarningLine"
                    />
                    {t.backlog}
                  </NavigationMenuLink>
                  <NavigationMenuLink render={<a href="#" sx={styles.a2} />}>
                    <IconPlaceholder
                      lucide="CircleDashedIcon"
                      tabler="IconCircleDashed"
                      hugeicons="DashedLineCircleIcon"
                      phosphor="CircleDashedIcon"
                      remixicon="RiLoaderLine"
                    />
                    {t.toDo}
                  </NavigationMenuLink>
                  <NavigationMenuLink render={<a href="#" sx={styles.a3} />}>
                    <IconPlaceholder
                      lucide="CircleCheckIcon"
                      tabler="IconCircleCheckFilled"
                      hugeicons="CheckmarkCircle01Icon"
                      phosphor="CheckCircleIcon"
                      remixicon="RiCheckboxCircleFill"
                    />
                    {t.done}
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<a href="/docs" />}
              sx={navigationMenuTriggerStyle}
              data-lang={dir === "rtl" ? language : undefined}
            >
              {t.docs}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<a href={href} />}>
        <div sx={styles.listItemDiv}>
          <div sx={styles.listItemDiv2}>{title}</div>
          <div sx={styles.listItemDiv3}>{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
