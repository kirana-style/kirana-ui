import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  skeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(2/3 * 100%)" },
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(1/2 * 100%)" },
  }),
  skeleton3: css({
    aspectRatio: { "*": null, base: "16 / 9" },
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "skeleton-card",
  imports: [Card, CardContent, CardHeader, Skeleton, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.card">
        <div kuiCardHeader>
          <div kuiSkeleton [sx]="styles.skeleton"></div>
          <div kuiSkeleton [sx]="styles.skeleton2"></div>
        </div>
        <div kuiCardContent>
          <div kuiSkeleton [sx]="styles.skeleton3"></div>
        </div>
      </div>
    </div>
  `,
})
export default class SkeletonCard {
  protected readonly styles = styles
  protected readonly page = page
}
