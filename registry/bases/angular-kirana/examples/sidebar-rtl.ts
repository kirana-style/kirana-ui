import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { AppSidebarWithProvider } from "../components/sidebar-rtl/app-sidebar-with-provider"

const styles = {
  // Upstream shows the sidebar as a block (`type="block"`): edge to edge, the frame unpadded.
  flush: css({ padding: { "*": null, base: "0" } }),
}

@Component({
  selector: "sidebar-rtl",
  imports: [AppSidebarWithProvider, SxDirective],
  template: `
    <div [sx]="[page.example, styles.flush]">
      <!-- The language is the preview bar's, as every right-to-left demo's: upstream's page of its
          own draws its picker in the corner. -->
      <kui-app-sidebar-with-provider />
    </div>
  `,
})
export default class SidebarRtl {
  protected readonly styles = styles
  protected readonly page = page
}
