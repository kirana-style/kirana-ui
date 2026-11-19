import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../../core/scales"
import { SignupForm } from "./components/signup-form"

const styles = {
  pageDiv: css({
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  pageDiv2: css({
    width: "100%",
    maxWidth: containerSize.sm,
  }),
}

@Component({
  selector: "signup-01",
  imports: [SignupForm, SxDirective],
  template: `
    <div [sx]="styles.pageDiv">
      <div [sx]="styles.pageDiv2">
        <kui-signup-form />
      </div>
    </div>
  `,
})
export default class Signup01 {
  protected readonly styles = styles
}
