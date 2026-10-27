/** Upstream's `preview` block's loading card: Skeleton in the shapes of a profile. */
import { css } from "@kirana-style/core"

import { Skeleton } from "@workspace/registry/bases/react-base/ui/skeleton"
import { shared } from "./shared"
import { space } from "@workspace/registry/core/scales"
import { radius } from "@workspace/registry/core/tokens"
import { Card, CardContent } from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
  avatar: css({
    width: space[10],
    height: space[10],
    borderRadius: radius.full,
  }),
  lines: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[2],
  }),
  lineLg: css({ height: space[4], width: "75%" }),
  lineMd: css({ height: space[3], width: "50%" }),
  line: css({ height: space[3], width: "100%" }),
  lineShort: css({ height: space[3], width: "80%" }),
  block: css({ height: space[8], width: space[20] }),
  buttons: css({ display: "flex", gap: space[2] }),
}

export function SkeletonLoading() {
  return (
    <Card>
      <CardContent sx={shared.stack}>
        <div sx={styles.row}>
          <Skeleton sx={styles.avatar} />
          <div sx={styles.lines}>
            <Skeleton sx={styles.lineLg} />
            <Skeleton sx={styles.lineMd} />
          </div>
        </div>
        <div sx={styles.lines}>
          <Skeleton sx={styles.line} />
          <Skeleton sx={styles.line} />
          <Skeleton sx={styles.lineShort} />
        </div>
        <div sx={styles.buttons}>
          <Skeleton sx={styles.block} />
          <Skeleton sx={styles.block} />
        </div>
      </CardContent>
    </Card>
  )
}
