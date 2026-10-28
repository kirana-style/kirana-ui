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

export default function SliderDemo() {
  return (
    <div sx={page.example}>
      <Slider
        defaultValue={[75]}
        max={100}
        step={1}
        sx={styles.mxAutoWFullMaxWXs}
      />
    </div>
  )
}
