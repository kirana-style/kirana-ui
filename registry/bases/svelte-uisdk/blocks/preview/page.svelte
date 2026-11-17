<script lang="ts">
  import ActivateAgentDialog from "./cards/ActivateAgentDialog.svelte"
  import AnalyticsCard from "./cards/AnalyticsCard.svelte"
  import AnomalyAlert from "./cards/AnomalyAlert.svelte"
  import BarChartCard from "./cards/BarChartCard.svelte"
  import BookAppointment from "./cards/BookAppointment.svelte"
  import CodespacesCard from "./cards/CodespacesCard.svelte"
  import ContributionsActivity from "./cards/ContributionsActivity.svelte"
  import Contributors from "./cards/Contributors.svelte"
  import EnvironmentVariables from "./cards/EnvironmentVariables.svelte"
  import FeedbackForm from "./cards/FeedbackForm.svelte"
  import FileUpload from "./cards/FileUpload.svelte"
  import GithubProfile from "./cards/GithubProfile.svelte"
  import IconPreviewGrid from "./cards/IconPreviewGrid.svelte"
  import InviteTeam from "./cards/InviteTeam.svelte"
  import Invoice from "./cards/Invoice.svelte"
  import LiveWaveformCard from "./cards/LiveWaveformCard.svelte"
  import NoTeamMembers from "./cards/NoTeamMembers.svelte"
  import NotFound from "./cards/NotFound.svelte"
  import ObservabilityCard from "./cards/ObservabilityCard.svelte"
  import PieChartCard from "./cards/PieChartCard.svelte"
  import ReportBug from "./cards/ReportBug.svelte"
  import ShippingAddress from "./cards/ShippingAddress.svelte"
  import Shortcuts from "./cards/Shortcuts.svelte"
  import SkeletonLoading from "./cards/SkeletonLoading.svelte"
  import SleepReport from "./cards/SleepReport.svelte"
  import StyleOverview from "./cards/StyleOverview.svelte"
  import TypographySpecimen from "./cards/TypographySpecimen.svelte"
  import UIElements from "./cards/UIElements.svelte"
  import UsageCard from "./cards/UsageCard.svelte"
  import Visitors from "./cards/Visitors.svelte"
  import WeeklyFitnessSummary from "./cards/WeeklyFitnessSummary.svelte"
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
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
    div4: css({
      display: { [breakpoint.md]: "none" },
    }),
    div5: css({
      display: "flex",
      flexDirection: "column",
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
    div6: css({
      display: { base: "none", [breakpoint.md]: "flex" },
      width: "100%",
    }),
    div7: css({
      display: "flex",
      flexDirection: "column",
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
    div8: css({
      display: "flex",
      flexDirection: "column",
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
    div9: css({
      display: "flex",
      flexDirection: "column",
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
    div10: css({
      display: "flex",
      flexDirection: "column",
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
    div11: css({
      display: "flex",
      flexDirection: "column",
      padding: space.px,
      containIntrinsicSize: "380px 1200px",
      contentVisibility: "auto",
    }),
  }
</script>

<div sx={styles.div}>
  <div sx={styles.div2}>
    <div sx={styles.captureTarget} data-slot="capture-target">
      <div sx={styles.div3}>
        <StyleOverview />
        <TypographySpecimen />
        <div sx={styles.div4}>
          <UIElements />
        </div>
        <CodespacesCard />
        <Invoice />
      </div>
      <div sx={styles.div5}>
        <IconPreviewGrid />
        <div sx={styles.div6}>
          <UIElements />
        </div>
        <ObservabilityCard />
        <ShippingAddress />
      </div>
      <div sx={styles.div7}>
        <EnvironmentVariables />
        <BarChartCard />
        <InviteTeam />
        <ActivateAgentDialog />
      </div>
      <div sx={styles.div8}>
        <SkeletonLoading />
        <PieChartCard />
        <NoTeamMembers />
        <ReportBug />
        <Contributors />
      </div>
      <div sx={styles.div9}>
        <FeedbackForm />
        <BookAppointment />
        <SleepReport />
        <GithubProfile />
      </div>
      <div sx={styles.div10}>
        <WeeklyFitnessSummary />
        <FileUpload />
        <AnalyticsCard />
        <UsageCard />
        <Shortcuts />
      </div>
      <div sx={styles.div11}>
        <AnomalyAlert />
        <LiveWaveformCard />
        <Visitors />
        <ContributionsActivity />
        <NotFound />
      </div>
    </div>
  </div>
</div>
