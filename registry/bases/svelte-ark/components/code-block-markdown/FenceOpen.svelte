<script lang="ts">
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { FENCE_OPEN } from "./context"
  import type { FenceOpenContext } from "./context"

  let { value, children }: { value: boolean; children?: Snippet } = $props()

  setContext<FenceOpenContext>(FENCE_OPEN, {
    get value() {
      return value
    },
  })
</script>

{@render children?.()}
