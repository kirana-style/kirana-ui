import { SettingsDialog } from "./components/settings-dialog"
import { css } from "@kirana-style/core"

const styles = {
  pageDiv: css({
    display: "flex",
    height: "100svh",
    alignItems: "center",
    justifyContent: "center",
  }),
}

export default function Page() {
  return (
    <div sx={styles.pageDiv}>
      <SettingsDialog />
    </div>
  )
}
