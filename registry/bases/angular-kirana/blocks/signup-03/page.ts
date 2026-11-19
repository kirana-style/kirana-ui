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
import { SignupForm } from "./components/signup-form"

const styles = {
  signupPageDiv: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[6],
    backgroundColor: theme.muted,
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  signupPageDiv2: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[6],
  }),
  signupPageA: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    alignSelf: "center",
    fontWeight: fontWeight.medium,
  }),
  signupPageDiv3: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
  }),
  signupPageIconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
}

@Component({
  selector: "signup-03",
  imports: [SignupForm, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="styles.signupPageDiv">
      <div [sx]="styles.signupPageDiv2">
        <a href="#" [sx]="styles.signupPageA">
          <div [sx]="styles.signupPageDiv3">
            <svg
              iconPlaceholder
              lucide="GalleryVerticalEndIcon"
              tabler="IconLayoutRows"
              hugeicons="LayoutBottomIcon"
              phosphor="RowsIcon"
              remixicon="RiGalleryLine"
              [sx]="styles.signupPageIconPlaceholder"
            ></svg>
          </div>
          Acme Inc.
        </a>
        <kui-signup-form />
      </div>
    </div>
  `,
})
export default class Signup03 {
  protected readonly styles = styles
}
