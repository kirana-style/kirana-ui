import { BarVisualizer } from "./bar-visualizer"
import { For, createSignal } from "solid-js"
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
import type { AgentState } from "./use-bar-visualizer"

export function BarVisualizerCard() {
  const styles = {
    barVisualizer: css({
      height: space[40],
      maxWidth: "100%",
    }),
    cardFooter: css({
      gap: { "*": null, base: space[2] },
    }),
  }

  const [state, setState] = createSignal<AgentState>("speaking")
  const states = [
    { value: "connecting", label: "Connecting" },
    { value: "listening", label: "Listening" },
    { value: "speaking", label: "Speaking" },
  ] as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audio Frequency Visualizer</CardTitle>
        <CardDescription>
          Real-time frequency band visualization with animated state transitions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BarVisualizer
          state={state()}
          demo
          barCount={20}
          minHeight={15}
          maxHeight={90}
          sx={styles.barVisualizer}
        />
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <For each={states}>
          {(option) => (
            <Button
              size="sm"
              variant={state() === option.value ? "default" : "outline"}
              onClick={() => {
                setState(option.value)
              }}
            >
              {option.label}
            </Button>
          )}
        </For>
      </CardFooter>
    </Card>
  )
}
