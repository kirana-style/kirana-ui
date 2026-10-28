import { css } from "@kirana-style/core"

import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
}

export default function RadioGroupDemo() {
  return (
    <div sx={page.example}>
      <RadioGroup
        aria-label="Density"
        defaultValue="comfortable"
        sx={styles.fit}
      >
        <div sx={styles.row}>
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div sx={styles.row}>
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div sx={styles.row}>
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
