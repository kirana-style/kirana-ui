<script lang="ts">
  import { DirectionProvider } from "../ui/direction"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
  import { Checkbox } from "../ui/checkbox"
  import { Label } from "../ui/label"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      display: "flex",
      gap: space[2],
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        label: "Accept terms and conditions",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        label: "قبول الشروط والأحكام",
      },
    },
    he: {
      dir: "rtl",
      values: {
        label: "קבל תנאים והגבלות",
      },
    },
  }

  const translation = useTranslation(translations, "ar")
</script>

<DirectionProvider locale={translation.locale}>
  <div sx={page.example}>
    <div sx={styles.div} dir={translation.dir}>
      <Checkbox id="terms-rtl" dir={translation.dir} />
      <Label for="terms-rtl" dir={translation.dir}>
        {translation.t.label}
      </Label>
    </div>
  </div>
</DirectionProvider>
