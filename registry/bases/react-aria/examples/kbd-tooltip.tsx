import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapGap4: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[4] },
  }),
}

export default function KbdTooltip() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapGap4}>
        <ButtonGroup>
          <TooltipTrigger>
            <Button variant="outline">Save</Button>
            <Tooltip>
              Save Changes <Kbd>S</Kbd>
            </Tooltip>
          </TooltipTrigger>
          <TooltipTrigger>
            <Button variant="outline">Print</Button>
            <Tooltip>
              Print Document{" "}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </Tooltip>
          </TooltipTrigger>
        </ButtonGroup>
      </div>
    </div>
  )
}
