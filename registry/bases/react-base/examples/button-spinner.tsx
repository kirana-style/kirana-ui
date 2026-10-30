import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  buttonLoadingDiv: css({
    display: "flex",
    gap: space[2],
  }),
}

export default function ButtonLoading() {
  return (
    <div sx={page.example}>
      <div sx={styles.buttonLoadingDiv}>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" />
          Generating
        </Button>
        <Button variant="secondary" disabled>
          Downloading
          <Spinner data-icon="inline-start" />
        </Button>
      </div>
    </div>
  )
}
