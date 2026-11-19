import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { Card, CardContent } from "../../../ui/card"
import { Skeleton } from "../../../ui/skeleton"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
  }),
  skeleton: css({
    width: { "*": null, base: space[10] },
    height: { "*": null, base: space[10] },
    borderRadius: { "*": null, base: radius.full },
  }),
  div2: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[2],
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(3/4 * 100%)" },
  }),
  skeleton3: css({
    height: { "*": null, base: space[3] },
    width: { "*": null, base: "calc(1/2 * 100%)" },
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  skeleton4: css({
    height: { "*": null, base: space[3] },
    width: { "*": null, base: "100%" },
  }),
  skeleton5: css({
    height: { "*": null, base: space[3] },
    width: { "*": null, base: "100%" },
  }),
  skeleton6: css({
    height: { "*": null, base: space[3] },
    width: { "*": null, base: "calc(4/5 * 100%)" },
  }),
  div4: css({
    display: "flex",
    gap: space[2],
  }),
  skeleton7: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[20] },
  }),
  skeleton8: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[20] },
  }),
}

@Component({
  selector: "kui-skeleton-loading",
  imports: [Card, CardContent, Skeleton, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          <div kuiSkeleton [sx]="styles.skeleton"></div>
          <div [sx]="styles.div2">
            <div kuiSkeleton [sx]="styles.skeleton2"></div>
            <div kuiSkeleton [sx]="styles.skeleton3"></div>
          </div>
        </div>
        <div [sx]="styles.div3">
          <div kuiSkeleton [sx]="styles.skeleton4"></div>
          <div kuiSkeleton [sx]="styles.skeleton5"></div>
          <div kuiSkeleton [sx]="styles.skeleton6"></div>
        </div>
        <div [sx]="styles.div4">
          <div kuiSkeleton [sx]="styles.skeleton7"></div>
          <div kuiSkeleton [sx]="styles.skeleton8"></div>
        </div>
      </div>
    </div>
  `,
})
export class SkeletonLoading {
  protected readonly styles = styles
}
