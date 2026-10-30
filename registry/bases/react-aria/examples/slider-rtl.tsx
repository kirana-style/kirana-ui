import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Slider } from "../ui/slider"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  slider: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

export default function SliderRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Slider
        aria-label="RTL slider"
        defaultValue={[75]}
        maxValue={100}
        step={1}
        sx={styles.slider}
        dir={dir}
      />
    </div>
  )
}
