import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { NavigationMenuLink } from "../../ui/navigation-menu"

const styles = {
  listItem: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  title: css({ lineHeight: "1", fontWeight: fontWeight.medium }),
  description: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
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
        <div [sx]="styles.listItem">
          <div [sx]="styles.title">{{ title() }}</div>
          <div [sx]="styles.description">
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
