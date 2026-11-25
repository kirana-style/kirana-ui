<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { ChangeDetails } from "@kirana-ui/svelte"

  import PasswordInputInput from "./PasswordInputInput.svelte"
  import PasswordInputRoot from "./PasswordInputRoot.svelte"
  import PasswordInputToggle from "./PasswordInputToggle.svelte"

  /**
   * The whole field: the input and its show/hide button. Its props are the input's (`id`, `name`,
   * `placeholder`, `autocomplete` …) and the root's own (`bind:visible`, `defaultVisible`,
   * `onVisibleChange`, `onValueChange`, `disabled`); `sx` styles the field, as the root draws it.
   */
  let {
    visible = $bindable(),
    defaultVisible,
    onVisibleChange,
    onValueChange,
    disabled,
    class: className,
    ...rest
  }: {
    visible?: boolean
    defaultVisible?: boolean
    onVisibleChange?: (visible: boolean, details: ChangeDetails) => void
    onValueChange?: (value: string, details: ChangeDetails) => void
    disabled?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<PasswordInputRoot bind:visible {defaultVisible} {onVisibleChange} {onValueChange} {disabled} sx={className as Sx}>
  <PasswordInputInput {...rest} />
  <PasswordInputToggle />
</PasswordInputRoot>
