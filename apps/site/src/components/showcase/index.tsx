/**
 * The home page's showcase, as upstream's home has it (`app/(app)/(root)/cards`): a grid of
 * application cards drawn with the registry's components, live in the reader's design, so every
 * choice in the customizer shows on them at once.
 *
 * Above it, the framework switch (the docs' shared choice of framework and base, so a component page
 * follows it). Each framework's showcase is its preview app's page, framed
 * (`/preview/<framework>/<base>/showcase`), and the design reaches the frame as it reaches every
 * preview: React's is upstream's home, every card and its arrangement, with the cards themselves in
 * the rails beside the grid where upstream draws skeletons (`apps/preview-react/src/showcase.tsx`);
 * every other framework's has the cards it can draw with the components it has so far.
 */
import { useSyncExternalStore } from "react"
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

import { SHOWCASE_FRAMEWORKS } from "./frameworks"
import {
  breakpoint,
  fontSize,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import { tab, when } from "@workspace/registry/core/states"

import { frameQuery } from "@/lib/page-design"

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

const styles = {
  // Across the page's rail, the one band that does.
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
  tabs: css({ maxWidth: "100%" }),
  // The switch as pills: a rounded track on the page's ground with a hairline (the band is the
  // list's own muted), and the chosen framework a muted pill in it.
  pills: css({
    borderRadius: { "*": null, base: radius.full },
    backgroundColor: { "*": null, base: theme.background },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    height: { "*": null, base: "auto" },
    padding: { "*": null, base: space[1] },
  }),
  pill: css({
    borderRadius: { "*": null, base: radius.full },
    paddingInline: { "*": null, base: space[3] },
    paddingBlock: { "*": null, base: space["1.5"] },
    boxShadow: { "*": null, base: "none" },
    borderColor: { "*": null, base: "transparent" },
    backgroundColor: {
      "*": null,
      base: "transparent",
      ":hover": `color-mix(in oklab, ${theme.muted} 60%, transparent)`,
      ...when(tab.active, theme.muted),
    },
  }),
  mark: css({ display: "inline-flex" }),
  note: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    textAlign: "center",
  }),
  // A framework's showcase, framed.
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
  // React's, upstream's home: across the band, to the page's edges, where its rails go on.
  reactFrame: css({
    maxWidth: { "*": null, base: "none" },
    width: {
      "*": null,
      base: `calc(100% + 2 * ${space[4]})`,
      [breakpoint.md]: `calc(100% + 2 * ${space[6]})`,
      [breakpoint.xl]: `calc(100% + 2 * ${space[12]})`,
    },
    marginInline: {
      "*": null,
      base: `calc(-1 * ${space[4]})`,
      [breakpoint.md]: `calc(-1 * ${space[6]})`,
      [breakpoint.xl]: `calc(-1 * ${space[12]})`,
    },
    height: { "*": null, base: "56rem", [breakpoint.lg]: "84rem" },
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
  const hydrated = useSyncExternalStore(subscribeNever, isClient, isServer)
  const query = hydrated ? frameQuery() : ""
  return (
    <section sx={styles.demo} aria-label="Components in your design">
      <div sx={styles.switch}>
        <Tabs
          value={framework.id}
          onValueChange={(value) => {
            const next = SHOWCASE_FRAMEWORKS.find((entry) => entry.id === value)
            if (next) chooseCombination(next.combination)
          }}
          sx={styles.tabs}
        >
          <TabsList aria-label="Framework" sx={styles.pills}>
            {SHOWCASE_FRAMEWORKS.map((entry) => (
              <TabsTrigger key={entry.id} value={entry.id} sx={styles.pill}>
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
      {/* Created once hydrated, in the page's terracotta while the reader has no design saved. */}
      {hydrated ? (
        <iframe
          key={framework.id}
          title={`The showcase in ${framework.label}`}
          src={`/preview/${framework.combination}/showcase${query ? `?${query}` : ""}`}
          sx={[styles.frame, framework.id === "react" && styles.reactFrame]}
        />
      ) : (
        <div
          sx={[styles.frame, framework.id === "react" && styles.reactFrame]}
        />
      )}
      <div sx={styles.fade} />
    </section>
  )
}
