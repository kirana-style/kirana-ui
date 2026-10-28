import { css } from "@kirana-style/core"

import { Spinner } from "../ui/spinner"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexItemsCenterGap6: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[6] },
  }),
  size3: css({
    width: { "*": null, base: space[3] },
    height: { "*": null, base: space[3] },
  }),
  size4: css({
    width: { "*": null, base: space[4] },
    height: { "*": null, base: space[4] },
  }),
  size6: css({
    width: { "*": null, base: space[6] },
    height: { "*": null, base: space[6] },
  }),
  more: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
}

export default function SpinnerSize() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexItemsCenterGap6}>
        <Spinner sx={styles.size3} />
        <Spinner sx={styles.size4} />
        <Spinner sx={styles.size6} />
        <Spinner sx={styles.more} />
      </div>
    </div>
  )
}
