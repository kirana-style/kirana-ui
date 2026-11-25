<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails, IsoTime } from "@kirana-ui/svelte"
  import { TimeField } from "@kirana-ui/svelte/time-field"
  import { untrack } from "svelte"

  import { input } from "../../../../styles/input.styles"
  import { timeField } from "../../../../styles/time-field.styles"
  import TimeFieldInput from "./TimeFieldInput.svelte"
  import TimeFieldSegments from "./TimeFieldSegments.svelte"

  /**
   * The field, drawn as an Input; it draws its segments and hidden input unless given children.
   * `value` (or `bind:value`), `defaultValue`, read once, and `onValueChange(value, details)`.
   */
  let {
    value = $bindable(),
    defaultValue = null,
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    value?: IsoTime | null
    defaultValue?: IsoTime | null
    onValueChange?: (value: IsoTime | null, details: ChangeDetails) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state<IsoTime | null>(untrack(() => defaultValue))
  const get = () => (value === undefined ? own : value)
  const set = (next: IsoTime | null) => {
    own = next
    value = next
  }
</script>

<TimeField.Root data-slot="time-field" bind:value={get, set} {onValueChange} {...rest} sx={[input, timeField.root, className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <TimeFieldSegments />
    <TimeFieldInput />
  {/if}
</TimeField.Root>
