import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const styles = {
  dialogContent: css({
    maxWidth: { [breakpoint.sm]: containerSize.sm },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      openDialog: "Open Dialog",
      editProfile: "Edit profile",
      description:
        "Make changes to your profile here. Click save when you're done.",
      name: "Name",
      username: "Username",
      cancel: "Cancel",
      saveChanges: "Save changes",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      openDialog: "فتح الحوار",
      editProfile: "تعديل الملف الشخصي",
      description:
        "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
      name: "الاسم",
      username: "اسم المستخدم",
      cancel: "إلغاء",
      saveChanges: "حفظ التغييرات",
    },
  },
  he: {
    dir: "rtl",
    values: {
      openDialog: "פתח דיאלוג",
      editProfile: "ערוך פרופיל",
      description: "בצע שינויים בפרופיל שלך כאן. לחץ על שמור כשתסיים.",
      name: "שם",
      username: "שם משתמש",
      cancel: "בטל",
      saveChanges: "שמור שינויים",
    },
  },
}

@Component({
  selector: "dialog-rtl",
  imports: [
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DirectionProvider,
    Field,
    FieldGroup,
    Input,
    Label,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <ng-container kuiDialog>
          <form>
            <button kuiButton kuiDialogTrigger variant="outline">
              {{ t().openDialog }}
            </button>
            <div
              kuiDialogContent
              [sx]="styles.dialogContent"
              [attr.dir]="dir()"
              [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
            >
              <div kuiDialogHeader>
                <h2 kuiDialogTitle>{{ t().editProfile }}</h2>
                <p kuiDialogDescription>{{ t().description }}</p>
              </div>
              <div kuiFieldGroup>
                <div kuiField>
                  <label kuiLabel for="name-1">{{ t().name }}</label>
                  <input
                    kuiInput
                    id="name-1"
                    name="name"
                    value="Pedro Duarte"
                  />
                </div>
                <div kuiField>
                  <label kuiLabel for="username-1">{{ t().username }}</label>
                  <input
                    kuiInput
                    id="username-1"
                    name="username"
                    value="@peduarte"
                  />
                </div>
              </div>
              <div kuiDialogFooter>
                <button kuiButton kuiDialogClose variant="outline">
                  {{ t().cancel }}
                </button>
                <button kuiButton type="submit">{{ t().saveChanges }}</button>
              </div>
            </div>
          </form>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export default class DialogRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
