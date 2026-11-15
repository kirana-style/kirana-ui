import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { page } from "../../../styles/page.styles"

const styles = {
  hFit: css({ height: "fit-content" }),
}

export default function ButtonGroupOrientation() {
  return (
    <div sx={page.example}>
      <ButtonGroup
        orientation="vertical"
        aria-label="Media controls"
        sx={styles.hFit}
      >
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </Button>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="MinusIcon"
            tabler="IconMinus"
            hugeicons="MinusSignIcon"
            phosphor="MinusIcon"
            remixicon="RiSubtractLine"
          />
        </Button>
      </ButtonGroup>
    </div>
  )
}
