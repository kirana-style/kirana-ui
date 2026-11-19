import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Toggle } from "../ui/toggle"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function ToggleOutline() {
  const styles = {
    flexFlexWrapItemsCenterG: css({
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: { "*": null, base: space[2] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapItemsCenterG}>
        <Toggle variant="outline" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />{" "}
          Italic
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />{" "}
          Bold
        </Toggle>
      </div>
    </div>
  )
}
