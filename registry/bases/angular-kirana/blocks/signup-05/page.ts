import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import { breakpoint, containerSize, space } from "../../../../core/scales"
import { SignupForm } from "./components/signup-form"

const styles = {
  signupPageDiv: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[6],
    backgroundColor: theme.background,
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  signupPageDiv2: css({
    width: "100%",
    maxWidth: containerSize.sm,
  }),
}

@Component({
  selector: "signup-05",
  imports: [SignupForm, SxDirective],
  template: `
    <div [sx]="styles.signupPageDiv">
      <div [sx]="styles.signupPageDiv2">
        <kui-signup-form />
      </div>
    </div>
  `,
})
export default class Signup05 {
  protected readonly styles = styles
}
