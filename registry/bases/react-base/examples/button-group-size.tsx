import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexColItemsStartGap: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { "*": null, base: space[8] },
  }),
}

export default function ButtonGroupSize() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexColItemsStartGap}>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="sm">
            Button
          </Button>
          <Button variant="outline" size="sm">
            Group
          </Button>
          <Button variant="outline" size="icon-sm">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Default</Button>
          <Button variant="outline">Button</Button>
          <Button variant="outline">Group</Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="lg">
            Large
          </Button>
          <Button variant="outline" size="lg">
            Button
          </Button>
          <Button variant="outline" size="lg">
            Group
          </Button>
          <Button variant="outline" size="icon-lg">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
