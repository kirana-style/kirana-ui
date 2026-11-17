<script lang="ts">
  import SettingsDialog from "./components/SettingsDialog.svelte"
  import { css } from "@kirana-style/core"

  const styles = {
    pageDiv: css({
      display: "flex",
      height: "100svh",
      alignItems: "center",
      justifyContent: "center",
    }),
  }
</script>

<div sx={styles.pageDiv}>
  <SettingsDialog />
</div>
