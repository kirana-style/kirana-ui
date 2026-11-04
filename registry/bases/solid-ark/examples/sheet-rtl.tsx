import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Button } from "../ui/button"
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
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function SheetRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Sheet>
          <SheetTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                {translation.t.open}
              </Button>
            )}
          />
          <SheetContent
            dir={translation.dir}
            side={translation.dir === "rtl" ? "left" : "right"}
            data-lang={
              translation.dir === "rtl" ? translation.language : undefined
            }
          >
            <SheetHeader>
              <SheetTitle>{translation.t.editProfile}</SheetTitle>
              <SheetDescription>{translation.t.description}</SheetDescription>
            </SheetHeader>
            <FieldGroup sx={styles.fieldGroup}>
              <Field>
                <FieldLabel for="sheet-rtl-name">
                  {translation.t.name}
                </FieldLabel>
                <Input id="sheet-rtl-name" value="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel for="sheet-rtl-username">
                  {translation.t.username}
                </FieldLabel>
                <Input id="sheet-rtl-username" value="peduarte" />
              </Field>
            </FieldGroup>
            <SheetFooter>
              <Button type="submit">{translation.t.save}</Button>
              <SheetClose
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    {translation.t.close}
                  </Button>
                )}
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </DirectionProvider>
  )
}
