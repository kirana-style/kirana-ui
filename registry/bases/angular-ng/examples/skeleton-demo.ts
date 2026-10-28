import { Component } from "@angular/core"
import { css, props } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Skeleton } from "../ui/skeleton"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[4] }),
  lines: css({ display: "flex", flexDirection: "column", gap: space[2] }),
  avatar: css({
    width: space[12],
    height: space[12],
    borderRadius: radius.full,
  }),
  wide: css({ height: space[4], width: "250px" }),
  narrow: css({ height: space[4], width: "200px" }),
}

@Component({
  selector: "skeleton-demo",
  imports: [Skeleton],
  template: `
    <div [class]="example">
      <div [class]="row">
        <div kuiSkeleton [sx]="styles.avatar"></div>
        <div [class]="lines">
          <div kuiSkeleton [sx]="styles.wide"></div>
          <div kuiSkeleton [sx]="styles.narrow"></div>
        </div>
      </div>
    </div>
  `,
})
export default class SkeletonDemo {
  protected readonly styles = styles
  protected readonly example = props(page.example).className
  protected readonly row = props(styles.row).className
  protected readonly lines = props(styles.lines).className
}
