import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Slider } from "../ui/slider"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function SliderRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Slider
          defaultValue={[75]}
          max={100}
          step={1}
          sx={styles.slider}
          dir={translation.dir}
        />
      </div>
    </DirectionProvider>
  )
}
