import { css, props as styleProps } from "@kirana-style/core"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { page } from "../../../styles/page.styles"

export default function TooltipDisabled() {
  const styles = {
    span: css({
      display: { "*": null, base: "inline-block" },
      width: { "*": null, base: "fit-content" },
    }),
  }

  return (
    <div sx={page.example}>
      <Tooltip>
        <TooltipTrigger
          asChild={(props) => (
            <span {...props()} {...styleProps(props().class, styles.span)}>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </span>
          )}
        />
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
