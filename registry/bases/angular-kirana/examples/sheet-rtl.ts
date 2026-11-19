import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

const styles = {
  fieldGroup: css({
    paddingInline: { "*": null, base: space[4] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      open: "Open",
      editProfile: "Edit profile",
      description:
        "Make changes to your profile here. Click save when you're done.",
      name: "Name",
      username: "Username",
      save: "Save changes",
      close: "Close",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      open: "فتح",
      editProfile: "تعديل الملف الشخصي",
      description:
        "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.",
      name: "الاسم",
      username: "اسم المستخدم",
      save: "حفظ التغييرات",
      close: "إغلاق",
    },
  },
  he: {
    dir: "rtl",
    values: {
      open: "פתח",
      editProfile: "עריכת פרופיל",
      description: "בצע שינויים בפרופיל שלך כאן. לחץ שמור כשתסיים.",
      name: "שם",
      username: "שם משתמש",
      save: "שמור שינויים",
      close: "סגור",
    },
  },
}

@Component({
  selector: "sheet-rtl",
  imports: [
    Button,
    DirectionProvider,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <ng-container kuiSheet>
          <button kuiButton kuiSheetTrigger variant="outline">
            {{ t().open }}
          </button>
          <div
            kuiSheetContent
            [attr.dir]="dir()"
            [side]="dir() === 'rtl' ? 'left' : 'right'"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div kuiSheetHeader>
              <h2 kuiSheetTitle>{{ t().editProfile }}</h2>
              <p kuiSheetDescription>{{ t().description }}</p>
            </div>
            <div kuiFieldGroup [sx]="styles.fieldGroup">
              <div kuiField>
                <label kuiFieldLabel for="sheet-rtl-name">{{ t().name }}</label>
                <input kuiInput id="sheet-rtl-name" value="Pedro Duarte" />
              </div>
              <div kuiField>
                <label kuiFieldLabel for="sheet-rtl-username">{{
                  t().username
                }}</label>
                <input kuiInput id="sheet-rtl-username" value="peduarte" />
              </div>
            </div>
            <div kuiSheetFooter>
              <button kuiButton type="submit">{{ t().save }}</button>
              <button kuiButton kuiSheetClose variant="outline">
                {{ t().close }}
              </button>
            </div>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export default class SheetRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
