<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Switch, SwitchThumb } from "@ui-sdk/svelte/switch"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { switchStyles } from "../../../../styles/switch.styles"

  /**
   * ui-sdk's switch: its root is the box (a `span`, as Base UI's), with its thumb. Svelte's Ark UI
   * parts' props: `checked`, Base UI's `defaultChecked`, and `onCheckedChange` called with
   * `{ checked }`.
   */
  let {
    onCheckedChange,
    size = "default",
    class: className,
    ...rest
  }: {
    defaultChecked?: boolean
    checked?: boolean
    onCheckedChange?: (details: { checked: boolean }) => void
    disabled?: boolean
    size?: "sm" | "default"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={Switch}
  slotName="switch"
  tag="span"
  data-size={size}
  {...rest}
  onCheckedChange={(checked: boolean) => onCheckedChange?.({ checked })}
  sx={[switchStyles.root, className as Sx]}
>
  <UisdkPart part={SwitchThumb} slotName="switch-thumb" tag="span" sx={switchStyles.thumb} />
</UisdkPart>
