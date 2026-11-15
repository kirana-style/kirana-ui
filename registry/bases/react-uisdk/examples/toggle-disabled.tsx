import { css } from "@kirana-style/core"

import { Toggle } from "../ui/toggle"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapItemsCenterG: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { "*": null, base: space[2] },
  }),
}

export default function ToggleDisabled() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapItemsCenterG}>
        <Toggle aria-label="Toggle disabled" disabled>
          Disabled
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
          Disabled
        </Toggle>
      </div>
    </div>
  )
}
