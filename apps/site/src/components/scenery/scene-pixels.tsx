/**
 * A landscape in pixels: the brand's motif. The scene's picture is sampled cell by cell, its tones
 * posterised with the same 8 × 8 Bayer dither as the pixel K, and the cells thin out towards one
 * edge until the picture dissolves into the page. A soft band of sun crosses it every eighteen
 * seconds, warming the cells it passes, and the cells near the pointer brighten.
 *
 * Ported from the Kirana site's `scene-pixels.tsx`: the home page's hero and the footer draw their
 * scene with it. Until WebGL has
 * drawn a frame, and wherever it cannot or would run without a GPU, the plain picture shows with a
 * CSS mask fading the same way, so nothing waits on the canvas.
 *
 * Same budget as `PixelField`: one triangle and one short fragment shader, drawn only while on
 * screen and the tab is visible, at most 30 frames a second and a device pixel ratio of 2, one
 * still frame for readers who prefer reduced motion, and everything freed on unmount.
 */
import { useEffect, useRef } from "react"
import { css } from "@kirana-style/core"

import { SCENES, sceneImage } from "@/components/header/nav"
import type { SceneId } from "@/components/header/nav"
import { breakpoint } from "@workspace/registry/core/scales"
import type { Sx } from "@workspace/registry/lib/sx"

/** The sun: the gold light every one of the Kirana site's landscapes shares, sweeping through the cells. */
const SUN = {
  sun: "light-dark(oklch(0.82 0.15 80), oklch(0.84 0.14 82))",
} as const

/**
 * Which edge the picture dissolves towards. `hero` is a page hero's: up into the words above it on
 * a narrow screen, left into the words beside it from `lg` up.
 */
export type Dissolve = "up" | "down" | "left" | "right" | "hero"

const fades = (toward: string) =>
  `linear-gradient(to ${toward}, black 40%, transparent 100%)`

const styles = {
  root: css({
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  }),
  picture: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transitionProperty: "opacity",
    transitionDuration: "400ms",
    opacity: { base: 1, ":is([data-drawn] *)": 0 },
  }),
  up: css({ maskImage: fades("top") }),
  down: css({ maskImage: fades("bottom") }),
  left: css({ maskImage: fades("left") }),
  right: css({ maskImage: fades("right") }),
  hero: css({
    maskImage: { base: fades("top"), [breakpoint.lg]: fades("left") },
  }),
  canvas: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    // The shader reads both: the sun's colour, and whether the scheme is dark.
    color: SUN.sun,
    caretColor: "light-dark(rgb(0 0 0), rgb(255 255 255))",
  }),
}

export function ScenePixels({
  scene,
  dissolve = "up",
  fade = 0.6,
  cell = 4,
  priority = false,
  sx,
}: {
  scene: SceneId
  /** The edge the picture dissolves towards. */
  dissolve?: Dissolve
  /** 0–1: how much of the way across the picture is thinning out. */
  fade?: number
  /** Cell size in CSS pixels. */
  cell?: number
  /**
   * The page's largest picture (the homepage hero): fetched first. Every other scene waits until
   * it is about to scroll into view.
   */
  priority?: boolean
  sx?: Sx
}) {
  const root = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLCanvasElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const { position } = SCENES[scene]

  useEffect(() => {
    const canvas = ref.current
    const box = root.current
    const picture = image.current
    if (!canvas || !box || !picture) return
    let live = true
    let stop: (() => void) | undefined
    void import("./scene-gl").then(({ paint }) => {
      if (live)
        stop = paint({
          canvas,
          box,
          picture,
          dissolve,
          fade,
          cell,
          position,
        })
    })
    return () => {
      live = false
      stop?.()
    }
  }, [scene, dissolve, fade, cell, position])

  return (
    <div ref={root} aria-hidden="true" sx={[styles.root, sx]}>
      <img
        ref={image}
        // The smaller picture only: once the canvas has drawn, this picture is hidden, and the
        // canvas's cells show less detail than 800 pixels hold at any width. It is what shows
        // until then, or instead where WebGL is not available.
        src={sceneImage(scene)}
        alt=""
        {...(priority
          ? { fetchPriority: "high" as const }
          : { loading: "lazy" as const, decoding: "async" as const })}
        style={{ objectPosition: position }}
        sx={[styles.picture, styles[dissolve]]}
      />
      <canvas ref={ref} sx={styles.canvas} />
    </div>
  )
}
