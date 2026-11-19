import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
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
import { LiveWaveform } from "./live-waveform"

const styles = {
  cardFooter: css({
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "kui-live-waveform-card",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    LiveWaveform,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Live Audio Waveform</div>
        <div kuiCardDescription>
          Real-time microphone input visualization with audio reactivity
        </div>
      </div>
      <div kuiCardContent>
        <kui-live-waveform
          [active]="active()"
          [processing]="processing()"
          [height]="80"
          [barWidth]="3"
          [barGap]="2"
          [mode]="mode()"
          fadeEdges
          barColor="gray"
          [historySize]="120"
        />
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <button
          kuiButton
          size="sm"
          [variant]="active() ? 'default' : 'outline'"
          (click)="toggleActive()"
        >
          {{ active() ? "Stop" : "Start" }}
          Listening
        </button>
        <button
          kuiButton
          size="sm"
          [variant]="processing() ? 'default' : 'outline'"
          (click)="toggleProcessing()"
        >
          {{ processing() ? "Stop" : "Start" }}
          Processing
        </button>
        <button
          kuiButton
          size="sm"
          variant="outline"
          (click)="mode.set(mode() === 'static' ? 'scrolling' : 'static')"
        >
          {{ mode() === "static" ? "Static" : "Scrolling" }}
        </button>
      </div>
    </div>
  `,
})
export class LiveWaveformCard {
  protected readonly active = signal(false)
  protected readonly processing = signal(true)
  protected readonly mode = signal<"static" | "scrolling">("static")
  protected readonly styles = styles
  protected toggleActive() {
    if (!this.active()) this.processing.set(false)
    this.active.set(!this.active())
  }
  protected toggleProcessing() {
    if (!this.processing()) this.active.set(false)
    this.processing.set(!this.processing())
  }
}
