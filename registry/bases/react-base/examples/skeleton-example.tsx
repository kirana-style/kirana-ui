import { Example, ExampleWrapper } from "../components/example"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"

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

export default function SkeletonExample() {
  return (
    <ExampleWrapper>
      <SkeletonAvatar />
      <SkeletonCard />
      <SkeletonText />
      <SkeletonForm />
      <SkeletonTable />
    </ExampleWrapper>
  )
}

function SkeletonAvatar() {
  return (
    <Example title="Avatar">
      <div sx={styles.skeletonAvatarDiv}>
        <Skeleton sx={styles.skeletonAvatarSkeleton} />
        <div sx={styles.skeletonAvatarDiv2}>
          <Skeleton sx={styles.skeletonAvatarSkeleton2} />
          <Skeleton sx={styles.skeletonAvatarSkeleton3} />
        </div>
      </div>
    </Example>
  )
}

function SkeletonCard() {
  return (
    <Example title="Card">
      <Card sx={styles.skeletonCardCard}>
        <CardHeader>
          <Skeleton sx={styles.skeletonCardSkeleton} />
          <Skeleton sx={styles.skeletonCardSkeleton2} />
        </CardHeader>
        <CardContent>
          <Skeleton sx={styles.skeletonCardSkeleton3} />
        </CardContent>
      </Card>
    </Example>
  )
}

function SkeletonText() {
  return (
    <Example title="Text">
      <div sx={styles.skeletonTextDiv}>
        <Skeleton sx={styles.skeletonTextSkeleton} />
        <Skeleton sx={styles.skeletonTextSkeleton2} />
        <Skeleton sx={styles.skeletonTextSkeleton3} />
      </div>
    </Example>
  )
}

function SkeletonForm() {
  return (
    <Example title="Form">
      <div sx={styles.skeletonFormDiv}>
        <div sx={styles.skeletonFormDiv2}>
          <Skeleton sx={styles.skeletonFormSkeleton} />
          <Skeleton sx={styles.skeletonFormSkeleton2} />
        </div>
        <div sx={styles.skeletonFormDiv3}>
          <Skeleton sx={styles.skeletonFormSkeleton3} />
          <Skeleton sx={styles.skeletonFormSkeleton4} />
        </div>
        <Skeleton sx={styles.skeletonFormSkeleton5} />
      </div>
    </Example>
  )
}

function SkeletonTable() {
  return (
    <Example title="Table">
      <div sx={styles.skeletonTableDiv}>
        <div sx={styles.skeletonTableDiv2}>
          <Skeleton sx={styles.skeletonTableSkeleton} />
          <Skeleton sx={styles.skeletonTableSkeleton2} />
          <Skeleton sx={styles.skeletonTableSkeleton3} />
        </div>
        <div sx={styles.skeletonTableDiv3}>
          <Skeleton sx={styles.skeletonTableSkeleton4} />
          <Skeleton sx={styles.skeletonTableSkeleton5} />
          <Skeleton sx={styles.skeletonTableSkeleton6} />
        </div>
        <div sx={styles.skeletonTableDiv4}>
          <Skeleton sx={styles.skeletonTableSkeleton7} />
          <Skeleton sx={styles.skeletonTableSkeleton8} />
          <Skeleton sx={styles.skeletonTableSkeleton9} />
        </div>
      </div>
    </Example>
  )
}
