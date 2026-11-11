<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
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
  import { Field, FieldGroup } from "../ui/field"
  import { Input } from "../ui/input"
  import { Label } from "../ui/label"
  import { css } from "@kirana-style/core"
  import { breakpoint, containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

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

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <Dialog>
      <form>
        <DialogTrigger>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">
              {translation.t.openDialog}
            </Button>
          {/snippet}
        </DialogTrigger>
        <DialogContent sx={styles.dialogContent} dir={translation.dir} data-lang={translation.dir === 'rtl' ? translation.language : undefined}>
          <DialogHeader>
            <DialogTitle>
              {translation.t.editProfile}
            </DialogTitle>
            <DialogDescription>
              {translation.t.description}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label for="name-1">
                {translation.t.name}
              </Label>
              <Input id="name-1" name="name" value="Pedro Duarte" />
            </Field>
            <Field>
              <Label for="username-1">
                {translation.t.username}
              </Label>
              <Input id="username-1" name="username" value="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              {#snippet asChild(props)}
                <Button {...props()} variant="outline">
                  {translation.t.cancel}
                </Button>
              {/snippet}
            </DialogClose>
            <Button type="submit">
              {translation.t.saveChanges}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </div>
</DirectionProvider>
