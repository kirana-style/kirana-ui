/**
 * Chart's entrance: an area grows from its baseline over Recharts' 1.5s. TanStack Charts ends a
 * path's growth when a repaint falls inside it (LF-005), so `ChartContainer` mounts the chart again
 * at its measured width once the fonts have come; these sample the area's height every frame.
 */
import { areaY, defineChart } from "@tanstack/charts"
import { motion } from "@tanstack/charts/motion"
import { RendererChart } from "@tanstack/charts/react/tooltip"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { act } from "react"
import { createRoot } from "react-dom/client"
import { expect, it, onTestFinished } from "vite-plus/test"

import { mountItem } from "./page"

/**
 * The height of the tallest filled path a reader can see in `root`, every frame for `ms`, as
 * `[t, height]`: a chart `ChartContainer` still holds hidden (`data-entering`) counts as nothing.
 */
function sample(root: Element, ms: number, from = performance.now()) {
  return new Promise<[number, number][]>((resolve) => {
    const out: [number, number][] = []
    const step = () => {
      const t = performance.now() - from
      const heights = [...root.querySelectorAll("svg path")]
        .filter(
          (path) =>
            getComputedStyle(path).fill !== "none" &&
            path.checkVisibility({
              opacityProperty: true,
              visibilityProperty: true,
            })
        )
        .map((path) => path.getBoundingClientRect().height)
      out.push([t, Math.max(0, ...heights)])
      if (t < ms) requestAnimationFrame(step)
      else resolve(out)
    }
    requestAnimationFrame(step)
  })
}

const at = (samples: [number, number][], ms: number) =>
  samples.find(([t]) => t >= ms)?.[1] ?? Number.NaN

it("ChartContainer: the area grows through the entrance", async () => {
  const start = performance.now()
  const { container, errors } = await mountItem("base", "chart-area-default")
  const samples = await sample(container, 2200, start)
  const final = samples.at(-1)![1]
  expect(errors).toEqual([])
  expect(final).toBeGreaterThan(50)
  // Still growing well into the 1.5s, never at full height in its first frames.
  const peakEarly = Math.max(
    ...samples.filter(([t]) => t < 150).map(([, h]) => h)
  )
  expect(peakEarly).toBeLessThan(final * 0.5)
  const firstFull = samples.find(([, h]) => h >= final * 0.98)![0]
  expect(firstFull).toBeGreaterThan(900)
})

/**
 * LF-005's canary, on TanStack Charts itself: a repaint in the middle of the entrance (the box
 * widened at 400ms) still snaps the area to its full height. When this fails, the library carries
 * the entrance through a repaint: remove `ChartContainer`'s remount and this test.
 */
it("TanStack Charts: a repaint mid-entrance still ends a path's growth (LF-005)", async () => {
  const rows = Array.from({ length: 12 }, (_, i) => ({
    x: String(i),
    y: 10 + ((i * 7) % 13),
  }))
  const definition = defineChart({
    marks: [areaY(rows, { x: "x", y: "y", fill: "steelblue" })],
    scales: {
      x: { scale: () => scalePoint<string>() },
      y: { scale: scaleLinear().domain([0, 25]) },
    },
  })
  const renderer = motion({
    transition: { type: "tween", duration: 1500, easing: "ease" },
  })
  const box = document.createElement("div")
  box.style.width = "560px"
  document.body.append(box)
  const root = createRoot(box)
  onTestFinished(async () => {
    await act(async () => root.unmount())
    box.remove()
  })
  const start = performance.now()
  await act(async () =>
    root.render(
      <RendererChart
        renderer={renderer}
        definition={definition}
        initialWidth={480}
        aspectRatio={16 / 9}
        ariaLabel="Area"
      />
    )
  )
  setTimeout(() => (box.style.width = "620px"), 400)
  const samples = await sample(box, 2000, start)
  const final = samples.at(-1)![1]
  // Growing before the repaint, then at full height within 300ms of it, a second early.
  expect(at(samples, 300)).toBeLessThan(final * 0.6)
  expect(at(samples, 700)).toBeGreaterThan(final * 0.98)
})
