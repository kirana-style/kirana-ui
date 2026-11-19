import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"

export default function SliderExample() {
  const styles = {
    flexItemsCenterGap6: css({
      display: "flex",
      alignItems: "center",
      gap: { "*": null, base: space[6] },
    }),
    h40: css({ height: { "*": null, base: space[40] } }),
    gridWFullGap3: css({
      display: "grid",
      width: { "*": null, base: "100%" },
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
    <ExampleWrapper>
      <Example title="Basic">
        <Slider defaultValue={50} max={100} step={1} />
      </Example>
      <Example title="Range">
        <Slider defaultValue={[25, 50]} max={100} step={5} />
      </Example>
      <Example title="Multiple Thumbs">
        <Slider defaultValue={[10, 20, 70]} max={100} step={10} />
      </Example>
      <Example title="Vertical">
        <div sx={styles.flexItemsCenterGap6}>
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
      </Example>
      <Example title="Controlled">
        <div sx={styles.gridWFullGap3}>
          <div sx={styles.flexItemsCenterJustifyBe}>
            <Label for="slider-demo-temperature">Temperature</Label>
            <span sx={styles.textSmTextMutedForegroun}>
              {value().join(", ")}
            </span>
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
      </Example>
      <Example title="Disabled">
        <Slider defaultValue={[50]} max={100} step={1} disabled />
      </Example>
    </ExampleWrapper>
  )
}
