import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function AlertDialogRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            {t.showDialog}
          </AlertDialogTrigger>
          <AlertDialogContent
            dir={dir}
            data-lang={dir === "rtl" ? language : undefined}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>{t.title}</AlertDialogTitle>
              <AlertDialogDescription>{t.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction>{t.continue}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            {t.showDialogSm}
          </AlertDialogTrigger>
          <AlertDialogContent
            size="sm"
            dir={dir}
            data-lang={dir === "rtl" ? language : undefined}
          >
            <AlertDialogHeader>
              <AlertDialogMedia>
                <IconPlaceholder
                  lucide="BluetoothIcon"
                  tabler="IconBluetooth"
                  hugeicons="BluetoothIcon"
                  phosphor="BluetoothIcon"
                  remixicon="RiBluetoothLine"
                />
              </AlertDialogMedia>
              <AlertDialogTitle>{t.smallTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.smallDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.dontAllow}</AlertDialogCancel>
              <AlertDialogAction>{t.allow}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
