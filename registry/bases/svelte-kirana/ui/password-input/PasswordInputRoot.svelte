<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails } from "@kirana-ui/svelte"
  import { PasswordInput } from "@kirana-ui/svelte/password-input"
  import { untrack } from "svelte"

  import { inputGroup } from "../../../../styles/input-group.styles"
  import { passwordInput } from "../../../../styles/password-input.styles"

  /**
   * Kirana UI's password input: `visible` (or `bind:visible`), `defaultVisible`, read once, and
   * `onVisibleChange(visible, details)`; `toggleLabels` (`{ show, hide }`) is what the show/hide
   * button is called. A caller's `sx` arrives as `class`, merged after the
   * field's own.
   */
  let {
    visible = $bindable(),
    defaultVisible = false,
    onVisibleChange,
    class: className,
    children,
    ...rest
  }: {
    visible?: boolean
    defaultVisible?: boolean
    onVisibleChange?: (visible: boolean, details: ChangeDetails) => void
    onValueChange?: (value: string, details: ChangeDetails) => void
    disabled?: boolean
    toggleLabels?: { show?: string; hide?: string }
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultVisible))
  const get = () => visible ?? own
  const set = (next: boolean) => {
    own = next
    visible = next
  }
</script>

<PasswordInput.Root
  data-slot="password-input"
  bind:visible={get, set}
  {onVisibleChange}
  {...rest}
  sx={[inputGroup.root, passwordInput.root, className as Sx]}
>
  {@render children?.()}
</PasswordInput.Root>
