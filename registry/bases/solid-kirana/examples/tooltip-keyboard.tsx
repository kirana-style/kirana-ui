import { IconPlaceholder } from "../ui/icon-placeholder"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { page } from "../../../styles/page.styles"

export default function TooltipKeyboard() {
  return (
    <div sx={page.example}>
      <Tooltip>
        <TooltipTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline" size="icon-sm">
              <IconPlaceholder
                lucide="SaveIcon"
                tabler="IconDeviceFloppy"
                hugeicons="FloppyDiskIcon"
                phosphor="FloppyDiskIcon"
                remixicon="RiSaveLine"
              />
            </Button>
          )}
        />
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
