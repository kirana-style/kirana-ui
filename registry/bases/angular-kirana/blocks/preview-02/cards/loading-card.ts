import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { Card, CardContent, CardHeader } from "../../../ui/card"
import { Skeleton } from "../../../ui/skeleton"

const styles = {
  skeleton: css({
    height: { "*": null, base: space[5] },
    width: { "*": null, base: space[32] },
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[48] },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  skeleton3: css({
    height: { "*": null, base: space[32] },
    width: { "*": null, base: "100%" },
    borderRadius: { "*": null, base: radius.lg },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  skeleton4: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100%" },
  }),
  skeleton5: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(3/4 * 100%)" },
  }),
  skeleton6: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(1/2 * 100%)" },
  }),
  div2: css({
    display: "flex",
    gap: space[2],
  }),
  skeleton7: css({
    height: { "*": null, base: space[9] },
    flex: "1 1 0%",
    borderRadius: { "*": null, base: radius.md },
  }),
  skeleton8: css({
    height: { "*": null, base: space[9] },
    flex: "1 1 0%",
    borderRadius: { "*": null, base: radius.md },
  }),
}

@Component({
  selector: "kui-loading-card",
  imports: [Card, CardContent, CardHeader, Skeleton, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiSkeleton [sx]="styles.skeleton"></div>
        <div kuiSkeleton [sx]="styles.skeleton2"></div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div kuiSkeleton [sx]="styles.skeleton3"></div>
        <div [sx]="styles.div">
          <div kuiSkeleton [sx]="styles.skeleton4"></div>
          <div kuiSkeleton [sx]="styles.skeleton5"></div>
          <div kuiSkeleton [sx]="styles.skeleton6"></div>
        </div>
        <div [sx]="styles.div2">
          <div kuiSkeleton [sx]="styles.skeleton7"></div>
          <div kuiSkeleton [sx]="styles.skeleton8"></div>
        </div>
      </div>
    </div>
  `,
})
export class LoadingCard {
  protected readonly styles = styles
}
