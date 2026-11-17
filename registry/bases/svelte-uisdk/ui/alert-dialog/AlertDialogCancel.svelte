<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialogClose } from "@ui-sdk/svelte/alert-dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import type { button } from "../../../../styles/button.styles"
  import { Button } from "../button"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  let {
    variant = "outline",
    size = "default",
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

<!-- ui-sdk's close, drawn as the registry's Button. -->
<UisdkPart part={AlertDialogClose} slotName="alert-dialog-cancel" tag="button" {...rest}>
  {#snippet asChild(props)}
    <Button {...props()} {variant} {size} sx={className as Sx}>
      {@render children?.()}
    </Button>
  {/snippet}
</UisdkPart>
