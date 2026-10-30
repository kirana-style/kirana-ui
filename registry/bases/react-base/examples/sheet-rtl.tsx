import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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

export default function SheetRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          {t.open}
        </SheetTrigger>
        <SheetContent
          dir={dir}
          side={dir === "rtl" ? "left" : "right"}
          data-lang={dir === "rtl" ? language : undefined}
        >
          <SheetHeader>
            <SheetTitle>{t.editProfile}</SheetTitle>
            <SheetDescription>{t.description}</SheetDescription>
          </SheetHeader>
          <FieldGroup sx={styles.fieldGroup}>
            <Field>
              <FieldLabel htmlFor="sheet-rtl-name">{t.name}</FieldLabel>
              <Input id="sheet-rtl-name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <FieldLabel htmlFor="sheet-rtl-username">{t.username}</FieldLabel>
              <Input id="sheet-rtl-username" defaultValue="peduarte" />
            </Field>
          </FieldGroup>
          <SheetFooter>
            <Button type="submit">{t.save}</Button>
            <SheetClose render={<Button variant="outline" />}>
              {t.close}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
