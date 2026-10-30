import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  button: css({
    width: { "*": null, base: "fit-content" },
    textTransform: { "*": null, base: "capitalize" },
  }),
}

export default function TooltipSides() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {(["left", "top", "bottom", "right"] as const).map((side) => (
          <TooltipTrigger key={side}>
            <Button variant="outline" sx={styles.button}>
              {side}
            </Button>
            <Tooltip placement={side}>
              <p>Add to library</p>
            </Tooltip>
          </TooltipTrigger>
        ))}
      </div>
    </div>
  )
}
