import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Popover, PopoverTrigger } from "../ui/popover"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
  w40: css({ width: { "*": null, base: space[40] } }),
}

export default function PopoverAlignments() {
  return (
    <div sx={page.example}>
      <>
        <div sx={styles.flexGap6}>
          <PopoverTrigger>
            <Button variant="outline" size="sm">
              Start
            </Button>
            <Popover placement="bottom start" sx={styles.w40}>
              Aligned to start
            </Popover>
          </PopoverTrigger>
          <PopoverTrigger>
            <Button variant="outline" size="sm">
              Center
            </Button>
            <Popover placement="bottom" sx={styles.w40}>
              Aligned to center
            </Popover>
          </PopoverTrigger>
          <PopoverTrigger>
            <Button variant="outline" size="sm">
              End
            </Button>
            <Popover placement="bottom end" sx={styles.w40}>
              Aligned to end
            </Popover>
          </PopoverTrigger>
        </div>
      </>
    </div>
  )
}
