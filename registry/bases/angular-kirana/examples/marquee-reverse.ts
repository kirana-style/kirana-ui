import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"
import { Marquee, MarqueeItem } from "../ui/marquee"

const styles = {
  rows: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    width: "100%",
    maxWidth: containerSize.lg,
  }),
}

const FIRST = ["Design", "Engineering", "Research", "Marketing", "Sales"]
const SECOND = ["Support", "Finance", "Legal", "Operations", "People"]

@Component({
  selector: "marquee-reverse",
  imports: [Badge, Marquee, MarqueeItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.rows">
        <div kuiMarquee speed="30s" fade>
          <ng-template>
            @for (team of first; track team) {
              <div kuiMarqueeItem>
                <span kuiBadge variant="outline">{{ team }}</span>
              </div>
            }
          </ng-template>
        </div>
        <div kuiMarquee speed="30s" fade reverse>
          <ng-template>
            @for (team of second; track team) {
              <div kuiMarqueeItem>
                <span kuiBadge variant="outline">{{ team }}</span>
              </div>
            }
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export default class MarqueeReverse {
  protected readonly first = FIRST
  protected readonly second = SECOND
  protected readonly styles = styles
  protected readonly page = page
}
