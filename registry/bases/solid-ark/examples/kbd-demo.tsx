import { css } from "@kirana-style/core"
import { Kbd, KbdGroup } from "../ui/kbd"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function KbdDemo() {
  const styles = {
    flexFlexColItemsCenterGa: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: { "*": null, base: space[4] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexColItemsCenterGa}>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>B</Kbd>
        </KbdGroup>
      </div>
    </div>
  )
}
