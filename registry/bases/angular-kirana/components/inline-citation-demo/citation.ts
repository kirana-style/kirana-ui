import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import { Button } from "../../ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card"

const styles = {
  citationHoverCardContent: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
  }),
  citationDiv: css({
    fontWeight: fontWeight.medium,
  }),
  citationP: css({
    color: theme.mutedForeground,
  }),
  citationA: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  citationSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
}

type Source = {
  url: string
  title: string
  description: string
}

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "")
}

@Component({
  selector: "kui-citation",
  imports: [Button, HoverCard, HoverCardContent, HoverCardTrigger, SxDirective],
  host: { style: "display: contents" },
  template: `
    <ng-container kuiHoverCard>
      <button
        kuiButton
        kuiHoverCardTrigger
        [delay]="10"
        [closeDelay]="100"
        variant="secondary"
        size="xs"
      >
        {{ host() }}
      </button>
      <div kuiHoverCardContent [sx]="styles.citationHoverCardContent">
        <div [sx]="styles.citationDiv">{{ source().title }}</div>
        <p [sx]="styles.citationP">{{ source().description }}</p>
        <a
          [attr.href]="source().url"
          target="_blank"
          rel="noreferrer"
          [sx]="styles.citationA"
        >
          {{ host() }}
          <span [sx]="styles.citationSpan">(opens in a new tab)</span>
        </a>
      </div>
    </ng-container>
  `,
})
export class Citation {
  readonly source = input.required<Source>()
  protected readonly host = computed(() => hostname(this.source().url))
  protected readonly styles = styles
}
