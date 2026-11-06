import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar"

const styles = {
  menubar: css({
    width: { "*": null, base: space[72] },
  }),
  menubarContent: css({
    width: { "*": null, base: space[44] },
  }),
}
const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      file: "File",
      newTab: "New Tab",
      newWindow: "New Window",
      newIncognitoWindow: "New Incognito Window",
      share: "Share",
      emailLink: "Email link",
      messages: "Messages",
      notes: "Notes",
      print: "Print...",
      edit: "Edit",
      undo: "Undo",
      redo: "Redo",
      find: "Find",
      searchTheWeb: "Search the web",
      findItem: "Find...",
      findNext: "Find Next",
      findPrevious: "Find Previous",
      cut: "Cut",
      copy: "Copy",
      paste: "Paste",
      view: "View",
      bookmarksBar: "Bookmarks Bar",
      fullUrls: "Full URLs",
      reload: "Reload",
      forceReload: "Force Reload",
      toggleFullscreen: "Toggle Fullscreen",
      hideSidebar: "Hide Sidebar",
      profiles: "Profiles",
      andy: "Andy",
      benoit: "Benoit",
      luis: "Luis",
      editProfile: "Edit...",
      addProfile: "Add Profile...",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      file: "ملف",
      newTab: "علامة تبويب جديدة",
      newWindow: "نافذة جديدة",
      newIncognitoWindow: "نافذة التصفح المتخفي الجديدة",
      share: "مشاركة",
      emailLink: "رابط البريد الإلكتروني",
      messages: "الرسائل",
      notes: "الملاحظات",
      print: "طباعة...",
      edit: "تعديل",
      undo: "تراجع",
      redo: "إعادة",
      find: "بحث",
      searchTheWeb: "البحث على الويب",
      findItem: "بحث...",
      findNext: "البحث التالي",
      findPrevious: "البحث السابق",
      cut: "قص",
      copy: "نسخ",
      paste: "لصق",
      view: "عرض",
      bookmarksBar: "شريط الإشارات المرجعية",
      fullUrls: "عناوين URL الكاملة",
      reload: "إعادة تحميل",
      forceReload: "إعادة تحميل قسري",
      toggleFullscreen: "تبديل وضع ملء الشاشة",
      hideSidebar: "إخفاء الشريط الجانبي",
      profiles: "الملفات الشخصية",
      andy: "Andy",
      benoit: "Benoit",
      luis: "Luis",
      editProfile: "تعديل...",
      addProfile: "إضافة ملف شخصي...",
    },
  },
  he: {
    dir: "rtl",
    values: {
      file: "קובץ",
      newTab: "כרטיסייה חדשה",
      newWindow: "חלון חדש",
      newIncognitoWindow: "חלון גלישה בסתר חדש",
      share: "שתף",
      emailLink: "קישור אימייל",
      messages: "הודעות",
      notes: "הערות",
      print: "הדפס...",
      edit: "ערוך",
      undo: "בטל",
      redo: "בצע שוב",
      find: "מצא",
      searchTheWeb: "חפש באינטרנט",
      findItem: "מצא...",
      findNext: "מצא הבא",
      findPrevious: "מצא הקודם",
      cut: "גזור",
      copy: "העתק",
      paste: "הדבק",
      view: "תצוגה",
      bookmarksBar: "סרגל סימניות",
      fullUrls: "כתובות URL מלאות",
      reload: "רענן",
      forceReload: "רענן בכוח",
      toggleFullscreen: "החלף מסך מלא",
      hideSidebar: "הסתר סרגל צד",
      profiles: "פרופילים",
      andy: "Andy",
      benoit: "Benoit",
      luis: "Luis",
      editProfile: "ערוך...",
      addProfile: "הוסף פרופיל...",
    },
  },
}

@Component({
  selector: "menubar-rtl",
  imports: [
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMenubar [sx]="styles.menubar" [attr.dir]="dir()">
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>{{ t().file }}</button>
          <div
            kuiMenubarContent
            [attr.dir]="dir()"
            [align]="dir() === 'rtl' ? 'end' : 'start'"
          >
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                {{ t().newTab }}
                <span kuiMenubarShortcut>⌘T</span>
              </div>
              <div kuiMenubarItem>
                {{ t().newWindow }}
                <span kuiMenubarShortcut>⌘N</span>
              </div>
              <div kuiMenubarItem disabled>{{ t().newIncognitoWindow }}</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>{{ t().share }}</div>
                <div
                  kuiMenubarSubContent
                  [attr.dir]="dir()"
                  [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                >
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>{{ t().emailLink }}</div>
                    <div kuiMenubarItem>{{ t().messages }}</div>
                    <div kuiMenubarItem>{{ t().notes }}</div>
                  </div>
                </div>
              </ng-container>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                {{ t().print }}
                <span kuiMenubarShortcut>⌘P</span>
              </div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>{{ t().edit }}</button>
          <div
            kuiMenubarContent
            [attr.dir]="dir()"
            [align]="dir() === 'rtl' ? 'end' : 'start'"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div kuiMenubarGroup>
              <div kuiMenubarItem>
                {{ t().undo }}
                <span kuiMenubarShortcut>⌘Z</span>
              </div>
              <div kuiMenubarItem>
                {{ t().redo }}
                <span kuiMenubarShortcut>⇧⌘Z</span>
              </div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <ng-container kuiMenubarSub>
                <div kuiMenubarSubTrigger>{{ t().find }}</div>
                <div
                  kuiMenubarSubContent
                  [attr.dir]="dir()"
                  [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                >
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>{{ t().searchTheWeb }}</div>
                  </div>
                  <div kuiMenubarSeparator></div>
                  <div kuiMenubarGroup>
                    <div kuiMenubarItem>{{ t().findItem }}</div>
                    <div kuiMenubarItem>{{ t().findNext }}</div>
                    <div kuiMenubarItem>{{ t().findPrevious }}</div>
                  </div>
                </div>
              </ng-container>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem>{{ t().cut }}</div>
              <div kuiMenubarItem>{{ t().copy }}</div>
              <div kuiMenubarItem>{{ t().paste }}</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>{{ t().view }}</button>
          <div
            kuiMenubarContent
            [sx]="styles.menubarContent"
            [attr.dir]="dir()"
            [align]="dir() === 'rtl' ? 'end' : 'start'"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div kuiMenubarGroup>
              <div kuiMenubarCheckboxItem>{{ t().bookmarksBar }}</div>
              <div kuiMenubarCheckboxItem checked>{{ t().fullUrls }}</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>
                {{ t().reload }}
                <span kuiMenubarShortcut>⌘R</span>
              </div>
              <div kuiMenubarItem disabled inset>
                {{ t().forceReload }}
                <span kuiMenubarShortcut>⇧⌘R</span>
              </div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>{{ t().toggleFullscreen }}</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>{{ t().hideSidebar }}</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiMenubarMenu>
          <button kuiMenubarTrigger>{{ t().profiles }}</button>
          <div
            kuiMenubarContent
            [attr.dir]="dir()"
            [align]="dir() === 'rtl' ? 'end' : 'start'"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div
              kuiMenubarRadioGroup
              [value]="profile()"
              (valueChange)="profile.set($any($event))"
            >
              <div kuiMenubarRadioItem value="andy">{{ t().andy }}</div>
              <div kuiMenubarRadioItem value="benoit">{{ t().benoit }}</div>
              <div kuiMenubarRadioItem value="Luis">{{ t().luis }}</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>{{ t().editProfile }}</div>
            </div>
            <div kuiMenubarSeparator></div>
            <div kuiMenubarGroup>
              <div kuiMenubarItem inset>{{ t().addProfile }}</div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MenubarRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly profile = signal("benoit")
  protected readonly styles = styles
  protected readonly page = page
}
