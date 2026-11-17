<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { Bubble, BubbleContent } from "../ui/bubble"
  import { Button } from "../ui/button"
  import { Collapsible, CollapsibleTrigger } from "../ui/collapsible"
  import { containerSize, space } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    flexWFullMaxWSmFlexColGa: css({
      display: "flex",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
      flexDirection: "column",
      gap: { "*": null, base: space[8] },
      paddingBlock: { "*": null, base: space[12] },
    }),
    whitespacePreLine: css({ whiteSpace: "pre-line" }),
    gap1P0TextMutedForegroun: css({
      gap: { "*": null, base: space[1] },
      padding: { "*": null, base: "0" },
      color: theme.mutedForeground,
    }),
    groupDataPanelOpenButton: css({
      rotate: { ':is([data-state="open"] *)': "180deg" },
    }),
  }

  const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

  I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

  The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

  I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

  const previewLength = 180

  let open = $state(false)

  const isLong = text.length > previewLength

  const preview = `${text.slice(0, previewLength)}...`
</script>

<div sx={page.example}>
  <div sx={styles.flexWFullMaxWSmFlexColGa}>
    <Bubble variant="muted">
      <BubbleContent>
        How can I help you today?
      </BubbleContent>
    </Bubble>
    <Bubble variant="muted" align="end">
      <BubbleContent sx={styles.whitespacePreLine}>
        <Collapsible open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
          <div>
            {open || !isLong ? text : preview}
          </div>
          {#if isLong}
            <CollapsibleTrigger>
              {#snippet asChild(props)}
                <Button {...props()} class={props().class} style={props().style} variant="link" sx={styles.gap1P0TextMutedForegroun}>
                  {open ? "Show less" : "Show more"}
                  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" data-icon="inline-end" sx={styles.groupDataPanelOpenButton} />
                </Button>
              {/snippet}
            </CollapsibleTrigger>
          {/if}
        </Collapsible>
      </BubbleContent>
    </Bubble>
  </div>
</div>
