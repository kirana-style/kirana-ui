<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { DialogDescription } from "@ark-ui/svelte"

  import { alertDialog } from "../../../../styles/alert-dialog.styles"

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

<!-- A paragraph, as Base UI's description. -->
<DialogDescription>
  {#snippet asChild(props)}
    <p {...props()} class={props().class} style={props().style} data-slot="alert-dialog-description" {...rest} sx={[alertDialog.description, className as Sx]}>
      {@render children?.()}
    </p>
  {/snippet}
</DialogDescription>
