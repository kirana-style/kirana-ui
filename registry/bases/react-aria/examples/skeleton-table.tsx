import { Skeleton } from "../ui/skeleton"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function SkeletonTable() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div sx={styles.div2} key={index}>
            <Skeleton sx={styles.skeleton} />
            <Skeleton sx={styles.skeleton2} />
            <Skeleton sx={styles.skeleton3} />
          </div>
        ))}
      </div>
    </div>
  )
}
