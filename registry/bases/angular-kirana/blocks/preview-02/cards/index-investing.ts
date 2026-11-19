import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontSize, leading, space } from "../../../../../core/scales"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  cardDescription: css({
    marginTop: { "*": null, base: space[3], [axes.style.sera]: space["0"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: leading.relaxed },
  }),
  a: css({
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
    color: { ":hover": theme.primary },
  }),
}

@Component({
  selector: "kui-index-investing",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Dollar-Cost Averaging</div>
        <div kuiCardDescription>A strategy for building wealth over time.</div>
      </div>
      <div kuiCardContent>
        <div kuiCardDescription [sx]="styles.cardDescription">
          <a href="#" [sx]="styles.a">Over time</a>
          , this smooths out the average cost of your investments. When prices
          drop, your fixed amount buys more shares. When prices rise, you buy
          fewer. The result is a lower average cost per share compared to
          lump-sum investing during volatile periods.
        </div>
      </div>
    </div>
  `,
})
export class IndexInvesting {
  protected readonly styles = styles
}
