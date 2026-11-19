import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { page } from "../../../styles/page.styles"

export default function PopoverBasic() {
  const styles = {
    fit: css({ width: "fit-content" }),
  }

  return (
    <div sx={page.example}>
      <Popover>
        <PopoverTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline" sx={styles.fit}>
              Open Popover
            </Button>
          )}
        />
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
