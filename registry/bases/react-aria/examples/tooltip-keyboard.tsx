import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { page } from "../../../styles/page.styles"

export default function TooltipKeyboard() {
  return (
    <div sx={page.example}>
      <TooltipTrigger>
        <Button variant="outline" size="icon-sm">
          <IconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSaveLine"
          />
        </Button>
        <Tooltip>
          Save Changes <Kbd>S</Kbd>
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
