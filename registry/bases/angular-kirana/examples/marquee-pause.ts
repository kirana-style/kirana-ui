import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Marquee, MarqueeItem } from "../ui/marquee"

const styles = {
  marquee: css({ width: "100%", maxWidth: containerSize["2xl"] }),
  card: css({ width: space[64] }),
  quote: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
}

const REVIEWS = [
  {
    name: "Amara Okafor",
    role: "Product designer",
    quote: "We shipped our new onboarding in a week.",
  },
  {
    name: "Lucas Moreau",
    role: "Engineering lead",
    quote: "The components fit our design system on day one.",
  },
  {
    name: "Mei Tanaka",
    role: "Founder",
    quote: "Our landing page finally looks the way we drew it.",
  },
  {
    name: "Diego Alvarez",
    role: "Frontend developer",
    quote: "Every part is accessible without extra work.",
  },
]

@Component({
  selector: "marquee-pause",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Marquee,
    MarqueeItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMarquee pauseOnHover [sx]="styles.marquee">
        <ng-template>
          @for (review of reviews; track review.name) {
            <div kuiMarqueeItem>
              <div kuiCard size="sm" [sx]="styles.card">
                <div kuiCardHeader>
                  <div kuiCardTitle>{{ review.name }}</div>
                  <div kuiCardDescription>{{ review.role }}</div>
                </div>
                <div kuiCardContent>
                  <p [sx]="styles.quote">{{ review.quote }}</p>
                </div>
              </div>
            </div>
          }
        </ng-template>
      </div>
    </div>
  `,
})
export default class MarqueePause {
  protected readonly reviews = REVIEWS
  protected readonly styles = styles
  protected readonly page = page
}
