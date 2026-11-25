<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Editable } from "@kirana-ui/svelte/editable"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import type { button } from "../../../../styles/button.styles"
  import { Button } from "../button"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  let {
    variant = "ghost",
    size = "icon-sm",
    class: className,
    children,
    ...rest
  }: {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- Keeps the edit: a ghost icon button with a check unless given children. -->
<Editable.SubmitTrigger data-slot="editable-submit-trigger" aria-label={children ? undefined : "Save"} {...rest}>
  {#snippet child({ props })}
    <Button {...props} {variant} {size} sx={[className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      {/if}
    </Button>
  {/snippet}
</Editable.SubmitTrigger>
