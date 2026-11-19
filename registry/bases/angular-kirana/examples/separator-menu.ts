import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Separator } from "../ui/separator"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    gap: { base: space[2], [breakpoint.md]: space[4] },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  span3: css({
    fontWeight: fontWeight.medium,
  }),
  span4: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  separator: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  div4: css({
    display: { base: "none", [breakpoint.md]: "flex" },
    flexDirection: "column",
    gap: space[1],
  }),
  span5: css({
    fontWeight: fontWeight.medium,
  }),
  span6: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "separator-menu",
  imports: [Separator, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div [sx]="styles.div2">
          <span [sx]="styles.span">Settings</span>
          <span [sx]="styles.span2">Manage preferences</span>
        </div>
        <div kuiSeparator orientation="vertical"></div>
        <div [sx]="styles.div3">
          <span [sx]="styles.span3">Account</span>
          <span [sx]="styles.span4">Profile & security</span>
        </div>
        <div kuiSeparator orientation="vertical" [sx]="styles.separator"></div>
        <div [sx]="styles.div4">
          <span [sx]="styles.span5">Help</span>
          <span [sx]="styles.span6">Support & docs</span>
        </div>
      </div>
    </div>
  `,
})
export default class SeparatorMenu {
  protected readonly styles = styles
  protected readonly page = page
}
