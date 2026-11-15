import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  p: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
}

export default function TypographyP() {
  return (
    <div sx={page.example}>
      <p sx={styles.p}>
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </p>
    </div>
  )
}
