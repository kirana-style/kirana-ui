import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function PopoverAlignments() {
  const styles = {
    flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
    w40: css({ width: { "*": null, base: space[40] } }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexGap6}>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" size="sm">
                Start
              </Button>
            )}
          />
          <PopoverContent align="start" sx={styles.w40}>
            Aligned to start
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" size="sm">
                Center
              </Button>
            )}
          />
          <PopoverContent align="center" sx={styles.w40}>
            Aligned to center
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" size="sm">
                End
              </Button>
            )}
          />
          <PopoverContent align="end" sx={styles.w40}>
            Aligned to end
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
