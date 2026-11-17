import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  skeleton: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(2/3 * 100%)" },
  }),
  skeleton2: css({
    height: { "*": null, base: space[4] },
    width: { "*": null, base: "calc(1/2 * 100%)" },
  }),
  skeleton3: css({
    aspectRatio: { "*": null, base: "16 / 9" },
    width: { "*": null, base: "100%" },
  }),
}

export default function SkeletonCard() {
  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <CardHeader>
          <Skeleton sx={styles.skeleton} />
          <Skeleton sx={styles.skeleton2} />
        </CardHeader>
        <CardContent>
          <Skeleton sx={styles.skeleton3} />
        </CardContent>
      </Card>
    </div>
  )
}
