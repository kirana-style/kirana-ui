import { For } from "solid-js"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function TooltipSides() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For each={["left", "top", "bottom", "right"] as const}>
          {(side) => (
            <Tooltip>
              <TooltipTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline" sx={styles.button}>
                    {side}
                  </Button>
                )}
              />
              <TooltipContent side={side}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          )}
        </For>
      </div>
    </div>
  )
}
