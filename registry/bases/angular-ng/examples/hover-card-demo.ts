import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

const styles = {
  flexW64FlexColGap05: css({
    display: "flex",
    width: { "*": null, base: space[64] },
    flexDirection: "column",
    gap: { "*": null, base: spacing(0.5) },
  }),
  fontSemibold: css({ fontWeight: fontWeight.semibold }),
  mt1TextXsTextMutedForegr: css({
    marginTop: space[1],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "hover-card-demo",
  imports: [Button, HoverCard, HoverCardContent, HoverCardTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <ng-container kuiHoverCard>
        <button
          kuiButton
          kuiHoverCardTrigger
          [delay]="10"
          [closeDelay]="100"
          variant="link"
        >
          Hover Here
        </button>
        <div kuiHoverCardContent [sx]="styles.flexW64FlexColGap05">
          <div [sx]="styles.fontSemibold">{{ "@" }}nextjs</div>
          <div>
            The React Framework – created and maintained by {{ "@" }}vercel.
          </div>
          <div [sx]="styles.mt1TextXsTextMutedForegr">Joined December 2021</div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class HoverCardDemo {
  protected readonly styles = styles
  protected readonly page = page
}
