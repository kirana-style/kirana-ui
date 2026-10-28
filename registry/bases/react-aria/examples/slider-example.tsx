import { css } from "@kirana-style/core"

import * as React from "react"

import { Example, ExampleWrapper } from "../components/example"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"

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

export default function SliderExample() {
  return (
    <ExampleWrapper>
      <SliderBasic />
      <SliderRange />
      <SliderMultiple />
      <SliderVertical />
      <SliderControlled />
      <SliderDisabled />
    </ExampleWrapper>
  )
}

function SliderBasic() {
  return (
    <Example title="Basic">
      <Slider
        aria-label="Basic slider"
        defaultValue={50}
        maxValue={100}
        step={1}
      />
    </Example>
  )
}

function SliderRange() {
  return (
    <Example title="Range">
      <Slider
        aria-label="Range slider"
        defaultValue={[25, 50]}
        maxValue={100}
        step={5}
      />
    </Example>
  )
}

function SliderMultiple() {
  return (
    <Example title="Multiple Thumbs">
      <Slider
        aria-label="Multiple thumbs slider"
        defaultValue={[10, 20, 70]}
        maxValue={100}
        step={10}
      />
    </Example>
  )
}

function SliderVertical() {
  return (
    <Example title="Vertical">
      <div sx={styles.flexItemsCenterGap6}>
        <Slider
          aria-label="Vertical slider"
          defaultValue={[50]}
          maxValue={100}
          step={1}
          orientation="vertical"
          sx={styles.h40}
        />
        <Slider
          aria-label="Vertical slider"
          defaultValue={[25]}
          maxValue={100}
          step={1}
          orientation="vertical"
          sx={styles.h40}
        />
      </div>
    </Example>
  )
}

function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <Example title="Controlled">
      <div sx={styles.gridWFullGap3}>
        <div sx={styles.flexItemsCenterJustifyBe}>
          <Label htmlFor="slider-demo-temperature">Temperature</Label>
          <span sx={styles.textSmTextMutedForegroun}>{value.join(", ")}</span>
        </div>
        <Slider
          aria-label="Controlled slider"
          id="slider-demo-temperature"
          value={value}
          onChange={setValue}
          minValue={0}
          maxValue={1}
          step={0.1}
        />
      </div>
    </Example>
  )
}

function SliderDisabled() {
  return (
    <Example title="Disabled">
      <Slider
        aria-label="Disabled slider"
        defaultValue={[50]}
        maxValue={100}
        step={1}
        isDisabled
      />
    </Example>
  )
}
