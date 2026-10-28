/**
 * The faded cards beside the showcase, as upstream's `CardsSkeletonRails`: where the page is wider
 * than the grid, the grid goes on in skeletons at half strength, clipped at the page's edge, so the
 * cards stay their size and the band still fills the width. Four of upstream's skeleton cards
 * (`cards/skeleton/`), drawn with the registry's Card and Skeleton; a bone's size is inline, the
 * one value each differs by.
 */
import { css } from "@kirana-style/core"

import { space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/registry/bases/react-base/ui/card"
import { Skeleton } from "@workspace/registry/bases/react-base/ui/skeleton"

/** Upstream's 1600 px grid, half of it from the page's centre. */
const HALF = "50rem"
const GAP = space[6]

const styles = {
  rail: css({
    position: "absolute",
    // Level with the grid, under the switch.
    top: `calc(${space[12]} + 2.25rem + ${space[6]})`,
    zIndex: 0,
    display: { base: "none", "@media (width >= 1700px)": "grid" },
    gridTemplateColumns: "repeat(2, 20rem)",
    gap: GAP,
    opacity: 0.5,
    pointerEvents: "none",
  }),
  // Each rail stands a gap away from the grid, its far column running off the page.
  start: css({ right: `calc(50% + ${HALF} + ${GAP})` }),
  end: css({ left: `calc(50% + ${HALF} + ${GAP})` }),
  column: css({ display: "flex", flexDirection: "column", gap: GAP }),
  stack: css({ display: "flex", flexDirection: "column", gap: space[2] }),
  stackLg: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  stackXl: css({ display: "flex", flexDirection: "column", gap: space[6] }),
  between: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  bars: css({
    display: "flex",
    alignItems: "flex-end",
    gap: space[3],
    width: "100%",
    height: "200px",
  }),
  bar: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: space[2],
    height: "100%",
  }),
  barFill: css({
    width: "100%",
    borderRadius: { "*": null, base: 0 },
    borderStartStartRadius: radius.md,
    borderStartEndRadius: radius.md,
  }),
  tile: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    borderRadius: radius.xl,
    backgroundColor: theme.muted,
    padding: space[4],
  }),
  footerStack: css({ flexDirection: "column", gap: space[4] }),
  chart: css({
    marginInline: space[6],
    marginBlockEnd: space[6],
    aspectRatio: "1 / 0.35",
    borderRadius: { "*": null, base: radius.lg },
  }),
  md: css({ borderRadius: { "*": null, base: radius.md } }),
  lg: css({ borderRadius: { "*": null, base: radius.lg } }),
  xl: css({ borderRadius: { "*": null, base: radius.xl } }),
  full: css({ borderRadius: { "*": null, base: radius.full } }),
}

/** A skeleton of a given size: upstream's `h-* w-*`, capped at its container's width. */
function Bone({
  w = "100%",
  h,
  r = "md",
}: {
  w?: string
  h: string
  r?: "md" | "lg" | "xl" | "full"
}) {
  return (
    <Skeleton
      sx={styles[r]}
      style={{ width: w, maxWidth: "100%", height: h }}
    />
  )
}

function Head({ title, line }: { title: string; line: string }) {
  return (
    <CardHeader sx={styles.stack}>
      <Bone w={title} h="1.25rem" />
      <Bone w={line} h="1rem" />
    </CardHeader>
  )
}

const BARS = [60, 80, 65, 95, 50, 100]

function ContributionHistory() {
  return (
    <Card>
      <Head title="11rem" line="13rem" />
      <CardContent>
        <div sx={styles.bars}>
          {BARS.map((height, index) => (
            <div key={index} sx={styles.bar}>
              <Skeleton sx={styles.barFill} style={{ height: `${height}%` }} />
              <Bone w="1.5rem" h="0.75rem" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardContent>
        <div sx={styles.tile}>
          <Bone w="5rem" h="0.75rem" />
          <Bone w="7rem" h="1.25rem" />
          <Bone w="6rem" h="0.75rem" />
        </div>
      </CardContent>
      <CardFooter>
        <Bone h="2.25rem" r="lg" />
      </CardFooter>
    </Card>
  )
}

function PayoutThreshold() {
  return (
    <Card>
      <Head title="11rem" line="18rem" />
      <CardContent sx={styles.stackLg}>
        <div sx={styles.stack}>
          <Bone w="8rem" h="0.75rem" />
          <Bone h="2.25rem" r="lg" />
        </div>
        <div sx={styles.stack}>
          <div sx={styles.between}>
            <Bone w="10rem" h="0.75rem" />
            <Bone w="6rem" h="1.75rem" />
          </div>
          <Bone h="0.5rem" r="full" />
          <div sx={styles.between}>
            <Bone w="4rem" h="0.75rem" />
            <Bone w="5rem" h="0.75rem" />
          </div>
        </div>
        <div sx={styles.stack}>
          <Bone w="4rem" h="0.75rem" />
          <Bone h="100px" r="lg" />
        </div>
      </CardContent>
      <CardFooter>
        <Bone h="2.25rem" r="lg" />
      </CardFooter>
    </Card>
  )
}

function AccountAccess() {
  return (
    <Card>
      <Head title="9rem" line="16rem" />
      <CardContent sx={styles.stackXl}>
        <div sx={styles.stack}>
          <Bone w="6rem" h="0.75rem" />
          <Bone h="2.25rem" r="lg" />
        </div>
        <div sx={styles.stack}>
          <div sx={styles.between}>
            <Bone w="8rem" h="0.75rem" />
            <Bone w="3rem" h="0.75rem" />
          </div>
          <Bone h="2.25rem" r="lg" />
        </div>
      </CardContent>
      <CardFooter sx={styles.footerStack}>
        <Bone h="2.25rem" r="lg" />
        <Bone h="3.5rem" r="xl" />
      </CardFooter>
    </Card>
  )
}

function AnalyticsCard() {
  return (
    <Card size="sm">
      <CardHeader sx={styles.stack}>
        <Bone w="6rem" h="1.25rem" />
        <Bone w="10rem" h="1rem" />
        <CardAction>
          <Bone w="7rem" h="1.75rem" r="lg" />
        </CardAction>
      </CardHeader>
      <Skeleton sx={styles.chart} />
    </Card>
  )
}

export function SkeletonRails() {
  return (
    <>
      <div aria-hidden="true" sx={[styles.rail, styles.start]}>
        <div sx={styles.column}>
          <AccountAccess />
          <ContributionHistory />
          <PayoutThreshold />
        </div>
        <div sx={styles.column}>
          <AnalyticsCard />
          <PayoutThreshold />
          <AccountAccess />
        </div>
      </div>
      <div aria-hidden="true" sx={[styles.rail, styles.end]}>
        <div sx={styles.column}>
          <ContributionHistory />
          <AccountAccess />
          <AnalyticsCard />
        </div>
        <div sx={styles.column}>
          <PayoutThreshold />
          <AnalyticsCard />
          <ContributionHistory />
        </div>
      </div>
    </>
  )
}
