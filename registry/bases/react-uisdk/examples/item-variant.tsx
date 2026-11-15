import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
}

export default function ItemVariant() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <Item>
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default Variant</ItemTitle>
            <ItemDescription>
              Transparent background with no border.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Outline Variant</ItemTitle>
            <ItemDescription>
              Outlined style with a visible border.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="InboxIcon"
              tabler="IconInbox"
              hugeicons="InboxIcon"
              phosphor="TrayIcon"
              remixicon="RiInboxLine"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Muted Variant</ItemTitle>
            <ItemDescription>
              Muted background for secondary content.
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}
