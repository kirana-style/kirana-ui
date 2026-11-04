<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { DialogCloseTrigger } from "@ark-ui/svelte"

  import type { button } from "../../../../styles/button.styles"
  import { Button } from "../button"

  let {
    variant = "outline", size = "default",
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

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>
</script>

<DialogCloseTrigger data-slot="alert-dialog-cancel" {...rest}>
  {#snippet asChild(props)}
    <Button {...props()} class={props().class} style={props().style} variant={variant} size={size} sx={[className as Sx]}>
      {@render children?.()}
    </Button>
  {/snippet}
</DialogCloseTrigger>
