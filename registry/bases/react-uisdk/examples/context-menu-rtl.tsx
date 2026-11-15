import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  contextMenuTrigger: css({
    display: { "*": null, base: "flex" },
    aspectRatio: { "*": null, base: "16 / 9" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    borderRadius: { "*": null, base: radius.xl },
    borderStyle: { "*": null, base: "dashed" },
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
  }),
  span: css({
    display: {
      base: "none",
      "@media (pointer: fine)": "inline-block",
    },
  }),
  span2: css({
    display: {
      base: "none",
      "@media (pointer: coarse)": "inline-block",
    },
  }),
  contextMenuContent: css({
    width: { "*": null, base: space[48] },
  }),
  contextMenuSubContent: css({
    width: { "*": null, base: space[44] },
  }),
  contextMenuSubContent2: css({
    width: { "*": null, base: space[44] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      rightClick: "Right click here",
      longPress: "Long press here",
      navigation: "Navigation",
      back: "Back",
      forward: "Forward",
      reload: "Reload",
      moreTools: "More Tools",
      savePage: "Save Page...",
      createShortcut: "Create Shortcut...",
      nameWindow: "Name Window...",
      developerTools: "Developer Tools",
      delete: "Delete",
      showBookmarks: "Show Bookmarks",
      showFullUrls: "Show Full URLs",
      people: "People",
      pedro: "Pedro Duarte",
      colm: "Colm Tuite",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      rightClick: "انقر بزر الماوس الأيمن هنا",
      longPress: "اضغط مطولاً هنا",
      navigation: "التنقل",
      back: "رجوع",
      forward: "تقدم",
      reload: "إعادة تحميل",
      moreTools: "المزيد من الأدوات",
      savePage: "حفظ الصفحة...",
      createShortcut: "إنشاء اختصار...",
      nameWindow: "تسمية النافذة...",
      developerTools: "أدوات المطور",
      delete: "حذف",
      showBookmarks: "إظهار الإشارات المرجعية",
      showFullUrls: "إظهار عناوين URL الكاملة",
      people: "الأشخاص",
      pedro: "Pedro Duarte",
      colm: "Colm Tuite",
    },
  },
  he: {
    dir: "rtl",
    values: {
      rightClick: "לחץ לחיצה ימנית כאן",
      longPress: "לחץ לחיצה ארוכה כאן",
      navigation: "ניווט",
      back: "חזור",
      forward: "קדימה",
      reload: "רענן",
      moreTools: "כלים נוספים",
      savePage: "שמור עמוד...",
      createShortcut: "צור קיצור דרך...",
      nameWindow: "שם חלון...",
      developerTools: "כלי מפתח",
      delete: "מחק",
      showBookmarks: "הצג סימניות",
      showFullUrls: "הצג כתובות URL מלאות",
      people: "אנשים",
      pedro: "Pedro Duarte",
      colm: "Colm Tuite",
    },
  },
}

export default function ContextMenuRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")
  const [people, setPeople] = React.useState("pedro")

  return (
    <div sx={page.example}>
      <ContextMenu>
        <ContextMenuTrigger sx={styles.contextMenuTrigger}>
          <span sx={styles.span}>{t.rightClick}</span>
          <span sx={styles.span2}>{t.longPress}</span>
        </ContextMenuTrigger>
        <ContextMenuContent
          sx={styles.contextMenuContent}
          dir={dir}
          data-lang={dir === "rtl" ? language : undefined}
        >
          <ContextMenuGroup>
            <ContextMenuSub>
              <ContextMenuSubTrigger>{t.navigation}</ContextMenuSubTrigger>
              <ContextMenuSubContent
                sx={styles.contextMenuSubContent}
                dir={dir}
                data-lang={dir === "rtl" ? language : undefined}
              >
                <ContextMenuGroup>
                  <ContextMenuItem>
                    <IconPlaceholder
                      lucide="ArrowLeftIcon"
                      tabler="IconArrowLeft"
                      hugeicons="ArrowLeft01Icon"
                      phosphor="ArrowLeftIcon"
                      remixicon="RiArrowLeftLine"
                    />
                    {t.back}
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem disabled>
                    <IconPlaceholder
                      lucide="ArrowRightIcon"
                      tabler="IconArrowRight"
                      hugeicons="ArrowRight01Icon"
                      phosphor="ArrowRightIcon"
                      remixicon="RiArrowRightLine"
                    />
                    {t.forward}
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <IconPlaceholder
                      lucide="RotateCwIcon"
                      tabler="IconRotateClockwise2"
                      hugeicons="Rotate01Icon"
                      phosphor="ArrowClockwiseIcon"
                      remixicon="RiRefreshLine"
                    />
                    {t.reload}
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSub>
              <ContextMenuSubTrigger>{t.moreTools}</ContextMenuSubTrigger>
              <ContextMenuSubContent
                sx={styles.contextMenuSubContent2}
                dir={dir}
                data-lang={dir === "rtl" ? language : undefined}
              >
                <ContextMenuGroup>
                  <ContextMenuItem>{t.savePage}</ContextMenuItem>
                  <ContextMenuItem>{t.createShortcut}</ContextMenuItem>
                  <ContextMenuItem>{t.nameWindow}</ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>{t.developerTools}</ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem variant="destructive">
                    {t.delete}
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuCheckboxItem checked>
              {t.showBookmarks}
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>{t.showFullUrls}</ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuRadioGroup value={people} onValueChange={setPeople}>
              <ContextMenuLabel>{t.people}</ContextMenuLabel>
              <ContextMenuRadioItem value="pedro">
                {t.pedro}
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm">{t.colm}</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
