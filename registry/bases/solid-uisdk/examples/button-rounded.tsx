import { IconPlaceholder } from "../ui/icon-placeholder"
import { Button } from "../ui/button"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function ButtonRounded() {
  const styles = {
    div: css({
      display: "flex",
      gap: space[2],
    }),
    button: css({
      borderRadius: { "*": null, base: radius.full },
    }),
    button2: css({
      borderRadius: { "*": null, base: radius.full },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Button sx={styles.button}>Get Started</Button>
        <Button variant="outline" size="icon" sx={styles.button2}>
          <IconPlaceholder
            lucide="ArrowUpIcon"
            tabler="IconArrowUp"
            hugeicons="ArrowUp02Icon"
            phosphor="ArrowUpIcon"
            remixicon="RiArrowUpLine"
          />
        </Button>
      </div>
    </div>
  )
}
