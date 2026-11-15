import { css } from "@kirana-style/core"

import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexGap2: css({ display: "flex", gap: { "*": null, base: space[2] } }),
}

export default function LabelDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexGap2}>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
