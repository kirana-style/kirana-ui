import { css } from "@kirana-style/core"

import { Slider } from "../ui/slider"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFullMaxWXs: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
  }),
}

export default function SliderMultiple() {
  return (
    <div sx={page.example}>
      <Slider
        aria-label="Multiple slider"
        defaultValue={[10, 20, 70]}
        maxValue={100}
        step={10}
        sx={styles.mxAutoWFullMaxWXs}
      />
    </div>
  )
}
