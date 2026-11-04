<script lang="ts">
  import { css } from "@kirana-style/core"

  import { space } from "../../../../../core/scales"
  import { Button } from "../../../ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../ui/card"
  import type { AgentState } from "./bar-visualizer.svelte"
  import BarVisualizer from "./BarVisualizer.svelte"

  const styles = {
    barVisualizer: css({
      height: space[40],
      maxWidth: "100%",
    }),
    cardFooter: css({
      gap: { "*": null, base: space[2] },
    }),
  }

  let state = $state<AgentState>("speaking")
  const states = [
    { value: "connecting", label: "Connecting" },
    { value: "listening", label: "Listening" },
    { value: "speaking", label: "Speaking" },
  ] as const
</script>

<Card>
  <CardHeader>
    <CardTitle>
      Audio Frequency Visualizer
    </CardTitle>
    <CardDescription>
      Real-time frequency band visualization with animated state transitions
    </CardDescription>
  </CardHeader>
  <CardContent>
    <BarVisualizer state={state} demo barCount={20} minHeight={15} maxHeight={90} sx={styles.barVisualizer} />
  </CardContent>
  <CardFooter sx={styles.cardFooter}>
    {#each states as option (option.value)}
      <Button size="sm" variant={state === option.value ? 'default' : 'outline'} onclick={() => { state = option.value }}>
        {option.label}
      </Button>
    {/each}
  </CardFooter>
</Card>
