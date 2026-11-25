import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"
import { Marquee, MarqueeItem } from "../ui/marquee"

const styles = {
  marquee: css({ width: "100%", maxWidth: containerSize.lg }),
}

const CUSTOMERS = [
  "Northwind",
  "Fieldstone",
  "Kestrel",
  "Orbit Labs",
  "Quill",
  "Tidewater",
  "Brightline",
  "Harbor & Co",
]

@Component({
  selector: "marquee-fade",
  imports: [Badge, Marquee, MarqueeItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiMarquee fade [sx]="styles.marquee">
        <ng-template>
          @for (name of customers; track name) {
            <div kuiMarqueeItem>
              <span kuiBadge variant="secondary">{{ name }}</span>
            </div>
          }
        </ng-template>
      </div>
    </div>
  `,
})
export default class MarqueeFade {
  protected readonly customers = CUSTOMERS
  protected readonly styles = styles
  protected readonly page = page
}
