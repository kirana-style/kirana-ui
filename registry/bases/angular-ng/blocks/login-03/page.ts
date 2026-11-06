import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  breakpoint,
  containerSize,
  fontWeight,
  space,
} from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { LoginForm } from "./components/login-form"

const styles = {
  loginPageDiv: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[6],
    backgroundColor: theme.muted,
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  loginPageDiv2: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[6],
  }),
  loginPageA: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    alignSelf: "center",
    fontWeight: fontWeight.medium,
  }),
  loginPageDiv3: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
  }),
  loginPageIconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
}

@Component({
  selector: "login-03",
  imports: [LoginForm, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="styles.loginPageDiv">
      <div [sx]="styles.loginPageDiv2">
        <a href="#" [sx]="styles.loginPageA">
          <div [sx]="styles.loginPageDiv3">
            <svg
              iconPlaceholder
              lucide="GalleryVerticalEndIcon"
              tabler="IconLayoutRows"
              hugeicons="LayoutBottomIcon"
              phosphor="RowsIcon"
              remixicon="RiGalleryLine"
              [sx]="styles.loginPageIconPlaceholder"
            ></svg>
          </div>
          Acme Inc.
        </a>
        <kui-login-form />
      </div>
    </div>
  `,
})
export default class Login03 {
  protected readonly styles = styles
}
