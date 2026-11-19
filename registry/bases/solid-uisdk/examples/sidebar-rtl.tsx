import { AppSidebarWithProvider } from "../components/sidebar-rtl/app-sidebar-with-provider"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

export default function SidebarRtl() {
  const styles = {
    // Upstream shows the sidebar as a block (`type="block"`): edge to edge, the frame unpadded.
    flush: css({ padding: { "*": null, base: "0" } }),
  }

  return (
    <div sx={[page.example, styles.flush]}>
      <AppSidebarWithProvider />
    </div>
  )
}
