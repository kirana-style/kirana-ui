import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  span: css({
    display: "inline-block",
    width: "fit-content",
  }),
}

export default function TooltipDisabled() {
  return (
    <div sx={page.example}>
      <>
        <TooltipTrigger>
          <span sx={styles.span}>
            <Button variant="outline" isDisabled>
              Disabled
            </Button>
          </span>
          <Tooltip>
            <p>This feature is currently unavailable</p>
          </Tooltip>
        </TooltipTrigger>
      </>
    </div>
  )
}
