<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Switch } from "@kirana-ui/svelte/switch"
  import { untrack } from "svelte"

  import { switchStyles } from "../../../../styles/switch.styles"

  /** Kirana UI's switch, with Svelte's Ark UI parts' `checked` and `onCheckedChange({ checked })`. */
  let {
    defaultChecked,
    checked,
    onCheckedChange,
    size = "default",
    class: className,
    ...rest
  }: {
    defaultChecked?: boolean
    checked?: boolean
    onCheckedChange?: (details: { checked: boolean }) => void
    size?: "sm" | "default"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultChecked ?? false))
</script>

<Switch.Root
  data-slot="switch"
  data-size={size}
  {...rest}
  checked={checked ?? own}
  onCheckedChange={(next: boolean) => {
    own = next
    onCheckedChange?.({ checked: next })
  }}
  sx={[switchStyles.root, className as Sx]}
>
  <Switch.Thumb data-slot="switch-thumb" sx={switchStyles.thumb} />
</Switch.Root>
