import { css } from "@kirana-style/core"

import * as React from "react"

import { Progress } from "../ui/progress"
import { Slider } from "../ui/slider"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  full: css({ width: "100%" }),
}

export default function ProgressControlled() {
  const [value, setValue] = React.useState(50)

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Progress aria-label="Loading" value={value} sx={styles.full} />
        <Slider
          aria-label="Progress"
          value={value}
          onChange={(next) => setValue(next as number)}
          minValue={0}
          maxValue={100}
          step={1}
        />
      </div>
    </div>
  )
}
