<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails } from "@kirana-ui/svelte"
  import { Editable } from "@kirana-ui/svelte/editable"
  import { untrack } from "svelte"

  import { editable } from "../../../../styles/editable.styles"

  /**
   * Kirana UI's text edited in place: `value` (or `bind:value`) and `defaultValue`, `editing` (or
   * `bind:editing`) and `defaultEditing`, each default read once; `onValueChange` and
   * `onEditingChange` get `(value, details)`.
   */
  let {
    value = $bindable(),
    defaultValue = "",
    onValueChange,
    editing = $bindable(),
    defaultEditing = false,
    onEditingChange,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string, details: ChangeDetails) => void
    editing?: boolean
    defaultEditing?: boolean
    onEditingChange?: (editing: boolean, details: ChangeDetails) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let ownValue = $state(untrack(() => defaultValue))
  const getValue = () => value ?? ownValue
  const setValue = (next: string) => {
    ownValue = next
    value = next
  }
  let ownEditing = $state(untrack(() => defaultEditing))
  const getEditing = () => editing ?? ownEditing
  const setEditing = (next: boolean) => {
    ownEditing = next
    editing = next
  }
</script>

<Editable.Root
  data-slot="editable"
  bind:value={getValue, setValue}
  bind:editing={getEditing, setEditing}
  {onValueChange}
  {onEditingChange}
  {...rest}
  sx={[editable.root, className as Sx]}
>
  {@render children?.()}
</Editable.Root>
