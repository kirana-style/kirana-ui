import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Toggle } from "../ui/toggle"
import { page } from "../../../styles/page.styles"

export default function ToggleText() {
  return (
    <div sx={page.example}>
      <Toggle aria-label="Toggle italic">
        <IconPlaceholder
          lucide="ItalicIcon"
          tabler="IconItalic"
          hugeicons="TextItalicIcon"
          phosphor="TextItalicIcon"
          remixicon="RiItalic"
        />
        Italic
      </Toggle>
    </div>
  )
}
