import { css } from "@kirana-style/core"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function SwitchDemo() {
  const styles = {
    // `flex items-center space-x-2`: the space as a gap, which reads the same.
    spaced: css({ display: "flex", alignItems: "center", gap: space[2] }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.spaced}>
        <Switch id="airplane-mode" />
        <Label for="airplane-mode">Airplane Mode</Label>
      </div>
    </div>
  )
}
