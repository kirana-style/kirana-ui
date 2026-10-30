import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { Pressable } from "react-aria-components"
import type { Selection } from "react-aria-components"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    aspectRatio: "16 / 9",
    width: "100%",
    maxWidth: containerSize.xs,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.xl,
    borderStyle: "dashed",
    borderWidth: "1px",
    fontSize: fontSize.sm,
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
  contextMenu: css({
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
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["bookmarks"])
  )
  const [people, setPeople] = React.useState("pedro")

  return (
    <div sx={page.example}>
      <ContextMenuTrigger>
        <Pressable>
          <div role="button" sx={styles.div}>
            <span sx={styles.span}>{t.rightClick}</span>
            <span sx={styles.span2}>{t.longPress}</span>
          </div>
        </Pressable>
        <ContextMenu
          sx={styles.contextMenu}
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
                  <ContextMenuItem isDisabled>
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
          <ContextMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <ContextMenuItem id="bookmarks">{t.showBookmarks}</ContextMenuItem>
            <ContextMenuItem id="urls">{t.showFullUrls}</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup
            selectionMode="single"
            selectedKeys={[people]}
            onSelectionChange={(keys) =>
              setPeople(
                keys === "all"
                  ? "pedro"
                  : (keys.values().next().value as string)
              )
            }
          >
            <ContextMenuItem id="pedro">{t.pedro}</ContextMenuItem>
            <ContextMenuItem id="colm">{t.colm}</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </div>
  )
}
