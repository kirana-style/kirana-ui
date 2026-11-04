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
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[2],
  }),
  div2: css({
    display: "flex",
    gap: space[4],
  }),
  skeleton: css({
    height: { "*": null, base: space[4] },
    flex: "1 1 0%",
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[24] },
  }),
  skeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[20] },
  }),
}

@Component({
  selector: "skeleton-table",
  imports: [Skeleton, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (_ of rows; track index; let index = $index) {
          <div [sx]="styles.div2">
            <div kuiSkeleton [sx]="styles.skeleton"></div>
            <div kuiSkeleton [sx]="styles.skeleton2"></div>
            <div kuiSkeleton [sx]="styles.skeleton3"></div>
          </div>
        }
      </div>
    </div>
  `,
})
export default class SkeletonTable {
  protected readonly rows = Array.from({ length: 5 })
  protected readonly styles = styles
  protected readonly page = page
}
