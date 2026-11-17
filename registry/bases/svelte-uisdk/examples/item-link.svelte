<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
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
      gap: { "*": null, base: space[4] },
    }),
    size4: css({
      width: { "*": null, base: space[4] },
      height: { "*": null, base: space[4] },
    }),
  }
</script>

<div sx={page.example}>
  <div sx={styles.flexWFullMaxWMdFlexColGa}>
    <Item>
      {#snippet asChild(props)}
        <a {...props()} href="#">
          <ItemContent>
            <ItemTitle>
              Visit our documentation
            </ItemTitle>
            <ItemDescription>
              Learn how to get started with our components.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={styles.size4} />
          </ItemActions>
        </a>
      {/snippet}
    </Item>
    <Item variant="outline">
      {#snippet asChild(props)}
        <a {...props()} href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>
              External resource
            </ItemTitle>
            <ItemDescription>
              Opens in a new tab with security attributes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <IconPlaceholder lucide="ExternalLinkIcon" tabler="IconExternalLink" hugeicons="LinkSquare02Icon" phosphor="ArrowSquareOutIcon" remixicon="RiExternalLinkLine" sx={styles.size4} />
          </ItemActions>
        </a>
      {/snippet}
    </Item>
  </div>
</div>
