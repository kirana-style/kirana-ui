<script lang="ts">
  import type { Snippet } from "svelte"
  import type { TourShownStep } from "@kirana-ui/svelte/tour"

  import { setTourShown } from "./context"

  // Hands the step shown to the parts inside the popup, which Svelte's context reaches only from a component.
  let { shown, children }: { shown: TourShownStep; children: Snippet } = $props()

  setTourShown(() => shown)
</script>

{@render children()}
