import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
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
import type { Translations } from "../components/language-selector"

export default function AlertDialogRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <div sx={styles.div} dir={translation.dir}>
          <AlertDialog>
            <AlertDialogTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  {translation.t.showDialog}
                </Button>
              )}
            />
            <AlertDialogContent
              dir={translation.dir}
              data-lang={
                translation.dir === "rtl" ? translation.language : undefined
              }
            >
              <AlertDialogHeader>
                <AlertDialogTitle>{translation.t.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {translation.t.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{translation.t.cancel}</AlertDialogCancel>
                <AlertDialogAction>{translation.t.continue}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  {translation.t.showDialogSm}
                </Button>
              )}
            />
            <AlertDialogContent
              size="sm"
              dir={translation.dir}
              data-lang={
                translation.dir === "rtl" ? translation.language : undefined
              }
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
                <AlertDialogTitle>{translation.t.smallTitle}</AlertDialogTitle>
                <AlertDialogDescription>
                  {translation.t.smallDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{translation.t.dontAllow}</AlertDialogCancel>
                <AlertDialogAction>{translation.t.allow}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </DirectionProvider>
  )
}
