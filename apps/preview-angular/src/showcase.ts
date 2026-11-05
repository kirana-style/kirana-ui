import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { AccountAccess } from "./showcase-cards/account-access"
import { AnalyticsCard } from "./showcase-cards/analytics-card"
import { ChatCard } from "./showcase-cards/chat-card"
import { ClaimableBalance } from "./showcase-cards/claimable-balance"
import { ContributionHistory } from "./showcase-cards/contribution-history"
import { DividendIncome } from "./showcase-cards/dividend-income"
import { EmptyDistributeTrack } from "./showcase-cards/empty-distribute-track"
import { NewMilestone } from "./showcase-cards/new-milestone"
import { NotificationSettings } from "./showcase-cards/notification-settings"
import { Payments } from "./showcase-cards/payments"
import { PayoutThreshold } from "./showcase-cards/payout-threshold"
import { PowerUsage } from "./showcase-cards/power-usage"
import { QrConnect } from "./showcase-cards/qr-connect"
import { SavingsTargets } from "./showcase-cards/savings-targets"
import { SidebarNav } from "./showcase-cards/sidebar-nav"
import { TransferFunds } from "./showcase-cards/transfer-funds"
import { UIElements } from "./showcase-cards/ui-elements"

/**
 * The home page's showcase in Angular (`/preview/angular/ng/showcase`), React's `showcase.tsx` card for
 * card: upstream's home (`CardsDemo`), its cards (`showcase-cards/`, converted from Vue's) and
 * its chat (`chat-card.ts`, React's Message Scroller demo), in the same columns, each shown from
 * the width upstream's is, with the same cards dimmed in the rails beside the grid.
 */

/** Upstream's `--gap`: 1.5rem from `lg`, 2.5rem from 1900px. */
const GAP = { base: space[6], "@media (width >= 1900px)": space[10] }
/** A rail column, upstream's `--rail-column`. */
const RAIL_COLUMN = "20rem"

const styles = {
  // `relative flex flex-col gap-(--gap) overflow-hidden bg-muted dark:bg-background`, its sides
  // the home band's (the switch above it is the home page's).
  // The frame's height exactly, the rest clipped as upstream's band clips its columns: the frame
  // never scrolls (the home page fades its foot). A card's edge clears the frame's top.
  demo: css({
    position: "relative",
    overflow: "hidden",
    height: "100vh",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    paddingTop: space[1],
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
    top: space[1],
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

@Component({
  selector: "preview-showcase",
  imports: [
    AccountAccess,
    AnalyticsCard,
    ChatCard,
    ClaimableBalance,
    ContributionHistory,
    DividendIncome,
    EmptyDistributeTrack,
    NewMilestone,
    NotificationSettings,
    Payments,
    PayoutThreshold,
    PowerUsage,
    QrConnect,
    SavingsTargets,
    SidebarNav,
    TransferFunds,
    UIElements,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <main [sx]="styles.demo" data-showcase="">
      <div [sx]="styles.rails" aria-hidden="true" inert>
        <div [sx]="[styles.rail, styles.railStart]">
          <div [sx]="styles.railColumn">
            <kui-contribution-history />
            <kui-claimable-balance />
            <kui-dividend-income />
            <kui-payout-threshold />
          </div>
          <div [sx]="styles.railColumn">
            <kui-ui-elements />
            <kui-savings-targets />
            <kui-new-milestone />
            <kui-account-access />
          </div>
        </div>
        <div [sx]="[styles.rail, styles.railEnd]">
          <div [sx]="styles.railColumn">
            <kui-new-milestone />
            <kui-payout-threshold />
            <kui-qr-connect />
            <kui-transfer-funds />
          </div>
          <div [sx]="styles.railColumn">
            <kui-payments />
            <kui-empty-distribute-track />
            <kui-analytics-card />
            <kui-notification-settings />
            <kui-power-usage />
          </div>
        </div>
      </div>
      <div [sx]="styles.grid">
        <div [sx]="styles.column">
          <kui-ui-elements />
          <kui-sidebar-nav />
          <kui-savings-targets />
        </div>
        <div [sx]="[styles.column, styles.fromLg]">
          <kui-contribution-history />
          <kui-claimable-balance />
          <kui-dividend-income />
        </div>
        <div [sx]="[styles.column, styles.from1400]">
          <kui-new-milestone />
          <kui-payout-threshold />
          <kui-account-access />
        </div>
        <div [sx]="[styles.column, styles.fromMd]">
          <kui-qr-connect />
          <kui-chat-card />
          <kui-payments />
        </div>
        <div [sx]="[styles.column, styles.from1900]">
          <kui-empty-distribute-track />
          <kui-analytics-card />
          <kui-notification-settings />
          <kui-power-usage />
        </div>
      </div>
    </main>
  `,
})
export class Showcase {
  protected readonly styles = styles
}
