import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../../core/axes"
import { theme } from "../../../../core/tokens"
import { breakpoint, space, spacing } from "../../../../core/scales"
import { AccountAccess } from "./cards/account-access"
import { CardOverview } from "./cards/card-overview"
import { ClaimableBalance } from "./cards/claimable-balance"
import { ContributionHistory } from "./cards/contribution-history"
import { CoverArt } from "./cards/cover-art"
import { DividendIncome } from "./cards/dividend-income"
import { EmptyConnectBank } from "./cards/empty-connect-bank"
import { EmptyDistributeTrack } from "./cards/empty-distribute-track"
import { EmptyExploreCatalog } from "./cards/empty-explore-catalog"
import { Faq } from "./cards/faq"
import { FrontDoor } from "./cards/front-door"
import { IndexInvesting } from "./cards/index-investing"
import { KitchenIsland } from "./cards/kitchen-island"
import { LoadingCard } from "./cards/loading-card"
import { NewMilestone } from "./cards/new-milestone"
import { NotificationSettings } from "./cards/notification-settings"
import { Payments } from "./cards/payments"
import { PayoutThreshold } from "./cards/payout-threshold"
import { PowerUsage } from "./cards/power-usage"
import { Preferences } from "./cards/preferences"
import { QrConnect } from "./cards/qr-connect"
import { ReceivingMethod } from "./cards/receiving-method"
import { RecentTransactions } from "./cards/recent-transactions"
import { ReleaseCatalog } from "./cards/release-catalog"
import { RollerShades } from "./cards/roller-shades"
import { SavingsProgress } from "./cards/savings-progress"
import { SavingsTargets } from "./cards/savings-targets"
import { SidebarNav } from "./cards/sidebar-nav"
import { SocialLinks } from "./cards/social-links"
import { StockPerformance } from "./cards/stock-performance"
import { SyncingState } from "./cards/syncing-state"
import { TransferFunds } from "./cards/transfer-funds"
import { UpcomingPayments } from "./cards/upcoming-payments"

const styles = {
  div: css({
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    contain: "paint",
    "--gap": {
      base: spacing(4),
      [breakpoint.md]: spacing(10),
      [axes.style.lyra]: {
        [breakpoint.md]: spacing(6),
      },
      [axes.style.mira]: {
        [breakpoint.md]: spacing(6),
      },
    },
  }),
  div2: css({
    display: "flex",
    width: "100%",
    minWidth: "max-content",
    justifyContent: "center",
  }),
  captureTarget: css({
    display: "grid",
    width: {
      base: "2400px",
      [breakpoint.md]: "3000px",
      [axes.style.lyra]: { [breakpoint.md]: "2600px" },
      [axes.style.mira]: { [breakpoint.md]: "2600px" },
    },
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    alignItems: "flex-start",
    rowGap: "var(--gap)",
    columnGap: "var(--gap)",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    paddingBlockStart: "var(--gap)",
    paddingBlockEnd: "var(--gap)",
    paddingInlineStart: "var(--gap)",
    paddingInlineEnd: "var(--gap)",
    [select.child("div")]: {
      rowGap: "var(--gap)",
      columnGap: "var(--gap)",
    },
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    padding: space[1],
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  }),
  div4: css({
    display: "flex",
    flexDirection: "column",
    padding: space[1],
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  }),
  div5: css({
    gridColumn: "span 2 / span 2",
    display: "flex",
    flexDirection: "column",
    padding: space[1],
    containIntrinsicSize: "760px 1200px",
    contentVisibility: "auto",
  }),
  div6: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "flex-start",
    rowGap: "var(--gap)",
    columnGap: "var(--gap)",
  }),
  div7: css({
    display: "flex",
    flexDirection: "column",
    rowGap: "var(--gap)",
    columnGap: "var(--gap)",
  }),
  div8: css({
    display: "flex",
    flexDirection: "column",
    rowGap: "var(--gap)",
    columnGap: "var(--gap)",
  }),
  div9: css({
    display: "flex",
    flexDirection: "column",
    padding: space[1],
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  }),
  div10: css({
    display: "flex",
    flexDirection: "column",
    padding: space[1],
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  }),
  div11: css({
    display: "flex",
    flexDirection: "column",
    padding: space[1],
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  }),
}

@Component({
  selector: "preview-02",
  imports: [
    AccountAccess,
    CardOverview,
    ClaimableBalance,
    ContributionHistory,
    CoverArt,
    DividendIncome,
    EmptyConnectBank,
    EmptyDistributeTrack,
    EmptyExploreCatalog,
    Faq,
    FrontDoor,
    IndexInvesting,
    KitchenIsland,
    LoadingCard,
    NewMilestone,
    NotificationSettings,
    Payments,
    PayoutThreshold,
    PowerUsage,
    Preferences,
    QrConnect,
    ReceivingMethod,
    RecentTransactions,
    ReleaseCatalog,
    RollerShades,
    SavingsProgress,
    SavingsTargets,
    SidebarNav,
    SocialLinks,
    StockPerformance,
    SyncingState,
    TransferFunds,
    UpcomingPayments,
    SxDirective,
  ],
  template: `
    <div [sx]="styles.div">
      <div [sx]="styles.div2">
        <div [sx]="styles.captureTarget" data-slot="capture-target">
          <div [sx]="styles.div3">
            <kui-contribution-history />
            <kui-empty-distribute-track />
            <kui-qr-connect />
            <kui-dividend-income />
            <kui-index-investing />
            <kui-syncing-state />
          </div>
          <div [sx]="styles.div4">
            <kui-payout-threshold />
            <kui-claimable-balance />
            <kui-preferences />
            <kui-savings-progress />
            <kui-kitchen-island />
          </div>
          <div [sx]="styles.div5">
            <kui-savings-targets />
            <kui-recent-transactions />
            <div [sx]="styles.div6">
              <div [sx]="styles.div7">
                <kui-sidebar-nav />
                <kui-faq />
              </div>
              <div [sx]="styles.div8">
                <kui-payments />
                <kui-front-door />
              </div>
            </div>
            <kui-release-catalog />
          </div>
          <div [sx]="styles.div9">
            <kui-account-access />
            <kui-card-overview />
            <kui-transfer-funds />
            <kui-cover-art />
            <kui-loading-card />
          </div>
          <div [sx]="styles.div10">
            <kui-receiving-method />
            <kui-power-usage />
            <kui-empty-connect-bank />
            <kui-upcoming-payments />
            <kui-roller-shades />
          </div>
          <div [sx]="styles.div11">
            <kui-stock-performance />
            <kui-empty-explore-catalog />
            <kui-new-milestone />
            <kui-social-links />
            <kui-notification-settings />
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class Preview02 {
  protected readonly styles = styles
}
