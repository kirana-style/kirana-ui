/**
 * The home page's showcase in React (`/preview/react/base/showcase`), which the home page frames
 * as it frames every framework's: upstream's home (`app/(app)/(root)/cards`, `CardsDemo`), its
 * cards drawn by the registry's `preview` and `preview-02` blocks and its chat by Message
 * Scroller's demo, in the same columns, each shown from the width upstream's is. Where the page is
 * wider than the grid, upstream goes on in skeleton cards at half strength; here the rails are the
 * same cards themselves, dimmed and out of reach.
 */
import { css, select } from "@kirana-style/core"

import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { AnalyticsCard } from "@workspace/registry/bases/react-base/blocks/preview/cards/analytics-card"
import { UIElements } from "@workspace/registry/bases/react-base/blocks/preview/cards/ui-elements"
import { AccountAccess } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/account-access"
import { ClaimableBalance } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/claimable-balance"
import { ContributionHistory } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/contribution-history"
import { DividendIncome } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/dividend-income"
import { EmptyDistributeTrack } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/empty-distribute-track"
import { NewMilestone } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/new-milestone"
import { NotificationSettings } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/notification-settings"
import { Payments } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/payments"
import { PayoutThreshold } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/payout-threshold"
import { PowerUsage } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/power-usage"
import { QrConnect } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/qr-connect"
import { SavingsTargets } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/savings-targets"
import { SidebarNav } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/sidebar-nav"
import { TransferFunds } from "@workspace/registry/bases/react-base/blocks/preview-02/cards/transfer-funds"
import MessageScrollerDemo from "@workspace/registry/bases/react-base/examples/message-scroller-demo"

/** Upstream's `--gap`: 1.5rem from `lg`, 2.5rem from 1900px. */
const GAP = { base: space[6], "@media (width >= 1900px)": space[10] }
/** A rail column, upstream's `--rail-column`. */
const RAIL_COLUMN = "20rem"

const styles = {
  // `relative flex flex-col gap-(--gap) overflow-hidden bg-muted dark:bg-background`, its sides
  // the home band's (the switch above it is the home page's).
  demo: css({
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    paddingInline: {
      base: space[4],
      [breakpoint.md]: space[6],
      [breakpoint.xl]: space[12],
    },
  }),
  // `mx-auto grid gap-(--gap) **:data-[slot=card]:w-full md:max-w-3xl md:grid-cols-2
  // lg:max-w-none lg:grid-cols-3 min-[1400px]:grid-cols-4 min-[1900px]:grid-cols-5
  // xl:max-w-[1600px] 2xl:max-w-[1900px]`.
  grid: css({
    position: "relative",
    zIndex: 1,
    display: "grid",
    gap: GAP,
    marginInline: "auto",
    maxWidth: {
      [breakpoint.md]: "48rem",
      [breakpoint.lg]: "none",
      [breakpoint.xl]: "1600px",
      [breakpoint["2xl"]]: "1900px",
    },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(3, minmax(0, 1fr))",
      "@media (width >= 1400px)": "repeat(4, minmax(0, 1fr))",
      "@media (width >= 1900px)": "repeat(5, minmax(0, 1fr))",
    },
    [select.descendant('[data-slot="card"]')]: { width: "100%" },
  }),
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: GAP,
  }),
  fromMd: css({ display: { base: "none", [breakpoint.md]: "flex" } }),
  fromLg: css({ display: { base: "none", [breakpoint.lg]: "flex" } }),
  from1400: css({
    display: { base: "none", "@media (width >= 1400px)": "flex" },
  }),
  from1900: css({
    display: { base: "none", "@media (width >= 1900px)": "flex" },
  }),
  // `CardsSkeletonRails`: from 2200px, two columns each side of the grid, at half strength.
  rails: css({
    position: "absolute",
    insetInline: 0,
    top: 0,
    zIndex: 0,
    display: { base: "none", "@media (width >= 2200px)": "block" },
    opacity: 0.5,
    pointerEvents: "none",
  }),
  rail: css({
    position: "absolute",
    top: 0,
    display: "grid",
    gridTemplateColumns: `repeat(2, ${RAIL_COLUMN})`,
    gap: space[10],
    [select.descendant('[data-slot="card"]')]: { width: "100%" },
  }),
  // `left-[calc(50%-950px-var(--rail-width)-var(--gap))]`, and its mirror.
  railStart: css({
    left: `calc(50% - 950px - (${RAIL_COLUMN} * 2 + ${space[10]}) - ${space[10]})`,
  }),
  railEnd: css({
    right: `calc(50% - 950px - (${RAIL_COLUMN} * 2 + ${space[10]}) - ${space[10]})`,
  }),
  railColumn: css({ display: "flex", flexDirection: "column", gap: space[10] }),
}

function Rails() {
  return (
    <div sx={styles.rails} aria-hidden="true" inert>
      <div sx={[styles.rail, styles.railStart]}>
        <div sx={styles.railColumn}>
          <ContributionHistory />
          <ClaimableBalance />
          <DividendIncome />
          <PayoutThreshold />
        </div>
        <div sx={styles.railColumn}>
          <UIElements />
          <SavingsTargets />
          <NewMilestone />
          <AccountAccess />
        </div>
      </div>
      <div sx={[styles.rail, styles.railEnd]}>
        <div sx={styles.railColumn}>
          <NewMilestone />
          <PayoutThreshold />
          <QrConnect />
          <TransferFunds />
        </div>
        <div sx={styles.railColumn}>
          <Payments />
          <EmptyDistributeTrack />
          <AnalyticsCard />
          <NotificationSettings />
          <PowerUsage />
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <main sx={styles.demo} data-showcase="">
      <Rails />
      <div sx={styles.grid}>
        <div sx={styles.column}>
          <UIElements />
          <SidebarNav />
          <SavingsTargets />
        </div>
        <div sx={[styles.column, styles.fromLg]}>
          <ContributionHistory />
          <ClaimableBalance />
          <DividendIncome />
        </div>
        <div sx={[styles.column, styles.from1400]}>
          <NewMilestone />
          <PayoutThreshold />
          <AccountAccess />
        </div>
        <div sx={[styles.column, styles.fromMd]}>
          <QrConnect />
          {/* Upstream hides the demo's caption (`**:[.text-center.text-xs]:hidden`), which no
              one compound selector reaches here; it stays. */}
          <MessageScrollerDemo />
          <Payments />
        </div>
        <div sx={[styles.column, styles.from1900]}>
          <EmptyDistributeTrack />
          <AnalyticsCard />
          <NotificationSettings />
          <PowerUsage />
        </div>
      </div>
    </main>
  )
}
