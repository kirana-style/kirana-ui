import { Component, booleanAttribute, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { duration, easing, space } from "../../../../../core/scales"
import {
  useBarAnimator,
  useFakeVolume,
  useMultibandVolume,
} from "./use-bar-visualizer"
import type { AgentState } from "./use-bar-visualizer"

/** Tailwind's `animate-pulse`. */
const pulse = keyframes({ "50%": { opacity: 0.5 } })

const styles = {
  bar: css({
    maxWidth: "12px",
    minWidth: "8px",
    flex: "1 1 0%",
    transitionDuration: duration[150],
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
    borderRadius: radius.full,
    backgroundColor: {
      base: theme.border,
      '[data-highlighted="true"]': theme.chart3,
    },
  }),
  speaking: css({ backgroundColor: theme.chart3 }),
  thinking: css({
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
  }),
  root: css({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    gap: space["1.5"],
  }),
  center: css({ alignItems: "center" }),
  end: css({ alignItems: "flex-end" }),
  box: css({
    height: space[32],
    width: "100%",
    overflow: "hidden",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    padding: space[4],
  }),
}

@Component({
  selector: "kui-bar-visualizer",
  imports: [SxDirective],
  host: { style: "display: contents" },
  template: `
    <div [attr.data-state]="state()" [sx]="rootLook()">
      @for (volume of volumeBands(); track index; let index = $index) {
        <div
          [attr.data-highlighted]="highlighted().includes(index)"
          [sx]="[
            styles.bar,
            state() === 'speaking' && styles.speaking,
            state() === 'thinking' &&
              highlighted().includes(index) &&
              styles.thinking,
          ]"
          [style.height.%]="heightOf(volume)"
          [style.animation-duration]="state() === 'thinking' ? '300ms' : null"
        ></div>
      }
    </div>
  `,
})
export class BarVisualizer {
  readonly state = input<AgentState>()
  readonly barCount = input(15)
  readonly mediaStream = input<MediaStream | null>()
  readonly minHeight = input(20)
  readonly maxHeight = input(100)
  readonly demo = input(false, { transform: booleanAttribute })
  readonly centerAlign = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly styles = styles
  protected readonly rootLook = computed(
    () =>
      [
        styles.root,
        this.centerAlign() ? styles.center : styles.end,
        styles.box,
        this.sx(),
      ] as SxInput
  )
  readonly #real = useMultibandVolume(() => this.mediaStream(), {
    bands: () => this.barCount(),
    loPass: 100,
    hiPass: 200,
  })
  readonly #fake = useFakeVolume(
    () => this.demo(),
    () => this.state(),
    () => this.barCount()
  )
  protected readonly volumeBands = computed(() =>
    this.demo() ? this.#fake() : this.#real()
  )
  protected readonly highlighted = useBarAnimator(
    () => this.state(),
    () => this.barCount(),
    () => {
      const state = this.state()
      return state === "connecting"
        ? 2000 / this.barCount()
        : state === "thinking"
          ? 150
          : state === "listening"
            ? 500
            : 1000
    }
  )

  protected heightOf(volume: number) {
    return Math.min(
      this.maxHeight(),
      Math.max(this.minHeight(), volume * 100 + 5)
    )
  }
}
