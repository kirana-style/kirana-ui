import { css } from "@kirana-style/core"
import { Marker, MarkerContent } from "../ui/marker"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function MarkerSeparator() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker variant="separator">
          <MarkerContent>Today</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>Worked for 42s</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>Conversation compacted</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
