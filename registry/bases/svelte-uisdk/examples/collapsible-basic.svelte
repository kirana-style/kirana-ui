<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import { Card, CardContent } from "../ui/card"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../ui/collapsible"
  import { css } from "@kirana-style/core"
  import { radius, theme } from "../../../core/tokens"
  import {
    containerSize,
    fontSize,
    lineHeight,
    space,
  } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    card: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: containerSize.sm },
    }),
    collapsible: css({
      borderRadius: { "*": null, base: radius.md },
      backgroundColor: { '[data-state="open"]': theme.muted },
    }),
    button: css({
      width: { "*": null, base: "100%" },
    }),
    chevronDownIcon: css({
      marginLeft: "auto",
      // Upstream's `group-data-[panel-open]/button:rotate-180`: the trigger is the icon's parent.
      rotate: { ':where([data-state="open"] > *)': "180deg" },
    }),
    collapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      alignItems: { "*": null, base: "flex-start" },
      gap: { "*": null, base: space[2] },
      padding: { "*": null, base: space["2.5"] },
      paddingTop: { "*": null, base: space["0"] },
      fontSize: { "*": null, base: fontSize.sm },
      lineHeight: lineHeight.sm,
    }),
  }
</script>

<div sx={page.example}>
  <Card sx={styles.card}>
    <CardContent>
      <Collapsible sx={styles.collapsible}>
        <CollapsibleTrigger>
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="ghost" sx={styles.button}>
              Product details
              <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={styles.chevronDownIcon} />
            </Button>
          {/snippet}
        </CollapsibleTrigger>
        <CollapsibleContent sx={styles.collapsibleContent}>
          <div>
            This panel can be expanded or collapsed to reveal additional content.
          </div>
          <Button size="xs">
            Learn More
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </CardContent>
  </Card>
</div>
