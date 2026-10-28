import { Button } from "../ui/button"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { page } from "../../../styles/page.styles"

export default function PopoverBasic() {
  return (
    <div sx={page.example}>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
        <Popover placement="bottom start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </Popover>
      </PopoverTrigger>
    </div>
  )
}
