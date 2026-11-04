<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { inputGroup } from "../../../../styles/input-group.styles"

  let {
    align = "inline-start",
    class: className,
    children,
    ...rest
  }: {
    align?: AddonOptions["align"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type AddonOptions = NonNullable<Parameters<typeof inputGroup.addon>[0]>

  /** A click on the addon, but not on a button in it, focuses the group's input. */
  function focusInput(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("button")) return
    ;(event.currentTarget as HTMLElement).parentElement
      ?.querySelector("input")
      ?.focus()
  }
</script>

<div data-slot="input-group-addon" role="group" data-align={align} onclick={focusInput} {...rest} sx={[inputGroup.addonScope, inputGroup.addon({ align }), className as Sx]}>
  {@render children?.()}
</div>
