import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    flexDirection: { base: "column", [breakpoint.sm]: "row" },
    alignItems: "flex-start",
    gap: space[8],
  }),
  div2: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
  div4: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
  div5: css({
    display: "flex",
    alignItems: "flex-start",
    gap: space[2],
  }),
}

export default function ButtonSize() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          <Button size="xs" variant="outline">
            Extra Small
          </Button>
          <Button size="icon-xs" aria-label="Submit" variant="outline">
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </Button>
        </div>
        <div sx={styles.div3}>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button size="icon-sm" aria-label="Submit" variant="outline">
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </Button>
        </div>
        <div sx={styles.div4}>
          <Button variant="outline">Default</Button>
          <Button size="icon" aria-label="Submit" variant="outline">
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </Button>
        </div>
        <div sx={styles.div5}>
          <Button variant="outline" size="lg">
            Large
          </Button>
          <Button size="icon-lg" aria-label="Submit" variant="outline">
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
