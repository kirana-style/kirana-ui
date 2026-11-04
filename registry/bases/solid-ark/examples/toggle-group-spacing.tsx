import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { page } from "../../../styles/page.styles"

export default function ToggleGroupSpacing() {
  return (
    <div sx={page.example}>
      <ToggleGroup
        size="sm"
        defaultValue={["top"]}
        variant="outline"
        spacing={2}
      >
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
