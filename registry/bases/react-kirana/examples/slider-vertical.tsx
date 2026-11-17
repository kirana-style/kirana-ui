import { css } from "@kirana-style/core"

import { Slider } from "../ui/slider"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoFlexWFullMaxWXsIte: css({
    marginInline: "auto",
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
    alignItems: "center",
    justifyContent: "center",
    gap: { "*": null, base: space[6] },
  }),
  h40: css({ height: { "*": null, base: space[40] } }),
}

export default function SliderVertical() {
  return (
    <div sx={page.example}>
      <div sx={styles.mxAutoFlexWFullMaxWXsIte}>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          orientation="vertical"
          sx={styles.h40}
        />
        <Slider
          defaultValue={[25]}
          max={100}
          step={1}
          orientation="vertical"
          sx={styles.h40}
        />
      </div>
    </div>
  )
}
