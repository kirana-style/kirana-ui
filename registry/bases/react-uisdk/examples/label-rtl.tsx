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

export default function LabelRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <Checkbox id="terms-rtl" dir={dir} />
        <Label htmlFor="terms-rtl" dir={dir}>
          {t.label}
        </Label>
      </div>
    </div>
  )
}
