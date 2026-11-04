import { css } from "@kirana-style/core"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function LabelDemo() {
  const styles = {
    flexGap2: css({ display: "flex", gap: { "*": null, base: space[2] } }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexGap2}>
        <Checkbox id="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
