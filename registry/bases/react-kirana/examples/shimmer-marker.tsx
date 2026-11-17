import { css } from "@kirana-style/core"

import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Spinner } from "../ui/spinner"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"

const styles = {
  // `flex w-full max-w-sm flex-col gap-4`
  stack: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
  }),
}

export default function ShimmerMarker() {
  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent sx={shimmer}>Thinking...</MarkerContent>
        </Marker>
        <Marker variant="separator" role="status">
          <MarkerContent sx={shimmer}>Reading 4 files</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
