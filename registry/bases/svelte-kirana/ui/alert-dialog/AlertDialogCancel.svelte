<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialog } from "@kirana-ui/svelte/alert-dialog"

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

<!-- Kirana UI's cancel closes the alert, drawn as the registry's Button. -->
<AlertDialog.Close data-slot="alert-dialog-cancel" {...rest}>
  {#snippet child({ props })}
    <Button {...props} {variant} {size} sx={[className as Sx]}>
      {@render children?.()}
    </Button>
  {/snippet}
</AlertDialog.Close>
