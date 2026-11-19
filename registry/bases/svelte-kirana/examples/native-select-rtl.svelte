<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
  import { NativeSelect, NativeSelectOption } from "../ui/native-select"
  import { page } from "../../../styles/page.styles"

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        placeholder: "Select status",
        todo: "Todo",
        inProgress: "In Progress",
        done: "Done",
        cancelled: "Cancelled",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        placeholder: "اختر الحالة",
        todo: "مهام",
        inProgress: "قيد التنفيذ",
        done: "منجز",
        cancelled: "ملغي",
      },
    },
    he: {
      dir: "rtl",
      values: {
        placeholder: "בחר סטטוס",
        todo: "לעשות",
        inProgress: "בתהליך",
        done: "הושלם",
        cancelled: "בוטל",
      },
    },
  }

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <NativeSelect dir={translation.dir}>
      <NativeSelectOption value="">
        {translation.t.placeholder}
      </NativeSelectOption>
      <NativeSelectOption value="todo">
        {translation.t.todo}
      </NativeSelectOption>
      <NativeSelectOption value="in-progress">
        {translation.t.inProgress}
      </NativeSelectOption>
      <NativeSelectOption value="done">
        {translation.t.done}
      </NativeSelectOption>
      <NativeSelectOption value="cancelled">
        {translation.t.cancelled}
      </NativeSelectOption>
    </NativeSelect>
  </div>
</DirectionProvider>
