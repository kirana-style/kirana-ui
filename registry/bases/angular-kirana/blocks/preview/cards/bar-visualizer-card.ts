import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import type { AgentState } from "./use-bar-visualizer"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { BarVisualizer } from "./bar-visualizer"

const styles = {
  barVisualizer: css({
    height: space[40],
    maxWidth: "100%",
  }),
  cardFooter: css({
    gap: { "*": null, base: space[2] },
  }),
}

const states = [
  { value: "connecting", label: "Connecting" },
  { value: "listening", label: "Listening" },
  { value: "speaking", label: "Speaking" },
] as const

@Component({
  selector: "kui-bar-visualizer-card",
  imports: [
    BarVisualizer,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Audio Frequency Visualizer</div>
        <div kuiCardDescription>
          Real-time frequency band visualization with animated state transitions
        </div>
      </div>
      <div kuiCardContent>
        <kui-bar-visualizer
          [state]="state()"
          demo
          [barCount]="20"
          [minHeight]="15"
          [maxHeight]="90"
          [sx]="styles.barVisualizer"
        />
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        @for (option of states; track option.value) {
          <button
            kuiButton
            size="sm"
            [variant]="state() === option.value ? 'default' : 'outline'"
            (click)="state.set(option.value)"
          >
            {{ option.label }}
          </button>
        }
      </div>
    </div>
  `,
})
export class BarVisualizerCard {
  protected readonly state = signal<AgentState>("speaking")
  protected readonly styles = styles
  protected readonly states = states
}
