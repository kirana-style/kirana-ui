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

export default function SkeletonText() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Skeleton sx={styles.skeleton} />
        <Skeleton sx={styles.skeleton2} />
        <Skeleton sx={styles.skeleton3} />
      </div>
    </div>
  )
}
