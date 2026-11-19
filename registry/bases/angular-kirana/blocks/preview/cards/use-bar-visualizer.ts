/**
 * The bar visualizer's logic, React's hooks on Angular's signals (called where `inject()` works): a microphone's volume in bands
 * (`useMultibandVolume`), a demo's made-up volume (`useFakeVolume`) and the highlighted bars'
 * sequence for each state (`useBarAnimator`).
 */
import {
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from "@angular/core"
import type { Signal } from "@angular/core"

export type AgentState =
  | "connecting"
  | "initializing"
  | "listening"
  | "speaking"
  | "thinking"

type AnimationState = AgentState | undefined

interface AudioAnalyserOptions {
  fftSize?: number
  smoothingTimeConstant?: number
  minDecibels?: number
  maxDecibels?: number
}

interface MultiBandVolumeOptions {
  bands?: number
  loPass?: number
  hiPass?: number
  updateInterval?: number
  analyserOptions?: AudioAnalyserOptions
}

const multibandDefaults: MultiBandVolumeOptions = {
  bands: 5,
  loPass: 100,
  hiPass: 600,
  updateInterval: 32,
  analyserOptions: { fftSize: 2048 },
}

const normalizeDb = (value: number) => {
  if (value === -Infinity) return 0
  const minDb = -100
  const maxDb = -10
  const db = 1 - (Math.max(minDb, Math.min(maxDb, value)) * -1) / 100
  return Math.sqrt(db)
}

function createAudioAnalyser(
  mediaStream: MediaStream,
  options: AudioAnalyserOptions = {}
) {
  const audioContext = new (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  )()
  const source = audioContext.createMediaStreamSource(mediaStream)
  const analyser = audioContext.createAnalyser()
  if (options.fftSize) analyser.fftSize = options.fftSize
  if (options.smoothingTimeConstant !== undefined)
    analyser.smoothingTimeConstant = options.smoothingTimeConstant
  if (options.minDecibels !== undefined)
    analyser.minDecibels = options.minDecibels
  if (options.maxDecibels !== undefined)
    analyser.maxDecibels = options.maxDecibels
  source.connect(analyser)
  const cleanup = () => {
    source.disconnect()
    void audioContext.close()
  }
  return { analyser, audioContext, cleanup }
}

/** A microphone's volume in `bands` bands, between `loPass` and `hiPass`. */
export function useMultibandVolume(
  mediaStream: () => MediaStream | null | undefined,
  options: Omit<MultiBandVolumeOptions, "bands"> & {
    /** Read when the stream changes: a component's input is not set yet when it calls this. */
    bands?: () => number
  } = {}
): Signal<number[]> {
  const loPass = options.loPass ?? multibandDefaults.loPass ?? 100
  const hiPass = options.hiPass ?? multibandDefaults.hiPass ?? 600
  const updateInterval =
    options.updateInterval ?? multibandDefaults.updateInterval ?? 32
  const analyserOptions = {
    ...multibandDefaults.analyserOptions,
    ...options.analyserOptions,
  }

  const frequencyBands = signal<number[]>([])
  let stop = () => {}

  effect(() => {
    const stream = mediaStream()
    const bands = options.bands?.() ?? multibandDefaults.bands ?? 5
    untracked(() => {
      stop()
      if (!stream) {
        frequencyBands.set(Array.from({ length: bands }, () => 0))
        return
      }
      const { analyser, cleanup } = createAudioAnalyser(stream, analyserOptions)
      const dataArray = new Float32Array(analyser.frequencyBinCount)
      const chunkSize = Math.ceil((hiPass - loPass) / bands)
      let lastUpdate = 0
      let frameId = 0
      const updateVolume = (timestamp: number) => {
        if (timestamp - lastUpdate >= updateInterval) {
          analyser.getFloatFrequencyData(dataArray)
          const chunks = Array.from({ length: bands }, (_, i) => {
            let sum = 0
            let count = 0
            const end = Math.min(loPass + (i + 1) * chunkSize, hiPass)
            for (let j = loPass + i * chunkSize; j < end; j++) {
              sum += normalizeDb(dataArray[j]!)
              count++
            }
            return count > 0 ? sum / count : 0
          })
          if (
            chunks.some(
              (chunk, i) => Math.abs(chunk - frequencyBands()[i]!) > 0.01
            )
          )
            frequencyBands.set(chunks)
          lastUpdate = timestamp
        }
        frameId = requestAnimationFrame(updateVolume)
      }
      frameId = requestAnimationFrame(updateVolume)
      stop = () => {
        cleanup()
        cancelAnimationFrame(frameId)
      }
    })
  })
  inject(DestroyRef).onDestroy(() => stop())
  return frequencyBands.asReadonly()
}

/** A demo's volume: a wave with some noise while speaking or listening, low otherwise. */
export function useFakeVolume(
  enabled: () => boolean,
  state: () => AnimationState,
  barCount: () => number
): Signal<number[]> {
  // Filled once the effect reads the count: a component's input is not set yet when it calls this.
  const bands = signal<number[]>([])
  let frameId: number | undefined

  effect(() => {
    const on = enabled()
    const current = state()
    const count = barCount()
    untracked(() => {
      if (frameId) cancelAnimationFrame(frameId)
      frameId = undefined
      if (!on) {
        bands.set(Array.from({ length: count }, () => 0.2))
        return
      }
      if (current !== "speaking" && current !== "listening") {
        bands.set(Array.from({ length: count }, () => 0.2))
        return
      }
      let lastUpdate = 0
      const startTime = Date.now() / 1000
      const update = (timestamp: number) => {
        if (timestamp - lastUpdate >= 50) {
          const time = Date.now() / 1000 - startTime
          const next = Array.from({ length: count }, (_, i) => {
            const baseVolume = Math.sin(time * 2 + i * 0.5) * 0.3 + 0.5
            return Math.max(0.1, Math.min(1, baseVolume + Math.random() * 0.2))
          })
          if (
            next.some((value, i) => Math.abs(value - (bands()[i] ?? 0)) > 0.05)
          )
            bands.set(next)
          lastUpdate = timestamp
        }
        frameId = requestAnimationFrame(update)
      }
      frameId = requestAnimationFrame(update)
    })
  })
  inject(DestroyRef).onDestroy(() => frameId && cancelAnimationFrame(frameId))
  return bands.asReadonly()
}

const connectingSequence = (columns: number): number[][] =>
  Array.from({ length: columns }, (_, x) => [x, columns - 1 - x])

const listeningSequence = (columns: number): number[][] => [
  [Math.floor(columns / 2)],
  [-1],
]

/** The bars highlighted at each moment, stepping through the state's sequence every `interval`. */
export function useBarAnimator(
  state: () => AnimationState,
  columns: () => number,
  interval: () => number
): Signal<number[]> {
  const sequence = computed(() => {
    const current = state()
    const count = columns()
    if (current === "thinking" || current === "listening")
      return listeningSequence(count)
    if (current === "connecting" || current === "initializing")
      return connectingSequence(count)
    if (current === undefined || current === "speaking")
      return [Array.from({ length: count }, (_, index) => index)]
    return [[]]
  })
  const currentFrame = signal<number[]>([])
  let index = 0
  let frameId: number | null = null

  effect(() => {
    const steps = sequence()
    const every = interval()
    untracked(() => {
      index = 0
      currentFrame.set(steps[0] ?? [])
      if (frameId !== null) cancelAnimationFrame(frameId)
      let startTime = performance.now()
      const animate = (time: DOMHighResTimeStamp) => {
        if (time - startTime >= every) {
          index = (index + 1) % steps.length
          currentFrame.set(steps[index] ?? [])
          startTime = time
        }
        frameId = requestAnimationFrame(animate)
      }
      frameId = requestAnimationFrame(animate)
    })
  })
  inject(DestroyRef).onDestroy(
    () => frameId !== null && cancelAnimationFrame(frameId)
  )
  return currentFrame.asReadonly()
}
