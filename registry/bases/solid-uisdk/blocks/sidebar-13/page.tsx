import { SettingsDialog } from "./components/settings-dialog"
import { css } from "@kirana-style/core"

export default function Page() {
  const styles = {
    pageDiv: css({
      display: "flex",
      height: "100svh",
      alignItems: "center",
      justifyContent: "center",
    }),
  }

  return (
    <div sx={styles.pageDiv}>
      <SettingsDialog />
    </div>
  )
}
