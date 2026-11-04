<script lang="ts">
  import AccountAccess from "./cards/AccountAccess.svelte"
  import CardOverview from "./cards/CardOverview.svelte"
  import ClaimableBalance from "./cards/ClaimableBalance.svelte"
  import ContributionHistory from "./cards/ContributionHistory.svelte"
  import CoverArt from "./cards/CoverArt.svelte"
  import DividendIncome from "./cards/DividendIncome.svelte"
  import EmptyConnectBank from "./cards/EmptyConnectBank.svelte"
  import EmptyDistributeTrack from "./cards/EmptyDistributeTrack.svelte"
  import EmptyExploreCatalog from "./cards/EmptyExploreCatalog.svelte"
  import Faq from "./cards/Faq.svelte"
  import FrontDoor from "./cards/FrontDoor.svelte"
  import IndexInvesting from "./cards/IndexInvesting.svelte"
  import KitchenIsland from "./cards/KitchenIsland.svelte"
  import LoadingCard from "./cards/LoadingCard.svelte"
  import NewMilestone from "./cards/NewMilestone.svelte"
  import NotificationSettings from "./cards/NotificationSettings.svelte"
  import Payments from "./cards/Payments.svelte"
  import PayoutThreshold from "./cards/PayoutThreshold.svelte"
  import PowerUsage from "./cards/PowerUsage.svelte"
  import Preferences from "./cards/Preferences.svelte"
  import QrConnect from "./cards/QrConnect.svelte"
  import ReceivingMethod from "./cards/ReceivingMethod.svelte"
  import RecentTransactions from "./cards/RecentTransactions.svelte"
  import ReleaseCatalog from "./cards/ReleaseCatalog.svelte"
  import RollerShades from "./cards/RollerShades.svelte"
  import SavingsProgress from "./cards/SavingsProgress.svelte"
  import SavingsTargets from "./cards/SavingsTargets.svelte"
  import SidebarNav from "./cards/SidebarNav.svelte"
  import SocialLinks from "./cards/SocialLinks.svelte"
  import StockPerformance from "./cards/StockPerformance.svelte"
  import SyncingState from "./cards/SyncingState.svelte"
  import TransferFunds from "./cards/TransferFunds.svelte"
  import UpcomingPayments from "./cards/UpcomingPayments.svelte"
  import { css, select } from "@kirana-style/core"
  import { axes } from "../../../../core/axes"
  import { theme } from "../../../../core/tokens"
  import { breakpoint, space, spacing } from "../../../../core/scales"

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
</script>

<div sx={styles.div}>
  <div sx={styles.div2}>
    <div sx={styles.captureTarget} data-slot="capture-target">
      <div sx={styles.div3}>
        <ContributionHistory />
        <EmptyDistributeTrack />
        <QrConnect />
        <DividendIncome />
        <IndexInvesting />
        <SyncingState />
      </div>
      <div sx={styles.div4}>
        <PayoutThreshold />
        <ClaimableBalance />
        <Preferences />
        <SavingsProgress />
        <KitchenIsland />
      </div>
      <div sx={styles.div5}>
        <SavingsTargets />
        <RecentTransactions />
        <div sx={styles.div6}>
          <div sx={styles.div7}>
            <SidebarNav />
            <Faq />
          </div>
          <div sx={styles.div8}>
            <Payments />
            <FrontDoor />
          </div>
        </div>
        <ReleaseCatalog />
      </div>
      <div sx={styles.div9}>
        <AccountAccess />
        <CardOverview />
        <TransferFunds />
        <CoverArt />
        <LoadingCard />
      </div>
      <div sx={styles.div10}>
        <ReceivingMethod />
        <PowerUsage />
        <EmptyConnectBank />
        <UpcomingPayments />
        <RollerShades />
      </div>
      <div sx={styles.div11}>
        <StockPerformance />
        <EmptyExploreCatalog />
        <NewMilestone />
        <SocialLinks />
        <NotificationSettings />
      </div>
    </div>
  </div>
</div>
