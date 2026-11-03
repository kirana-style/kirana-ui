<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { alert } from "../../../../styles/alert.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: AlertVariants["variant"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type AlertVariants = NonNullable<Parameters<typeof alert.root>[0]>
</script>

<div data-slot="alert" data-variant={variant} role="alert" {...rest} sx={[alert.scope, alert.root({ variant }), className as Sx]}>
  {@render children?.()}
</div>
