import { Skeleton } from "../ui/skeleton"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function SkeletonForm() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          <Skeleton sx={styles.skeleton} />
          <Skeleton sx={styles.skeleton2} />
        </div>
        <div sx={styles.div3}>
          <Skeleton sx={styles.skeleton3} />
          <Skeleton sx={styles.skeleton4} />
        </div>
        <Skeleton sx={styles.skeleton5} />
      </div>
    </div>
  )
}
