import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexColItemsCenterGa: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
}

export default function SpinnerButton() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexColItemsCenterGa}>
        <Button isDisabled size="sm">
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
        <Button variant="outline" isDisabled size="sm">
          <Spinner data-icon="inline-start" />
          Please wait
        </Button>
        <Button variant="secondary" isDisabled size="sm">
          <Spinner data-icon="inline-start" />
          Processing
        </Button>
      </div>
    </div>
  )
}
