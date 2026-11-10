<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { DialogCloseTrigger } from "@ark-ui/svelte"

  import { dialog } from "../../../../styles/dialog.styles"
  import { Button } from "../button"

  let {
    showCloseButton = false,
    class: className,
    children,
    ...rest
  }: {
    showCloseButton?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="dialog-footer" {...rest} class={className} sx={dialog.footer}>
  {@render children?.()}
  {#if showCloseButton}
    <DialogCloseTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Close
        </Button>
      {/snippet}
    </DialogCloseTrigger>
  {/if}
</div>
