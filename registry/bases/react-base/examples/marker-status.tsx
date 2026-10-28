import { css } from "@kirana-style/core"

import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Spinner } from "../ui/spinner"
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

export default function MarkerStatusDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent>Compacting conversation</MarkerContent>
        </Marker>
        <Marker variant="separator" role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent>Running tests</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
