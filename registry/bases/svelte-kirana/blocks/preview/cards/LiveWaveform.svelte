<script lang="ts">
  import { onDestroy, onMount, untrack } from "svelte"
  import type { ClassValue } from "svelte/elements"

  /**
   * A microphone's waveform on a canvas, React's `LiveWaveform`: bars at rest (`static`) or a
   * scrolling history, a made-up wave while processing, and a fade back to idle. React's refs are
   * plain variables here, its effects Svelte's.
   */
  import { css } from "@kirana-style/core"

  import { theme } from "../../../../../core/tokens"
  import { space } from "../../../../../core/scales"

  let {
    active = false,
    processing = false,
    deviceId,
    barWidth = 3,
    barHeight = 4,
    barGap = 1,
    barRadius = 1.5,
    barColor,
    fadeEdges = true,
    fadeWidth = 24,
    height = 64,
    sensitivity = 1,
    smoothingTimeConstant = 0.8,
    fftSize = 256,
    historySize = 60,
    updateRate = 30,
    mode = "static",
    onError,
    onStreamReady,
    onStreamEnd,
    class: className,
    ...rest
  }: {
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
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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

  let canvasRef = $state<HTMLCanvasElement | null>(null)
  let containerRef = $state<HTMLDivElement | null>(null)
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
    const canvas = canvasRef
    const container = containerRef
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
  onDestroy(() => resizeObserver?.disconnect())

  // Processing: a wave, blended from the last live bars; stopped, a fade to idle.
  $effect(() => {
    void [processing, active, barWidth, barGap, mode]
    const cleanups: (() => void)[] = []
    const onCleanup = (cleanup: () => void) => cleanups.push(cleanup)
    untrack(() => {
      if (processing && !active) {
        let time = 0
        transitionProgress = 0
        const animateProcessing = () => {
          time += 0.03
          transitionProgress = Math.min(1, transitionProgress + 0.02)
          const data: number[] = []
          const barCount = Math.floor(
            (containerRef?.getBoundingClientRect().width || 200) /
              (barWidth + barGap)
          )
          const half = mode === "static" ? Math.floor(barCount / 2) : barCount / 2
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
            if (lastActiveData.length > 0 && transitionProgress < 1) {
              const lastIndex =
                mode === "static"
                  ? Math.min(i, lastActiveData.length - 1)
                  : Math.floor((i / barCount) * lastActiveData.length)
              const last = lastActiveData[lastIndex] || 0
              final = last * (1 - transitionProgress) + value * transitionProgress
            }
            data.push(Math.max(0.05, Math.min(1, final)))
          }
          if (mode === "static") staticBars = data
          else history = data
          needsRedraw = true
          processingAnimation = requestAnimationFrame(animateProcessing)
        }
        animateProcessing()
        onCleanup(
          () => processingAnimation && cancelAnimationFrame(processingAnimation)
        )
      } else if (!active && !processing) {
        const hasData =
          mode === "static" ? staticBars.length > 0 : history.length > 0
        if (!hasData) return
        let fade = 0
        const fadeToIdle = () => {
          fade += 0.03
          if (fade < 1) {
            if (mode === "static")
              staticBars = staticBars.map((value) => value * (1 - fade))
            else history = history.map((value) => value * (1 - fade))
            needsRedraw = true
            requestAnimationFrame(fadeToIdle)
          } else if (mode === "static") staticBars = []
          else history = []
        }
        fadeToIdle()
      }
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  })

  function stopMicrophone() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      stream = null
      onStreamEnd?.()
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
  $effect(() => {
    void [active, deviceId, fftSize, smoothingTimeConstant]
    const smoothing = smoothingTimeConstant
    const cleanups: (() => void)[] = []
    const onCleanup = (cleanup: () => void) => cleanups.push(cleanup)
    untrack(() => {
      if (!active) {
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
            audio: deviceId
              ? { deviceId: { exact: deviceId }, ...constraints }
              : constraints,
          })
          stream = next
          onStreamReady?.(next)
          const AudioContextConstructor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext
          audioContext = new AudioContextConstructor()
          analyser = audioContext.createAnalyser()
          analyser.fftSize = fftSize
          analyser.smoothingTimeConstant = smoothing
          audioContext.createMediaStreamSource(next).connect(analyser)
          history = []
        } catch (error) {
          onError?.(error as Error)
        }
      })()
      onCleanup(stopMicrophone)
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  })

  // The drawing loop.
  let rafId = 0
  onMount(() => {
    const canvas = canvasRef
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const animate = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect()
      if (active && currentTime - lastUpdate > updateRate) {
        lastUpdate = currentTime
        if (analyser) {
          const dataArray = new Uint8Array(analyser.frequencyBinCount)
          analyser.getByteFrequencyData(dataArray)
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
            staticBars = bars
            lastActiveData = bars
          } else {
            let sum = 0
            for (const value of relevant) sum += value
            const average = (sum / relevant.length / 255) * sensitivity
            history.push(Math.min(1, Math.max(0.05, average)))
            lastActiveData = [...history]
            if (history.length > historySize) history.shift()
          }
          needsRedraw = true
        }
      }
      if (!needsRedraw && !active) {
        rafId = requestAnimationFrame(animate)
        return
      }
      needsRedraw = active
      ctx.clearRect(0, 0, rect.width, rect.height)
      const color = barColor || getComputedStyle(canvas).color || "#000"
      const step = barWidth + barGap
      const barCount = Math.floor(rect.width / step)
      const centerY = rect.height / 2
      const drawBar = (x: number, value: number) => {
        const bh = Math.max(barHeight, value * rect.height * 0.8)
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
          processing || active || staticBars.length > 0 ? staticBars : []
        for (let i = 0; i < barCount && i < data.length; i++)
          drawBar(i * step, data[i] || 0.1)
      } else {
        for (let i = 0; i < barCount && i < history.length; i++)
          drawBar(
            rect.width - (i + 1) * step,
            history[history.length - 1 - i] || 0.1
          )
      }
      if (fadeEdges && fadeWidth > 0 && rect.width > 0) {
        if (!gradientCache || lastWidth !== rect.width) {
          const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
          const fadePercent = Math.min(0.3, fadeWidth / rect.width)
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
  $effect(() => {
    void [processing, mode, barColor, barWidth, barGap]
    needsRedraw = true
  })
  onDestroy(() => cancelAnimationFrame(rafId))
</script>

<div bind:this={containerRef} {...rest} class={className} sx={styles.root} style:height={typeof height === 'number' ? `${height}px` : height} aria-label={
      active
        ? 'Live audio waveform'
        : processing
          ? 'Processing audio'
          : 'Audio waveform idle'
    } role="img">
  {#if !active && !processing}
    <div sx={styles.line}></div>
  {/if}
  <canvas bind:this={canvasRef} sx={styles.canvas} aria-hidden="true"></canvas>
</div>
