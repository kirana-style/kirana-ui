import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { NavigationMenuLink } from "../../ui/navigation-menu"

const styles = {
  listItemDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  listItemDiv2: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  listItemDiv3: css({
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "kui-list-item",
  imports: [NavigationMenuLink, SxDirective],
  host: { style: "display: contents" },
  template: `
    <li>
      <a kuiNavigationMenuLink [attr.href]="href()">
        <div [sx]="styles.listItemDiv">
          <div [sx]="styles.listItemDiv2">{{ title() }}</div>
          <div [sx]="styles.listItemDiv3">
            <ng-content />
          </div>
        </div>
      </a>
    </li>
  `,
})
export class ListItem {
  readonly title = input.required<string>()
  readonly href = input.required<string>()
  protected readonly styles = styles
}
