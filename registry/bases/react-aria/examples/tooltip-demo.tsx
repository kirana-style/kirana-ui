import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"

export default function TooltipDemo() {
  return (
    <div sx={page.example}>
      <TooltipTrigger>
        <Button variant="outline">Hover</Button>
        <Tooltip>
          <p>Add to library</p>
        </Tooltip>
      </TooltipTrigger>
    </div>
  )
}
