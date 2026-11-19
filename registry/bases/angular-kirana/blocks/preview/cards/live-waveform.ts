/**
 * A microphone's waveform on a canvas, React's `LiveWaveform`: bars at rest (`static`) or a
 * scrolling history, a made-up wave while processing, and a fade back to idle. React's refs are
 * the component's fields here, its effects Angular's.
 */
import {
  Component,
  DestroyRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  untracked,
  viewChild,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import type { ElementRef } from "@angular/core"
import { css } from "@kirana-style/core"

import { space } from "../../../../../core/scales"
import { theme } from "../../../../../core/tokens"

const styles = {
  root: css({
    position: "relative",
    height: "100%",
    width: "100%",
  }),
  line: css({
    position: "absolute",
    top: "50%",
    right: space["0"],
    left: space["0"],
    translate: "0 -50%",
    borderTopWidth: "2px",
    borderStyle: "dotted",
    borderColor: `color-mix(in oklab, ${theme.mutedForeground} 20%, transparent)`,
  }),
  canvas: css({
    display: "block",
    height: "100%",
    width: "100%",
  }),
}

@Component({
  selector: "kui-live-waveform",
  imports: [SxDirective],
  host: { style: "display: contents" },
  template: `
    <div
      #container
      [sx]="rootLook()"
      [style.height]="cssHeight()"
      [attr.aria-label]="label()"
      role="img"
    >
      @if (!active() && !processing()) {
        <div [sx]="styles.line"></div>
      }
      <canvas #canvas [sx]="styles.canvas" aria-hidden="true"></canvas>
    </div>
  `,
})
export class LiveWaveform {
  readonly active = input(false, { transform: booleanAttribute })
  readonly processing = input(false, { transform: booleanAttribute })
  readonly deviceId = input<string>()
  readonly barWidth = input(3)
  readonly barHeight = input(4)
  readonly barGap = input(1)
  readonly barRadius = input(1.5)
  readonly barColor = input<string>()
  readonly fadeEdges = input(true, { transform: booleanAttribute })
  readonly fadeWidth = input(24)
  readonly height = input<string | number>(64)
  readonly sensitivity = input(1)
  readonly smoothingTimeConstant = input(0.8)
  readonly fftSize = input(256)
  readonly historySize = input(60)
  readonly updateRate = input(30)
  readonly mode = input<"scrolling" | "static">("static")
  readonly sx = input<SxInput>()
  readonly error = output<Error>()
  readonly streamReady = output<MediaStream>()
  readonly streamEnd = output<void>()

  protected readonly styles = styles
  protected readonly rootLook = computed(
    () => [styles.root, this.sx()] as SxInput
  )
  protected readonly cssHeight = computed(() => {
    const height = this.height()
    return typeof height === "number" ? `${height}px` : height
  })
  protected readonly label = computed(() =>
    this.active()
      ? "Live audio waveform"
      : this.processing()
        ? "Processing audio"
        : "Audio waveform idle"
  )
  private readonly canvasRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>("canvas")
  private readonly containerRef =
    viewChild.required<ElementRef<HTMLDivElement>>("container")

  #history: number[] = []
  #analyser: AnalyserNode | null = null
  #audioContext: AudioContext | null = null
  #stream: MediaStream | null = null
  #lastUpdate = 0
  #processingAnimation: number | null = null
  #lastActiveData: number[] = []
  #transitionProgress = 0
  #staticBars: number[] = []
  #needsRedraw = true
  #gradientCache: CanvasGradient | null = null
  #lastWidth = 0
  #rafId = 0

  constructor() {
    const destroyRef = inject(DestroyRef)

    // The canvas follows its container's size, and the drawing loop starts.
    afterNextRender(() => {
      const canvas = this.canvasRef().nativeElement
      const container = this.containerRef().nativeElement
      const resizeObserver = new ResizeObserver(() => {
        const rect = container.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
        canvas.getContext("2d")?.scale(dpr, dpr)
        this.#gradientCache = null
        this.#lastWidth = rect.width
        this.#needsRedraw = true
      })
      resizeObserver.observe(container)
      destroyRef.onDestroy(() => resizeObserver.disconnect())
      const ctx = canvas.getContext("2d")
      if (ctx)
        this.#rafId = requestAnimationFrame((time) =>
          this.#draw(canvas, ctx, time)
        )
    })
    destroyRef.onDestroy(() => cancelAnimationFrame(this.#rafId))

    // Processing: a wave, blended from the last live bars; stopped, a fade to idle.
    effect((onCleanup) => {
      const processing = this.processing()
      const active = this.active()
      const barWidth = this.barWidth()
      const barGap = this.barGap()
      const mode = this.mode()
      untracked(() => {
        if (processing && !active) {
          let time = 0
          this.#transitionProgress = 0
          const animateProcessing = () => {
            time += 0.03
            this.#transitionProgress = Math.min(
              1,
              this.#transitionProgress + 0.02
            )
            const data: number[] = []
            const barCount = Math.floor(
              (this.containerRef().nativeElement.getBoundingClientRect()
                .width || 200) /
                (barWidth + barGap)
            )
            const half =
              mode === "static" ? Math.floor(barCount / 2) : barCount / 2
            for (let i = 0; i < barCount; i++) {
              const position = (i - half) / half
              const centerWeight = 1 - Math.abs(position) * 0.4
              const wave =
                mode === "static"
                  ? Math.sin(time * 1.5 + position * 3) * 0.25 +
                    Math.sin(time * 0.8 - position * 2) * 0.2 +
                    Math.cos(time * 2 + position) * 0.15
                  : Math.sin(time * 1.5 + i * 0.15) * 0.25 +
                    Math.sin(time * 0.8 - i * 0.1) * 0.2 +
                    Math.cos(time * 2 + i * 0.05) * 0.15
              const value = (0.2 + wave) * centerWeight
              let final = value
              if (
                this.#lastActiveData.length > 0 &&
                this.#transitionProgress < 1
              ) {
                const lastIndex =
                  mode === "static"
                    ? Math.min(i, this.#lastActiveData.length - 1)
                    : Math.floor((i / barCount) * this.#lastActiveData.length)
                const last = this.#lastActiveData[lastIndex] || 0
                final =
                  last * (1 - this.#transitionProgress) +
                  value * this.#transitionProgress
              }
              data.push(Math.max(0.05, Math.min(1, final)))
            }
            if (mode === "static") this.#staticBars = data
            else this.#history = data
            this.#needsRedraw = true
            this.#processingAnimation = requestAnimationFrame(animateProcessing)
          }
          animateProcessing()
          onCleanup(
            () =>
              this.#processingAnimation &&
              cancelAnimationFrame(this.#processingAnimation)
          )
        } else if (!active && !processing) {
          const hasData =
            mode === "static"
              ? this.#staticBars.length > 0
              : this.#history.length > 0
          if (!hasData) return
          let fade = 0
          const fadeToIdle = () => {
            fade += 0.03
            if (fade < 1) {
              if (mode === "static")
                this.#staticBars = this.#staticBars.map(
                  (value) => value * (1 - fade)
                )
              else
                this.#history = this.#history.map((value) => value * (1 - fade))
              this.#needsRedraw = true
              requestAnimationFrame(fadeToIdle)
            } else if (mode === "static") this.#staticBars = []
            else this.#history = []
          }
          fadeToIdle()
        }
      })
    })

    // The microphone, open while active.
    effect((onCleanup) => {
      const active = this.active()
      const deviceId = this.deviceId()
      const fftSize = this.fftSize()
      const smoothing = this.smoothingTimeConstant()
      untracked(() => {
        if (!active) {
          this.#stopMicrophone()
          return
        }
        const constraints = {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
        void (async () => {
          try {
            const next = await navigator.mediaDevices.getUserMedia({
              audio: deviceId
                ? { deviceId: { exact: deviceId }, ...constraints }
                : constraints,
            })
            this.#stream = next
            this.streamReady.emit(next)
            const AudioContextConstructor =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext
            this.#audioContext = new AudioContextConstructor()
            this.#analyser = this.#audioContext.createAnalyser()
            this.#analyser.fftSize = fftSize
            this.#analyser.smoothingTimeConstant = smoothing
            this.#audioContext
              .createMediaStreamSource(next)
              .connect(this.#analyser)
            this.#history = []
          } catch (error) {
            this.error.emit(error as Error)
          }
        })()
        onCleanup(() => this.#stopMicrophone())
      })
    })

    // Any change redraws, as React's effect restarting does.
    effect(() => {
      this.processing()
      this.mode()
      this.barColor()
      this.barWidth()
      this.barGap()
      this.#needsRedraw = true
    })
  }

  #stopMicrophone() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop())
      this.#stream = null
      this.streamEnd.emit()
    }
    if (this.#audioContext && this.#audioContext.state !== "closed") {
      void this.#audioContext.close()
      this.#audioContext = null
    }
  }

  #draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    currentTime: number
  ) {
    const next = (time: number) => this.#draw(canvas, ctx, time)
    const active = this.active()
    const processing = this.processing()
    const mode = this.mode()
    const barWidth = this.barWidth()
    const barGap = this.barGap()
    const barRadius = this.barRadius()
    const sensitivity = this.sensitivity()
    const rect = canvas.getBoundingClientRect()
    if (active && currentTime - this.#lastUpdate > this.updateRate()) {
      this.#lastUpdate = currentTime
      if (this.#analyser) {
        const dataArray = new Uint8Array(this.#analyser.frequencyBinCount)
        this.#analyser.getByteFrequencyData(dataArray)
        const relevant = dataArray.slice(
          Math.floor(dataArray.length * 0.05),
          Math.floor(dataArray.length * 0.4)
        )
        if (mode === "static") {
          const half = Math.floor(
            Math.floor(rect.width / (barWidth + barGap)) / 2
          )
          const bar = (i: number) =>
            Math.max(
              0.05,
              Math.min(
                1,
                (relevant[Math.floor((i / half) * relevant.length)]! / 255) *
                  sensitivity
              )
            )
          const bars: number[] = []
          for (let i = half - 1; i >= 0; i--) bars.push(bar(i))
          for (let i = 0; i < half; i++) bars.push(bar(i))
          this.#staticBars = bars
          this.#lastActiveData = bars
        } else {
          let sum = 0
          for (const value of relevant) sum += value
          const average = (sum / relevant.length / 255) * sensitivity
          this.#history.push(Math.min(1, Math.max(0.05, average)))
          this.#lastActiveData = [...this.#history]
          if (this.#history.length > this.historySize()) this.#history.shift()
        }
        this.#needsRedraw = true
      }
    }
    if (!this.#needsRedraw && !active) {
      this.#rafId = requestAnimationFrame(next)
      return
    }
    this.#needsRedraw = active
    ctx.clearRect(0, 0, rect.width, rect.height)
    const color = this.barColor() || getComputedStyle(canvas).color || "#000"
    const step = barWidth + barGap
    const barCount = Math.floor(rect.width / step)
    const centerY = rect.height / 2
    const drawBar = (x: number, value: number) => {
      const bh = Math.max(this.barHeight(), value * rect.height * 0.8)
      const y = centerY - bh / 2
      ctx.fillStyle = color
      ctx.globalAlpha = 0.4 + value * 0.6
      if (barRadius > 0) {
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, bh, barRadius)
        ctx.fill()
      } else ctx.fillRect(x, y, barWidth, bh)
    }
    if (mode === "static") {
      const data =
        processing || active || this.#staticBars.length > 0
          ? this.#staticBars
          : []
      for (let i = 0; i < barCount && i < data.length; i++)
        drawBar(i * step, data[i] || 0.1)
    } else {
      for (let i = 0; i < barCount && i < this.#history.length; i++)
        drawBar(
          rect.width - (i + 1) * step,
          this.#history[this.#history.length - 1 - i] || 0.1
        )
    }
    const fadeWidth = this.fadeWidth()
    if (this.fadeEdges() && fadeWidth > 0 && rect.width > 0) {
      if (!this.#gradientCache || this.#lastWidth !== rect.width) {
        const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
        const fadePercent = Math.min(0.3, fadeWidth / rect.width)
        gradient.addColorStop(0, "rgba(255,255,255,1)")
        gradient.addColorStop(fadePercent, "rgba(255,255,255,0)")
        gradient.addColorStop(1 - fadePercent, "rgba(255,255,255,0)")
        gradient.addColorStop(1, "rgba(255,255,255,1)")
        this.#gradientCache = gradient
        this.#lastWidth = rect.width
      }
      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = this.#gradientCache
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.globalCompositeOperation = "source-over"
    }
    ctx.globalAlpha = 1
    this.#rafId = requestAnimationFrame(next)
  }
}
