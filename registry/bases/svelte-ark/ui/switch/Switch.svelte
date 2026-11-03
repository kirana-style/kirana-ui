<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { SwitchRootProps } from "@ark-ui/svelte"

  import {
    SwitchControl,
    SwitchHiddenInput,
    SwitchRoot,
    SwitchThumb,
  } from "@ark-ui/svelte"

  import { switchStyles } from "../../../../styles/switch.styles"

  let {
    id,
    defaultChecked,
    size = "default", asChild,
    class: className,
    ...rest
  }: {
    id?: string
    /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
    defaultChecked?: boolean
    size?: "sm" | "default"
    asChild?: SwitchRootProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // `id` names the hidden input, so a `<Label for>` beside the switch reaches it.

  // `aria-invalid`, as upstream's demos mark an invalid control: Ark's `invalid`, which marks the box.
  const invalid = $derived.by(() => [true, "true", ""].includes(rest["aria-invalid"] as never)
  )
</script>

<SwitchRoot {asChild} defaultChecked={defaultChecked} invalid={invalid || undefined} {...rest} ids={id ? { hiddenInput: id } : undefined} sx={switchStyles.wrapper}>
  <SwitchControl data-slot="switch" data-size={size} sx={[switchStyles.root, className as Sx]}>
    <SwitchThumb data-slot="switch-thumb" sx={switchStyles.thumb} />
  </SwitchControl>
  <SwitchHiddenInput />
</SwitchRoot>
