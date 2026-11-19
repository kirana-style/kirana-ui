import { LiveWaveform } from "./live-waveform"
import { createSignal } from "solid-js"
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

export function LiveWaveformCard() {
  const styles = {
    cardFooter: css({
      gap: { "*": null, base: space[2] },
    }),
  }

  const [active, setActive] = createSignal(false)
  const [processing, setProcessing] = createSignal(true)
  const [mode, setMode] = createSignal<"static" | "scrolling">("static")

  function toggleActive() {
    if (!active()) setProcessing(false)
    setActive(!active())
  }

  function toggleProcessing() {
    if (!processing()) setActive(false)
    setProcessing(!processing())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Audio Waveform</CardTitle>
        <CardDescription>
          Real-time microphone input visualization with audio reactivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LiveWaveform
          active={active()}
          processing={processing()}
          height={80}
          barWidth={3}
          barGap={2}
          mode={mode()}
          fadeEdges
          barColor="gray"
          historySize={120}
        />
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button
          size="sm"
          variant={active() ? "default" : "outline"}
          onClick={toggleActive}
        >
          {`${active() ? "Stop" : "Start"} Listening`}
        </Button>
        <Button
          size="sm"
          variant={processing() ? "default" : "outline"}
          onClick={toggleProcessing}
        >
          {`${processing() ? "Stop" : "Start"} Processing`}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setMode(mode() === "static" ? "scrolling" : "static")
          }}
        >
          {mode() === "static" ? "Static" : "Scrolling"}
        </Button>
      </CardFooter>
    </Card>
  )
}
