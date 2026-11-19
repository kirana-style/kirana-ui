import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export default function TooltipDemo() {
  return (
    <div sx={page.example}>
      <Tooltip>
        <TooltipTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Hover
            </Button>
          )}
        />
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
