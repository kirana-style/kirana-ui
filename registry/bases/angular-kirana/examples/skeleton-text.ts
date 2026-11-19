import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Skeleton } from "../ui/skeleton"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: space[2],
  }),
  skeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100%" },
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100%" },
  }),
  skeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(3/4 * 100%)" },
  }),
}

@Component({
  selector: "skeleton-text",
  imports: [Skeleton, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiSkeleton [sx]="styles.skeleton"></div>
        <div kuiSkeleton [sx]="styles.skeleton2"></div>
        <div kuiSkeleton [sx]="styles.skeleton3"></div>
      </div>
    </div>
  `,
})
export default class SkeletonText {
  protected readonly styles = styles
  protected readonly page = page
}
