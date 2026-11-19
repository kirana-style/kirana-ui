import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function SpinnerButton() {
  const styles = {
    flexFlexColItemsCenterGa: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: { "*": null, base: space[4] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexColItemsCenterGa}>
        <Button disabled size="sm">
          <Spinner data-icon="inline-start" /> Loading...
        </Button>
        <Button variant="outline" disabled size="sm">
          <Spinner data-icon="inline-start" /> Please wait
        </Button>
        <Button variant="secondary" disabled size="sm">
          <Spinner data-icon="inline-start" /> Processing
        </Button>
      </div>
    </div>
  )
}
