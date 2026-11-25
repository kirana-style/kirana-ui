import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Marquee, MarqueeItem } from "../ui/marquee"

const styles = {
  marquee: css({
    width: "100%",
    maxWidth: containerSize.xs,
    height: space[80],
  }),
  item: css({ width: "100%" }),
}

const RELEASES = [
  { version: "v2.4.0", note: "Dark mode for every chart." },
  { version: "v2.3.2", note: "Faster search across projects." },
  { version: "v2.3.0", note: "Comments on any file." },
  { version: "v2.2.1", note: "Keyboard shortcuts for the editor." },
  { version: "v2.2.0", note: "Export a report as a PDF." },
]

@Component({
  selector: "marquee-vertical",
  imports: [
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Marquee,
    MarqueeItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiMarquee direction="up" speed="20s" fade [sx]="styles.marquee">
        <ng-template>
          @for (release of releases; track release.version) {
            <div kuiMarqueeItem [sx]="styles.item">
              <div kuiCard size="sm">
                <div kuiCardHeader>
                  <div kuiCardTitle>{{ release.version }}</div>
                  <div kuiCardDescription>{{ release.note }}</div>
                </div>
              </div>
            </div>
          }
        </ng-template>
      </div>
    </div>
  `,
})
export default class MarqueeVertical {
  protected readonly releases = RELEASES
  protected readonly styles = styles
  protected readonly page = page
}
