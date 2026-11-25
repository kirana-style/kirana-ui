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

<!-- Starts an edit: a ghost icon button with a pencil unless given children. -->
<Editable.EditTrigger data-slot="editable-edit-trigger" aria-label={children ? undefined : "Edit"} {...rest}>
  {#snippet child({ props })}
    <Button {...props} {variant} {size} sx={[className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="PencilIcon" tabler="IconPencil" hugeicons="EditIcon" phosphor="PencilIcon" remixicon="RiPencilLine" />
      {/if}
    </Button>
  {/snippet}
</Editable.EditTrigger>
