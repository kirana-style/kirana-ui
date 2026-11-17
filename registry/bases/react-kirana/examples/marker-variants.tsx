import { css } from "@kirana-style/core"

import { Marker, MarkerContent } from "../ui/marker"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

export default function MarkerVariantsDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker>
          <MarkerContent>A default marker for inline notes.</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>A separator marker</MarkerContent>
        </Marker>
        <Marker variant="border">
          <MarkerContent>A border marker for row boundaries.</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
