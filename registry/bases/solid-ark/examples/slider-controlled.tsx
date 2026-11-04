import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

export default function SliderControlled() {
  const styles = {
    mxAutoGridWFullMaxWXsGap: css({
      marginInline: "auto",
      display: "grid",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.xs,
      gap: { "*": null, base: space[3] },
    }),
    flexItemsCenterJustifyBe: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: { "*": null, base: space[2] },
    }),
    textSmTextMutedForegroun: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: theme.mutedForeground,
    }),
  }

  const [value, setValue] = createSignal([0.3, 0.7])

  return (
    <div sx={page.example}>
      <div sx={styles.mxAutoGridWFullMaxWXsGap}>
        <div sx={styles.flexItemsCenterJustifyBe}>
          <Label for="slider-demo-temperature">Temperature</Label>
          <span sx={styles.textSmTextMutedForegroun}>{value().join(", ")}</span>
        </div>
        <Slider
          id="slider-demo-temperature"
          value={value()}
          onValueChange={(details: { value: ReturnType<typeof value> }) =>
            setValue(details.value)
          }
          min={0}
          max={1}
          step={0.1}
        />
      </div>
    </div>
  )
}
