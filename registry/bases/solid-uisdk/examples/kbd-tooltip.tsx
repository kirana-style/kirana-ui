import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function KbdTooltip() {
  const styles = {
    flexFlexWrapGap4: css({
      display: "flex",
      flexWrap: "wrap",
      gap: { "*": null, base: space[4] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapGap4}>
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Save
                </Button>
              )}
            />
            <TooltipContent>
              Save Changes <Kbd>S</Kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Print
                </Button>
              )}
            />
            <TooltipContent>
              Print Document{" "}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </div>
    </div>
  )
}
