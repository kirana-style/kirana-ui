import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
import { DirectionProvider } from "../ui/direction"

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

@Component({
  selector: "context-menu-rtl",
  imports: [
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
    DirectionProvider,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.contextMenuTrigger">
            <span [sx]="styles.span">{{ t().rightClick }}</span>
            <span [sx]="styles.span2">{{ t().longPress }}</span>
          </div>
          <div
            kuiContextMenuContent
            [sx]="styles.contextMenuContent"
            [attr.dir]="dir()"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div kuiContextMenuGroup>
              <ng-container kuiContextMenuSub>
                <div kuiContextMenuSubTrigger>{{ t().navigation }}</div>
                <div
                  kuiContextMenuSubContent
                  [sx]="styles.contextMenuSubContent"
                  [attr.dir]="dir()"
                  [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                >
                  <div kuiContextMenuGroup>
                    <div kuiContextMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="ArrowLeftIcon"
                        tabler="IconArrowLeft"
                        hugeicons="ArrowLeft01Icon"
                        phosphor="ArrowLeftIcon"
                        remixicon="RiArrowLeftLine"
                      ></svg>
                      {{ t().back }}
                      <span kuiContextMenuShortcut>⌘[</span>
                    </div>
                    <div kuiContextMenuItem disabled>
                      <svg
                        iconPlaceholder
                        lucide="ArrowRightIcon"
                        tabler="IconArrowRight"
                        hugeicons="ArrowRight01Icon"
                        phosphor="ArrowRightIcon"
                        remixicon="RiArrowRightLine"
                      ></svg>
                      {{ t().forward }}
                      <span kuiContextMenuShortcut>⌘]</span>
                    </div>
                    <div kuiContextMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="RotateCwIcon"
                        tabler="IconRotateClockwise2"
                        hugeicons="Rotate01Icon"
                        phosphor="ArrowClockwiseIcon"
                        remixicon="RiRefreshLine"
                      ></svg>
                      {{ t().reload }}
                      <span kuiContextMenuShortcut>⌘R</span>
                    </div>
                  </div>
                </div>
              </ng-container>
              <ng-container kuiContextMenuSub>
                <div kuiContextMenuSubTrigger>{{ t().moreTools }}</div>
                <div
                  kuiContextMenuSubContent
                  [sx]="styles.contextMenuSubContent2"
                  [attr.dir]="dir()"
                  [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                >
                  <div kuiContextMenuGroup>
                    <div kuiContextMenuItem>{{ t().savePage }}</div>
                    <div kuiContextMenuItem>{{ t().createShortcut }}</div>
                    <div kuiContextMenuItem>{{ t().nameWindow }}</div>
                  </div>
                  <div kuiContextMenuSeparator></div>
                  <div kuiContextMenuGroup>
                    <div kuiContextMenuItem>{{ t().developerTools }}</div>
                  </div>
                  <div kuiContextMenuSeparator></div>
                  <div kuiContextMenuGroup>
                    <div kuiContextMenuItem variant="destructive">
                      {{ t().delete }}
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuCheckboxItem checked>
                {{ t().showBookmarks }}
              </div>
              <div kuiContextMenuCheckboxItem>{{ t().showFullUrls }}</div>
            </div>
            <div kuiContextMenuSeparator></div>
            <div kuiContextMenuGroup>
              <div kuiContextMenuRadioGroup [(value)]="people">
                <div kuiContextMenuLabel>{{ t().people }}</div>
                <div kuiContextMenuRadioItem value="pedro">{{ t().pedro }}</div>
                <div kuiContextMenuRadioItem value="colm">{{ t().colm }}</div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export default class ContextMenuRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly people = signal("pedro")
  protected readonly styles = styles
  protected readonly page = page
}
