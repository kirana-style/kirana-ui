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
  import LiveWaveform from "./LiveWaveform.svelte"

  const styles = {
    cardFooter: css({
      gap: { "*": null, base: space[2] },
    }),
  }

  let active = $state(false)
  let processing = $state(true)
  let mode = $state<"static" | "scrolling">("static")

  function toggleActive() {
    if (!active) processing = false
    active = !active
  }

  function toggleProcessing() {
    if (!processing) active = false
    processing = !processing
  }
</script>

<Card>
  <CardHeader>
    <CardTitle>
      Live Audio Waveform
    </CardTitle>
    <CardDescription>
      Real-time microphone input visualization with audio reactivity
    </CardDescription>
  </CardHeader>
  <CardContent>
    <LiveWaveform active={active} processing={processing} height={80} barWidth={3} barGap={2} mode={mode} fadeEdges barColor="gray" historySize={120} />
  </CardContent>
  <CardFooter sx={styles.cardFooter}>
    <Button size="sm" variant={active ? 'default' : 'outline'} onclick={toggleActive}>
      {active ? "Stop" : "Start"} Listening
    </Button>
    <Button size="sm" variant={processing ? 'default' : 'outline'} onclick={toggleProcessing}>
      {processing ? "Stop" : "Start"} Processing
    </Button>
    <Button size="sm" variant="outline" onclick={() => { mode = mode === 'static' ? 'scrolling' : 'static' }}>
      {mode === "static" ? "Static" : "Scrolling"}
    </Button>
  </CardFooter>
</Card>
