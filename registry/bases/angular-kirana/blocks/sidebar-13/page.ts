import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { SettingsDialog } from "./components/settings-dialog"

const styles = {
  pageDiv: css({
    display: "flex",
    height: "100svh",
    alignItems: "center",
    justifyContent: "center",
  }),
}

@Component({
  selector: "sidebar-13",
  imports: [SettingsDialog, SxDirective],
  template: `
    <div [sx]="styles.pageDiv">
      <kui-settings-dialog />
    </div>
  `,
})
export default class Sidebar13 {
  protected readonly styles = styles
}
