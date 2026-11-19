import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import { breakpoint, containerSize, space } from "../../../../core/scales"
import { LoginForm } from "./components/login-form"

const styles = {
  loginPageDiv: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.muted,
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  loginPageDiv2: css({
    width: "100%",
    maxWidth: { base: containerSize.sm, [breakpoint.md]: containerSize["4xl"] },
  }),
}

@Component({
  selector: "login-04",
  imports: [LoginForm, SxDirective],
  template: `
    <div [sx]="styles.loginPageDiv">
      <div [sx]="styles.loginPageDiv2">
        <kui-login-form />
      </div>
    </div>
  `,
})
export default class Login04 {
  protected readonly styles = styles
}
