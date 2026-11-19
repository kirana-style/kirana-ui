import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const styles = {
  skeletonAvatarDiv: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: space[4],
  }),
  skeletonAvatarSkeleton: css({
    width: { "*": null, base: space[10] },
    height: { "*": null, base: space[10] },
    flexShrink: { "*": null, base: "0" },
    borderRadius: { "*": null, base: "calc(infinity * 1px)" },
  }),
  skeletonAvatarDiv2: css({
    display: "grid",
    gap: space[2],
  }),
  skeletonAvatarSkeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "150px" },
  }),
  skeletonAvatarSkeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100px" },
  }),
  skeletonCardCard: css({
    width: { "*": null, base: "100%" },
  }),
  skeletonCardSkeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(2/3 * 100%)" },
  }),
  skeletonCardSkeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(1/2 * 100%)" },
  }),
  skeletonCardSkeleton3: css({
    aspectRatio: { "*": null, base: "1 / 1" },
    width: { "*": null, base: "100%" },
  }),
  skeletonTextDiv: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: space[2],
  }),
  skeletonTextSkeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100%" },
  }),
  skeletonTextSkeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "100%" },
  }),
  skeletonTextSkeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(3/4 * 100%)" },
  }),
  skeletonFormDiv: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: space[7],
  }),
  skeletonFormDiv2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  skeletonFormSkeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[20] },
  }),
  skeletonFormSkeleton2: css({
    height: { "*": null, base: space[10] },
    width: { "*": null, base: "100%" },
  }),
  skeletonFormDiv3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  skeletonFormSkeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[24] },
  }),
  skeletonFormSkeleton4: css({
    height: { "*": null, base: space[10] },
    width: { "*": null, base: "100%" },
  }),
  skeletonFormSkeleton5: css({
    height: { "*": null, base: space[9] },
    width: { "*": null, base: space[24] },
  }),
  skeletonTableDiv: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: space[2],
  }),
  skeletonTableDiv2: css({
    display: "flex",
    gap: space[4],
  }),
  skeletonTableSkeleton: css({
    height: { "*": null, base: space[4] },
    flex: "1 1 0%",
  }),
  skeletonTableSkeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[24] },
  }),
  skeletonTableSkeleton3: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[20] },
  }),
  skeletonTableDiv3: css({
    display: "flex",
    gap: space[4],
  }),
  skeletonTableSkeleton4: css({
    height: { "*": null, base: space[4] },
    flex: "1 1 0%",
  }),
  skeletonTableSkeleton5: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[24] },
  }),
  skeletonTableSkeleton6: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[20] },
  }),
  skeletonTableDiv4: css({
    display: "flex",
    gap: space[4],
  }),
  skeletonTableSkeleton7: css({
    height: { "*": null, base: space[4] },
    flex: "1 1 0%",
  }),
  skeletonTableSkeleton8: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[24] },
  }),
  skeletonTableSkeleton9: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: space[20] },
  }),
}

@Component({
  selector: "skeleton-example",
  imports: [
    Card,
    CardContent,
    CardHeader,
    Example,
    ExampleWrapper,
    Skeleton,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- SkeletonAvatar -->
      <div kuiExample title="Avatar">
        <div [sx]="styles.skeletonAvatarDiv">
          <div kuiSkeleton [sx]="styles.skeletonAvatarSkeleton"></div>
          <div [sx]="styles.skeletonAvatarDiv2">
            <div kuiSkeleton [sx]="styles.skeletonAvatarSkeleton2"></div>
            <div kuiSkeleton [sx]="styles.skeletonAvatarSkeleton3"></div>
          </div>
        </div>
      </div>
      <!-- SkeletonCard -->
      <div kuiExample title="Card">
        <div kuiCard [sx]="styles.skeletonCardCard">
          <div kuiCardHeader>
            <div kuiSkeleton [sx]="styles.skeletonCardSkeleton"></div>
            <div kuiSkeleton [sx]="styles.skeletonCardSkeleton2"></div>
          </div>
          <div kuiCardContent>
            <div kuiSkeleton [sx]="styles.skeletonCardSkeleton3"></div>
          </div>
        </div>
      </div>
      <!-- SkeletonText -->
      <div kuiExample title="Text">
        <div [sx]="styles.skeletonTextDiv">
          <div kuiSkeleton [sx]="styles.skeletonTextSkeleton"></div>
          <div kuiSkeleton [sx]="styles.skeletonTextSkeleton2"></div>
          <div kuiSkeleton [sx]="styles.skeletonTextSkeleton3"></div>
        </div>
      </div>
      <!-- SkeletonForm -->
      <div kuiExample title="Form">
        <div [sx]="styles.skeletonFormDiv">
          <div [sx]="styles.skeletonFormDiv2">
            <div kuiSkeleton [sx]="styles.skeletonFormSkeleton"></div>
            <div kuiSkeleton [sx]="styles.skeletonFormSkeleton2"></div>
          </div>
          <div [sx]="styles.skeletonFormDiv3">
            <div kuiSkeleton [sx]="styles.skeletonFormSkeleton3"></div>
            <div kuiSkeleton [sx]="styles.skeletonFormSkeleton4"></div>
          </div>
          <div kuiSkeleton [sx]="styles.skeletonFormSkeleton5"></div>
        </div>
      </div>
      <!-- SkeletonTable -->
      <div kuiExample title="Table">
        <div [sx]="styles.skeletonTableDiv">
          <div [sx]="styles.skeletonTableDiv2">
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton"></div>
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton2"></div>
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton3"></div>
          </div>
          <div [sx]="styles.skeletonTableDiv3">
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton4"></div>
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton5"></div>
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton6"></div>
          </div>
          <div [sx]="styles.skeletonTableDiv4">
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton7"></div>
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton8"></div>
            <div kuiSkeleton [sx]="styles.skeletonTableSkeleton9"></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SkeletonExample {
  protected readonly styles = styles
}
