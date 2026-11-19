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
    gap: space[7],
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  skeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[20] },
  }),
  skeleton2: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: "100%" },
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  skeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[24] },
  }),
  skeleton4: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: "100%" },
  }),
  skeleton5: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[24] },
  }),
}

@Component({
  selector: "skeleton-form",
  imports: [Skeleton, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div [sx]="styles.div2">
          <div kuiSkeleton [sx]="styles.skeleton"></div>
          <div kuiSkeleton [sx]="styles.skeleton2"></div>
        </div>
        <div [sx]="styles.div3">
          <div kuiSkeleton [sx]="styles.skeleton3"></div>
          <div kuiSkeleton [sx]="styles.skeleton4"></div>
        </div>
        <div kuiSkeleton [sx]="styles.skeleton5"></div>
      </div>
    </div>
  `,
})
export default class SkeletonForm {
  protected readonly styles = styles
  protected readonly page = page
}
