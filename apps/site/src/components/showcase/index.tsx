/**
 * The home page's showcase, as upstream's home has it (`app/(app)/(root)/cards`): a grid of
 * application cards drawn with the registry's components, live in the reader's design, so every
 * choice in the customizer shows on them at once. The cards are the ones of upstream's home and of
 * its `preview` block that the registry can draw today (Card, Button, Field, Input, Separator,
 * Skeleton, Chart); the rest come with their components. Site code, not a registry item: a block
 * holding some of upstream's `preview` cards would differ from upstream's whole block.
 */
import * as React from "react"
import { css } from "@kirana-style/core"

import { EnvironmentVariables } from "./environment-variables"
import { NewMilestone } from "./new-milestone"
import { PowerUsage } from "./power-usage"
import { QrConnect } from "./qr-connect"
import { SkeletonLoading } from "./skeleton-loading"
import { StyleOverview } from "./style-overview"
import { WeeklyFitnessSummary } from "./weekly-fitness-summary"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

/**
 * The chart card carries TanStack Charts, the showcase's largest dependency, and is off the first
 * screen: its own chunk, loaded as the page hydrates. The prerendered page has it already, and
 * React keeps that markup until the chunk arrives, so nothing moves.
 */
const TrafficChannels = React.lazy(() =>
  import("./traffic-channels").then((module) => ({
    default: module.TrafficChannels,
  }))
)

// Drawn only from 1700 px, so in a chunk of its own.
const SkeletonRails = React.lazy(() =>
  import("./skeleton-rails").then((module) => ({
    default: module.SkeletonRails,
  }))
)

const styles = {
  // Across the page's rail, the one band that does: the cards, then the skeleton rails to the edges.
  demo: css({
    position: "relative",
    overflow: "hidden",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    padding: {
      base: space[4],
      [breakpoint.md]: space[6],
      [breakpoint.xl]: space[12],
    },
    paddingBottom: 0,
  }),
  grid: css({
    position: "relative",
    zIndex: 1,
    display: "grid",
    gap: { base: space[4], [breakpoint.lg]: space[6] },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(3, minmax(0, 1fr))",
      "@media (width >= 1400px)": "repeat(4, minmax(0, 1fr))",
    },
    // Upstream's 1600 px at most: beyond it the skeleton rails go on, not wider cards.
    marginInline: "auto",
    maxWidth: { base: "48rem", [breakpoint.lg]: "100rem" },
  }),
  column: css({
    display: "flex",
    flexDirection: "column",
    gap: { base: space[4], [breakpoint.lg]: space[6] },
  }),
  fromMd: css({ display: { base: "none", [breakpoint.md]: "flex" } }),
  fromLg: css({ display: { base: "none", [breakpoint.lg]: "flex" } }),
  fromWide: css({
    display: { base: "none", "@media (width >= 1400px)": "flex" },
  }),
  fade: css({
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    zIndex: 2,
    height: { base: "12rem", [breakpoint.lg]: "16rem" },
    pointerEvents: "none",
    backgroundImage: `linear-gradient(to top, ${theme.background}, transparent)`,
  }),
}

export function Showcase() {
  return (
    <section sx={styles.demo} aria-label="Components in your design">
      <React.Suspense fallback={null}>
        <SkeletonRails />
      </React.Suspense>
      <div sx={styles.grid}>
        <div sx={styles.column}>
          <StyleOverview />
          <NewMilestone />
        </div>
        <div sx={[styles.column, styles.fromMd]}>
          <React.Suspense fallback={null}>
            <TrafficChannels />
          </React.Suspense>
          <SkeletonLoading />
        </div>
        <div sx={[styles.column, styles.fromLg]}>
          <QrConnect />
          <EnvironmentVariables />
        </div>
        <div sx={[styles.column, styles.fromWide]}>
          <WeeklyFitnessSummary />
          <PowerUsage />
        </div>
      </div>
      <div sx={styles.fade} />
    </section>
  )
}
