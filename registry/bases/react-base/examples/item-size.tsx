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

export default function ItemSizeDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
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
            <ItemTitle>Default Size</ItemTitle>
            <ItemDescription>
              The standard size for most use cases.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" size="sm">
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
            <ItemTitle>Small Size</ItemTitle>
            <ItemDescription>A compact size for dense layouts.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" size="xs">
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
            <ItemTitle>Extra Small Size</ItemTitle>
            <ItemDescription>The most compact size available.</ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}
