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

export default function SliderRange() {
  return (
    <div sx={page.example}>
      <Slider
        aria-label="Range"
        defaultValue={[25, 50]}
        maxValue={100}
        step={5}
        sx={styles.mxAutoWFullMaxWXs}
      />
    </div>
  )
}
