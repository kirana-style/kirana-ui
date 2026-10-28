import { css } from "@kirana-style/core"

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
}

export default function ToggleGroupSizes() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexColGap4}>
        <ToggleGroup size="sm" defaultSelectedKeys={["top"]} variant="outline">
          <ToggleGroupItem id="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem id="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem id="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem id="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultSelectedKeys={["top"]} variant="outline">
          <ToggleGroupItem id="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem id="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem id="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem id="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
