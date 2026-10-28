import { css } from "@kirana-style/core"

import * as React from "react"

import { Field, FieldDescription, FieldTitle } from "../ui/field"
import { Slider } from "../ui/slider"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  fontMediumTabularNums: css({
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  mt2WFull: css({ marginTop: space[2], width: { "*": null, base: "100%" } }),
}

export default function FieldSlider() {
  const [value, setValue] = React.useState([200, 800])

  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>
          Set your budget range ($
          <span sx={styles.fontMediumTabularNums}>{value[0]}</span> -{" "}
          <span sx={styles.fontMediumTabularNums}>{value[1]}</span>).
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={(next) => setValue(next as [number, number])}
          max={1000}
          min={0}
          step={10}
          sx={styles.mt2WFull}
          aria-label="Price Range"
        />
      </Field>
    </div>
  )
}
