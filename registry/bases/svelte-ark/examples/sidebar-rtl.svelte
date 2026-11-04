<script lang="ts">
  import { css } from "@kirana-style/core"
  import { page } from "../../../styles/page.styles"
  import AppSidebarWithProvider from "../components/sidebar-rtl/AppSidebarWithProvider.svelte"

  const styles = {
    // Upstream shows the sidebar as a block (`type="block"`): edge to edge, the frame unpadded.
    flush: css({ padding: { "*": null, base: "0" } }),
  }
</script>

<div sx={[page.example, styles.flush]}>
  <!-- The language is the preview bar's, as every right-to-left demo's: upstream's page of its
          own draws its picker in the corner. -->
  <AppSidebarWithProvider />
</div>
