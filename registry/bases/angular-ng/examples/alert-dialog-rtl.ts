import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"

const styles = {
  div: css({
    display: "flex",
    gap: space[4],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      showDialog: "Show Dialog",
      showDialogSm: "Show Dialog (sm)",
      title: "Are you absolutely sure?",
      description:
        "This action cannot be undone. This will permanently delete your account from our servers.",
      cancel: "Cancel",
      continue: "Continue",
      smallTitle: "Allow accessory to connect?",
      smallDescription:
        "Do you want to allow the USB accessory to connect to this device?",
      dontAllow: "Don't allow",
      allow: "Allow",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      showDialog: "إظهار الحوار",
      showDialogSm: "إظهار الحوار (صغير)",
      title: "هل أنت متأكد تمامًا؟",
      description:
        "لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.",
      cancel: "إلغاء",
      continue: "متابعة",
      smallTitle: "السماح للملحق بالاتصال؟",
      smallDescription: "هل تريد السماح لملحق USB بالاتصال بهذا الجهاز؟",
      dontAllow: "عدم السماح",
      allow: "السماح",
    },
  },
  he: {
    dir: "rtl",
    values: {
      showDialog: "הצג דיאלוג",
      showDialogSm: "הצג דיאלוג (קטן)",
      title: "האם אתה בטוח לחלוטין?",
      description:
        "פעולה זו לא ניתנת לביטול. זה ימחק לצמיתות את החשבון שלך מהשרתים שלנו.",
      cancel: "ביטול",
      continue: "המשך",
      smallTitle: "לאפשר להתקן להתחבר?",
      smallDescription: "האם אתה רוצה לאפשר להתקן USB להתחבר למכשיר זה?",
      dontAllow: "אל תאפשר",
      allow: "אפשר",
    },
  },
}

@Component({
  selector: "alert-dialog-rtl",
  imports: [
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    DirectionProvider,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <ng-container kuiAlertDialog>
            <button kuiButton kuiAlertDialogTrigger variant="outline">
              {{ t().showDialog }}
            </button>
            <div
              kuiAlertDialogContent
              [attr.dir]="dir()"
              [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
            >
              <div kuiAlertDialogHeader>
                <h2 kuiAlertDialogTitle>{{ t().title }}</h2>
                <p kuiAlertDialogDescription>{{ t().description }}</p>
              </div>
              <div kuiAlertDialogFooter>
                <button kuiAlertDialogCancel>{{ t().cancel }}</button>
                <button kuiAlertDialogAction>{{ t().continue }}</button>
              </div>
            </div>
          </ng-container>
          <ng-container kuiAlertDialog>
            <button kuiButton kuiAlertDialogTrigger variant="outline">
              {{ t().showDialogSm }}
            </button>
            <div
              kuiAlertDialogContent
              size="sm"
              [attr.dir]="dir()"
              [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
            >
              <div kuiAlertDialogHeader>
                <div kuiAlertDialogMedia>
                  <svg
                    iconPlaceholder
                    lucide="BluetoothIcon"
                    tabler="IconBluetooth"
                    hugeicons="BluetoothIcon"
                    phosphor="BluetoothIcon"
                    remixicon="RiBluetoothLine"
                  ></svg>
                </div>
                <h2 kuiAlertDialogTitle>{{ t().smallTitle }}</h2>
                <p kuiAlertDialogDescription>{{ t().smallDescription }}</p>
              </div>
              <div kuiAlertDialogFooter>
                <button kuiAlertDialogCancel>{{ t().dontAllow }}</button>
                <button kuiAlertDialogAction>{{ t().allow }}</button>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </ng-container>
  `,
})
export default class AlertDialogRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
