import { css } from "@kirana-style/core"

import { Kbd, KbdGroup } from "../ui/kbd"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexColItemsCenterGa: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

export default function KbdGroupExample() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexColItemsCenterGa}>
        <p sx={styles.textSmTextMutedForegroun}>
          Use{" "}
          <KbdGroup>
            <Kbd>Ctrl + B</Kbd>
            <Kbd>Ctrl + K</Kbd>
          </KbdGroup>{" "}
          to open the command palette
        </p>
      </div>
    </div>
  )
}
