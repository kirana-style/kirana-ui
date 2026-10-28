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

const styles = {
  fit: css({ width: "fit-content" }),
}

export default function PopoverBasic() {
  return (
    <div sx={page.example}>
      <>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" sx={styles.fit} />}>
            Open Popover
          </PopoverTrigger>
          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </>
    </div>
  )
}
