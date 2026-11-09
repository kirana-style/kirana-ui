<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuRadioItemGroupProps } from "@ark-ui/svelte"

  import { MenuRadioItemGroup } from "@ark-ui/svelte"

  import { setRadioGroup } from "./radio-group"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: MenuRadioItemGroupProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setRadioGroup({
    get value() {
      return rest.value as string | undefined
    },
    get onValueChange() {
      return rest.onValueChange as
        | ((details: { value: string }) => void)
        | undefined
    },
  })
</script>

<MenuRadioItemGroup {asChild} data-slot="dropdown-menu-radio-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</MenuRadioItemGroup>
