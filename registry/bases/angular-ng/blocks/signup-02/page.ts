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
import { SignupForm } from "./components/signup-form"

const styles = {
  signupPageDiv: css({
    display: "grid",
    minHeight: "100svh",
    gridTemplateColumns: { [breakpoint.lg]: "repeat(2, minmax(0, 1fr))" },
  }),
  signupPageDiv2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  signupPageDiv3: css({
    display: "flex",
    justifyContent: { base: "center", [breakpoint.md]: "flex-start" },
    gap: space[2],
  }),
  signupPageA: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  signupPageDiv4: css({
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
  signupPageDiv5: css({
    display: "flex",
    flex: "1 1 0%",
    alignItems: "center",
    justifyContent: "center",
  }),
  signupPageDiv6: css({
    width: "100%",
    maxWidth: containerSize.xs,
  }),
  signupPageDiv7: css({
    position: "relative",
    display: { base: "none", [breakpoint.lg]: "block" },
    backgroundColor: theme.muted,
  }),
  signupPageImg: css({
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
  selector: "signup-02",
  imports: [SignupForm, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="styles.signupPageDiv">
      <div [sx]="styles.signupPageDiv2">
        <div [sx]="styles.signupPageDiv3">
          <a href="#" [sx]="styles.signupPageA">
            <div [sx]="styles.signupPageDiv4">
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
        </div>
        <div [sx]="styles.signupPageDiv5">
          <div [sx]="styles.signupPageDiv6">
            <kui-signup-form />
          </div>
        </div>
      </div>
      <div [sx]="styles.signupPageDiv7">
        <img
          [attr.src]="'/placeholder.svg'"
          alt="Image"
          [sx]="styles.signupPageImg"
        />
      </div>
    </div>
  `,
})
export default class Signup02 {
  protected readonly styles = styles
}
