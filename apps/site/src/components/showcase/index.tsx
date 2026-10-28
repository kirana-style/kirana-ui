/**
 * The home page's showcase, as upstream's home has it (`app/(app)/(root)/cards`): a grid of
 * application cards drawn with the registry's components, live in the reader's design, so every
 * choice in the customizer shows on them at once. The cards are the ones of upstream's home and of
 * its `preview` block that the registry can draw today (Card, Button, Field, Input, Separator,
 * Skeleton, Chart); the rest come with their components. Site code, not a registry item: a block
 * holding some of upstream's `preview` cards would differ from upstream's whole block.
 *
 * Above the grid, the framework switch (the docs' shared choice of framework and base, so a component
 * page follows it): React is this grid, drawn on Base UI; every other framework is its preview app's
 * showcase page, framed (`/preview/<framework>/<base>/showcase`), with the cards that framework can
 * draw with the components it has so far. The design reaches the frame as it reaches every preview.
 */
import * as React from "react"
import { css } from "@kirana-style/core"

import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import {
  chooseCombination,
  useSavedCombination,
} from "@workspace/docs-ui/combination.ts"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import { EnvironmentVariables } from "./environment-variables"
import { SHOWCASE_FRAMEWORKS } from "./frameworks"
import { NewMilestone } from "./new-milestone"
import { PowerUsage } from "./power-usage"
import { QrConnect } from "./qr-connect"
import { SkeletonLoading } from "./skeleton-loading"
import { StyleOverview } from "./style-overview"
import { WeeklyFitnessSummary } from "./weekly-fitness-summary"
import {
  breakpoint,
  fontSize,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
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
  // The switch, centred over the grid, and what the chosen framework draws so far.
  switch: css({
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[2],
    marginBlockEnd: { base: space[4], [breakpoint.lg]: space[6] },
  }),
  // No scroll container: the line tab's indicator reaches below the list and would scroll.
  tabs: css({ maxWidth: "100%" }),
  mark: css({ display: "inline-flex" }),
  note: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    textAlign: "center",
  }),
  // Another framework's showcase, where the grid would be.
  frame: css({
    position: "relative",
    zIndex: 1,
    display: "block",
    width: "100%",
    maxWidth: { base: "48rem", [breakpoint.lg]: "100rem" },
    marginInline: "auto",
    height: { base: "48rem", [breakpoint.lg]: "60rem" },
    borderWidth: 0,
    backgroundColor: "transparent",
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
  // React Aria's choice reads as React here: the grid is drawn on Base UI.
  const saved = useSavedCombination()
  const framework =
    SHOWCASE_FRAMEWORKS.find((entry) => entry.combination === saved) ??
    SHOWCASE_FRAMEWORKS[0]!
  return (
    <section sx={styles.demo} aria-label="Components in your design">
      <React.Suspense fallback={null}>
        <SkeletonRails />
      </React.Suspense>
      <div sx={styles.switch}>
        <Tabs
          value={framework.id}
          onValueChange={(value) => {
            const next = SHOWCASE_FRAMEWORKS.find((entry) => entry.id === value)
            if (next) chooseCombination(next.combination)
          }}
          sx={styles.tabs}
        >
          <TabsList variant="line" aria-label="Framework">
            {SHOWCASE_FRAMEWORKS.map((entry) => (
              <TabsTrigger key={entry.id} value={entry.id}>
                <span sx={styles.mark} aria-hidden="true">
                  <BrandIcon icon={entry.icon} size="0.875rem" />
                </span>
                {entry.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {framework.id === "react" ? null : (
          <p sx={styles.note}>
            The cards {framework.label} draws with what it has so far: Button,
            Card and Skeleton.
          </p>
        )}
      </div>
      {framework.id === "react" ? (
        <ReactGrid />
      ) : (
        <iframe
          key={framework.id}
          title={`The showcase in ${framework.label}`}
          src={`/preview/${framework.combination}/showcase`}
          sx={styles.frame}
        />
      )}
      <div sx={styles.fade} />
    </section>
  )
}

function ReactGrid() {
  return (
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
  )
}
