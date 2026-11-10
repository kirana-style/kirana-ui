<script lang="ts">
  import type { PinInputCell } from "bits-ui"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { CELLS } from "./context"
  import type { CellsContext } from "./context"

  // The root's cells, as its snippet gives them, for each slot to read by its index.
  let { cells, children }: { cells: PinInputCell[]; children?: Snippet } = $props()
  setContext<CellsContext>(CELLS, () => cells)
</script>

{@render children?.()}
