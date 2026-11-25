<script lang="ts">
  import { TimeField } from "@kirana-ui/svelte/time-field"

  /** The hidden input the time is submitted by. */
  let { ...rest }: { [attribute: string]: unknown } = $props()
</script>

<TimeField.Input data-slot="time-field-input" {...rest} />
