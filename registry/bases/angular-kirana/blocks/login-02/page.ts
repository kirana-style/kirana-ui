import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { DARK_SCHEME, axes } from "../../../../core/axes"
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
    display: "grid",
    minHeight: "100svh",
    gridTemplateColumns: { [breakpoint.lg]: "repeat(2, minmax(0, 1fr))" },
  }),
  loginPageDiv2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  loginPageDiv3: css({
    display: "flex",
    justifyContent: { base: "center", [breakpoint.md]: "flex-start" },
    gap: space[2],
  }),
  loginPageA: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  loginPageDiv4: css({
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
  loginPageDiv5: css({
    display: "flex",
    flex: "1 1 0%",
    alignItems: "center",
    justifyContent: "center",
  }),
  loginPageDiv6: css({
    width: "100%",
    maxWidth: containerSize.xs,
  }),
  loginPageDiv7: css({
    position: "relative",
    display: { base: "none", [breakpoint.lg]: "block" },
    backgroundColor: theme.muted,
  }),
  loginPageImg: css({
    position: "absolute",
    inset: space["0"],
    height: "100%",
    width: "100%",
    objectFit: "cover",

    filter: {
      base: "none",
      [DARK_SCHEME]: {
        base: "brightness(0.2) grayscale(100%)",
        [axes.mode.light]: "none",
      },
      [axes.mode.dark]: "brightness(0.2) grayscale(100%)",
    },
  }),
}

@Component({
  selector: "login-02",
  imports: [LoginForm, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="styles.loginPageDiv">
      <div [sx]="styles.loginPageDiv2">
        <div [sx]="styles.loginPageDiv3">
          <a href="#" [sx]="styles.loginPageA">
            <div [sx]="styles.loginPageDiv4">
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
        </div>
        <div [sx]="styles.loginPageDiv5">
          <div [sx]="styles.loginPageDiv6">
            <kui-login-form />
          </div>
        </div>
      </div>
      <div [sx]="styles.loginPageDiv7">
        <img
          [attr.src]="'/placeholder.svg'"
          alt="Image"
          [sx]="styles.loginPageImg"
        />
      </div>
    </div>
  `,
})
export default class Login02 {
  protected readonly styles = styles
}
