<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { TagsInput } from "@kirana-ui/svelte/tags-input"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { tagsInput } from "../../../../styles/tags-input.styles"
  import { Button } from "../button"

  /** Takes every tag away: a ghost `icon-xs` Button, hidden by the primitive while there is none. */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<TagsInput.Clear data-slot="tags-input-clear" {...rest}>
  {#snippet child({ props })}
    <Button {...props} variant="ghost" size="icon-xs" sx={[tagsInput.clear, className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
      {/if}
    </Button>
  {/snippet}
</TagsInput.Clear>
