import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Skeleton } from "../ui/skeleton"

const styles = {
  div: css({
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    gap: space[4],
  }),
  skeleton: css({
    width: { "*": null, base: space[10] },
    height: { "*": null, base: space[10] },
    flexShrink: { "*": null, base: "0" },
    borderRadius: { "*": null, base: radius.full },
  }),
  div2: css({
    display: "grid",
    gap: space[2],
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "150px" },
  }),
  skeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100px" },
  }),
}

@Component({
  selector: "skeleton-avatar",
  imports: [Skeleton, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiSkeleton [sx]="styles.skeleton"></div>
        <div [sx]="styles.div2">
          <div kuiSkeleton [sx]="styles.skeleton2"></div>
          <div kuiSkeleton [sx]="styles.skeleton3"></div>
        </div>
      </div>
    </div>
  `,
})
export default class SkeletonAvatar {
  protected readonly styles = styles
  protected readonly page = page
}
