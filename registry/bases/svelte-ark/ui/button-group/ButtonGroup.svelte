<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { buttonGroup } from "../../../../styles/button-group.styles"

  let {
    orientation,
    class: className,
    children,
    ...rest
  }: {
    orientation?: ButtonGroupVariants["orientation"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ButtonGroupVariants = NonNullable<Parameters<typeof buttonGroup.root>[0]>
</script>

<div data-slot="button-group" role="group" data-orientation={orientation} {...rest} sx={[buttonGroup.root({ orientation }), buttonGroup.width, className as Sx]}>
  {@render children?.()}
</div>
