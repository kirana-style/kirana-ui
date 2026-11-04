import {
  Show,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  untrack,
} from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function LiveWaveform(props: {
  active?: boolean
  processing?: boolean
  deviceId?: string
  barWidth?: number
  barHeight?: number
  barGap?: number
  barRadius?: number
  barColor?: string
  fadeEdges?: boolean
  fadeWidth?: number
  height?: string | number
  sensitivity?: number
  smoothingTimeConstant?: number
  fftSize?: number
  historySize?: number
  updateRate?: number
  mode?: "scrolling" | "static"
  onError?: (error: Error) => void
  onStreamReady?: (stream: MediaStream) => void
  onStreamEnd?: () => void
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        active: false,
        processing: false,
        barWidth: 3,
        barHeight: 4,
        barGap: 1,
        barRadius: 1.5,
        fadeEdges: true,
        fadeWidth: 24,
        height: 64,
        sensitivity: 1,
        smoothingTimeConstant: 0.8,
        fftSize: 256,
        historySize: 60,
        updateRate: 30,
        mode: "static",
      } as const,
      props
    ),
    [
      "active",
      "processing",
      "deviceId",
      "barWidth",
      "barHeight",
      "barGap",
      "barRadius",
      "barColor",
      "fadeEdges",
      "fadeWidth",
      "height",
      "sensitivity",
      "smoothingTimeConstant",
      "fftSize",
      "historySize",
      "updateRate",
      "mode",
      "onError",
      "onStreamReady",
      "onStreamEnd",
      "class",
      "sx",
    ]
  )
  /**
   * A microphone's waveform on a canvas, React's `LiveWaveform`: bars at rest (`static`) or a
   * scrolling history, a made-up wave while processing, and a fade back to idle. React's refs are
   * plain variables here, its effects Svelte's.
   */

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

  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | null>(null)
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement | null>(
    null
  )
  let history: number[] = []
  let analyser: AnalyserNode | null = null
  let audioContext: AudioContext | null = null
  let stream: MediaStream | null = null
  let animationId = 0
  let lastUpdate = 0
  let processingAnimation: number | null = null
  let lastActiveData: number[] = []
  let transitionProgress = 0
  let staticBars: number[] = []
  let needsRedraw = true
  let gradientCache: CanvasGradient | null = null
  let lastWidth = 0

  // The canvas follows its container's size.
  let resizeObserver: ResizeObserver | undefined
  onMount(() => {
    const canvas = canvasRef()
    const container = containerRef()
    if (!canvas || !container) return
    resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      canvas.getContext("2d")?.scale(dpr, dpr)
      gradientCache = null
      lastWidth = rect.width
      needsRedraw = true
    })
    resizeObserver.observe(container)
  })
  onCleanup(() => resizeObserver?.disconnect())

  // Processing: a wave, blended from the last live bars; stopped, a fade to idle.
  createEffect(() => {
    void [
      local.processing,
      local.active,
      local.barWidth,
      local.barGap,
      local.mode,
    ]
    untrack(() => {
      if (local.processing && !local.active) {
        let time = 0
        transitionProgress = 0
        const animateProcessing = () => {
          time += 0.03
          transitionProgress = Math.min(1, transitionProgress + 0.02)
          const data: number[] = []
          const barCount = Math.floor(
            (containerRef()?.getBoundingClientRect().width || 200) /
              (local.barWidth + local.barGap)
          )
          const half =
            local.mode === "static" ? Math.floor(barCount / 2) : barCount / 2
          for (let i = 0; i < barCount; i++) {
            const position = (i - half) / half
            const centerWeight = 1 - Math.abs(position) * 0.4
            const wave =
              local.mode === "static"
                ? Math.sin(time * 1.5 + position * 3) * 0.25 +
                  Math.sin(time * 0.8 - position * 2) * 0.2 +
                  Math.cos(time * 2 + position) * 0.15
                : Math.sin(time * 1.5 + i * 0.15) * 0.25 +
                  Math.sin(time * 0.8 - i * 0.1) * 0.2 +
                  Math.cos(time * 2 + i * 0.05) * 0.15
            const value = (0.2 + wave) * centerWeight
            let final = value
            if (lastActiveData.length > 0 && transitionProgress < 1) {
              const lastIndex =
                local.mode === "static"
                  ? Math.min(i, lastActiveData.length - 1)
                  : Math.floor((i / barCount) * lastActiveData.length)
              const last = lastActiveData[lastIndex] || 0
              final =
                last * (1 - transitionProgress) + value * transitionProgress
            }
            data.push(Math.max(0.05, Math.min(1, final)))
          }
          if (local.mode === "static") staticBars = data
          else history = data
          needsRedraw = true
          processingAnimation = requestAnimationFrame(animateProcessing)
        }
        animateProcessing()
        onCleanup(
          () => processingAnimation && cancelAnimationFrame(processingAnimation)
        )
      } else if (!local.active && !local.processing) {
        const hasData =
          local.mode === "static" ? staticBars.length > 0 : history.length > 0
        if (!hasData) return
        let fade = 0
        const fadeToIdle = () => {
          fade += 0.03
          if (fade < 1) {
            if (local.mode === "static")
              staticBars = staticBars.map((value) => value * (1 - fade))
            else history = history.map((value) => value * (1 - fade))
            needsRedraw = true
            requestAnimationFrame(fadeToIdle)
          } else if (local.mode === "static") staticBars = []
          else history = []
        }
        fadeToIdle()
      }
    })
  })

  function stopMicrophone() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      stream = null
      local.onStreamEnd?.()
    }
    if (audioContext && audioContext.state !== "closed") {
      void audioContext.close()
      audioContext = null
    }
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = 0
    }
  }

  // The microphone, open while active.
  createEffect(() => {
    void [
      local.active,
      local.deviceId,
      local.fftSize,
      local.smoothingTimeConstant,
    ]
    const smoothing = local.smoothingTimeConstant
    untrack(() => {
      if (!local.active) {
        stopMicrophone()
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
            audio: local.deviceId
              ? { deviceId: { exact: local.deviceId }, ...constraints }
              : constraints,
          })
          stream = next
          local.onStreamReady?.(next)
          const AudioContextConstructor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext
          audioContext = new AudioContextConstructor()
          analyser = audioContext.createAnalyser()
          analyser.fftSize = local.fftSize
          analyser.smoothingTimeConstant = smoothing
          audioContext.createMediaStreamSource(next).connect(analyser)
          history = []
        } catch (error) {
          local.onError?.(error as Error)
        }
      })()
      onCleanup(stopMicrophone)
    })
  })

  // The drawing loop.
  let rafId = 0
  onMount(() => {
    const canvas = canvasRef()
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const animate = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect()
      if (local.active && currentTime - lastUpdate > local.updateRate) {
        lastUpdate = currentTime
        if (analyser) {
          const dataArray = new Uint8Array(analyser.frequencyBinCount)
          analyser.getByteFrequencyData(dataArray)
          const relevant = dataArray.slice(
            Math.floor(dataArray.length * 0.05),
            Math.floor(dataArray.length * 0.4)
          )
          if (local.mode === "static") {
            const half = Math.floor(
              Math.floor(rect.width / (local.barWidth + local.barGap)) / 2
            )
            const bar = (i: number) =>
              Math.max(
                0.05,
                Math.min(
                  1,
                  (relevant[Math.floor((i / half) * relevant.length)]! / 255) *
                    local.sensitivity
                )
              )
            const bars: number[] = []
            for (let i = half - 1; i >= 0; i--) bars.push(bar(i))
            for (let i = 0; i < half; i++) bars.push(bar(i))
            staticBars = bars
            lastActiveData = bars
          } else {
            let sum = 0
            for (const value of relevant) sum += value
            const average = (sum / relevant.length / 255) * local.sensitivity
            history.push(Math.min(1, Math.max(0.05, average)))
            lastActiveData = [...history]
            if (history.length > local.historySize) history.shift()
          }
          needsRedraw = true
        }
      }
      if (!needsRedraw && !local.active) {
        rafId = requestAnimationFrame(animate)
        return
      }
      needsRedraw = local.active
      ctx.clearRect(0, 0, rect.width, rect.height)
      const color = local.barColor || getComputedStyle(canvas).color || "#000"
      const step = local.barWidth + local.barGap
      const barCount = Math.floor(rect.width / step)
      const centerY = rect.height / 2
      const drawBar = (x: number, value: number) => {
        const bh = Math.max(local.barHeight, value * rect.height * 0.8)
        const y = centerY - bh / 2
        ctx.fillStyle = color
        ctx.globalAlpha = 0.4 + value * 0.6
        if (local.barRadius > 0) {
          ctx.beginPath()
          ctx.roundRect(x, y, local.barWidth, bh, local.barRadius)
          ctx.fill()
        } else ctx.fillRect(x, y, local.barWidth, bh)
      }
      if (local.mode === "static") {
        const data =
          local.processing || local.active || staticBars.length > 0
            ? staticBars
            : []
        for (let i = 0; i < barCount && i < data.length; i++)
          drawBar(i * step, data[i] || 0.1)
      } else {
        for (let i = 0; i < barCount && i < history.length; i++)
          drawBar(
            rect.width - (i + 1) * step,
            history[history.length - 1 - i] || 0.1
          )
      }
      if (local.fadeEdges && local.fadeWidth > 0 && rect.width > 0) {
        if (!gradientCache || lastWidth !== rect.width) {
          const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
          const fadePercent = Math.min(0.3, local.fadeWidth / rect.width)
          gradient.addColorStop(0, "rgba(255,255,255,1)")
          gradient.addColorStop(fadePercent, "rgba(255,255,255,0)")
          gradient.addColorStop(1 - fadePercent, "rgba(255,255,255,0)")
          gradient.addColorStop(1, "rgba(255,255,255,1)")
          gradientCache = gradient
          lastWidth = rect.width
        }
        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = gradientCache
        ctx.fillRect(0, 0, rect.width, rect.height)
        ctx.globalCompositeOperation = "source-over"
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
  })
  // Any change redraws, as React's effect restarting does.
  createEffect(() => {
    void [
      local.processing,
      local.mode,
      local.barColor,
      local.barWidth,
      local.barGap,
    ]
    needsRedraw = true
  })
  onCleanup(() => cancelAnimationFrame(rafId))

  const own = () => styleProps(local.class, styles.root, local.sx)
  return (
    <div
      ref={setContainerRef}
      {...rest}
      class={own().class}
      aria-label={
        local.active
          ? "Live audio waveform"
          : local.processing
            ? "Processing audio"
            : "Audio waveform idle"
      }
      role="img"
      style={{
        ...own().style,
        height:
          typeof local.height === "number" ? `${local.height}px` : local.height,
      }}
    >
      <Show when={!local.active && !local.processing}>
        <div sx={styles.line} />
      </Show>
      <canvas ref={setCanvasRef} sx={styles.canvas} aria-hidden="true" />
    </div>
  )
}
