<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { Textarea } from "../ui/textarea"
  import { css } from "@kirana-style/core"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    field: css({
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: containerSize.xs },
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        label: "Feedback",
        placeholder: "Your feedback helps us improve...",
        description: "Share your thoughts about our service.",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        label: "التعليقات",
        placeholder: "تعليقاتك تساعدنا على التحسين...",
        description: "شاركنا أفكارك حول خدمتنا.",
      },
    },
    he: {
      dir: "rtl",
      values: {
        label: "משוב",
        placeholder: "המשוב שלך עוזר לנו להשתפר...",
        description: "שתף את מחשבותיך על השירות שלנו.",
      },
    },
  }

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <Field sx={styles.field} dir={translation.dir}>
      <FieldLabel for="feedback" dir={translation.dir}>
        {translation.t.label}
      </FieldLabel>
      <Textarea id="feedback" placeholder={translation.t.placeholder} dir={translation.dir} rows={4} />
      <FieldDescription dir={translation.dir}>
        {translation.t.description}
      </FieldDescription>
    </Field>
  </div>
</DirectionProvider>
