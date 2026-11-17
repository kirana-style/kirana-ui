import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWLgFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
}

export default function ItemIcon() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWLgFlexColGa}>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="ShieldAlertIcon"
              tabler="IconShieldExclamation"
              hugeicons="ShieldIcon"
              phosphor="ShieldWarningIcon"
              remixicon="RiShieldLine"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Security Alert</ItemTitle>
            <ItemDescription>
              New login detected from unknown device.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Review
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  )
}
