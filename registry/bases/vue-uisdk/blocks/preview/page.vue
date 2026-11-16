<script setup lang="ts">
import ActivateAgentDialog from "./cards/ActivateAgentDialog.vue"
import AnalyticsCard from "./cards/AnalyticsCard.vue"
import AnomalyAlert from "./cards/AnomalyAlert.vue"
import BarChartCard from "./cards/BarChartCard.vue"
import BookAppointment from "./cards/BookAppointment.vue"
import CodespacesCard from "./cards/CodespacesCard.vue"
import ContributionsActivity from "./cards/ContributionsActivity.vue"
import Contributors from "./cards/Contributors.vue"
import EnvironmentVariables from "./cards/EnvironmentVariables.vue"
import FeedbackForm from "./cards/FeedbackForm.vue"
import FileUpload from "./cards/FileUpload.vue"
import GithubProfile from "./cards/GithubProfile.vue"
import IconPreviewGrid from "./cards/IconPreviewGrid.vue"
import InviteTeam from "./cards/InviteTeam.vue"
import Invoice from "./cards/Invoice.vue"
import LiveWaveformCard from "./cards/LiveWaveformCard.vue"
import NoTeamMembers from "./cards/NoTeamMembers.vue"
import NotFound from "./cards/NotFound.vue"
import ObservabilityCard from "./cards/ObservabilityCard.vue"
import PieChartCard from "./cards/PieChartCard.vue"
import ReportBug from "./cards/ReportBug.vue"
import ShippingAddress from "./cards/ShippingAddress.vue"
import Shortcuts from "./cards/Shortcuts.vue"
import SkeletonLoading from "./cards/SkeletonLoading.vue"
import SleepReport from "./cards/SleepReport.vue"
import StyleOverview from "./cards/StyleOverview.vue"
import TypographySpecimen from "./cards/TypographySpecimen.vue"
import UIElements from "./cards/UIElements.vue"
import UsageCard from "./cards/UsageCard.vue"
import Visitors from "./cards/Visitors.vue"
import WeeklyFitnessSummary from "./cards/WeeklyFitnessSummary.vue"
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

<template>
  <div :sx="styles.div">
    <div :sx="styles.div2">
      <div :sx="styles.captureTarget" data-slot="capture-target">
        <div :sx="styles.div3">
          <StyleOverview />
          <TypographySpecimen />
          <div :sx="styles.div4">
            <UIElements />
          </div>
          <CodespacesCard />
          <Invoice />
        </div>
        <div :sx="styles.div5">
          <IconPreviewGrid />
          <div :sx="styles.div6">
            <UIElements />
          </div>
          <ObservabilityCard />
          <ShippingAddress />
        </div>
        <div :sx="styles.div7">
          <EnvironmentVariables />
          <BarChartCard />
          <InviteTeam />
          <ActivateAgentDialog />
        </div>
        <div :sx="styles.div8">
          <SkeletonLoading />
          <PieChartCard />
          <NoTeamMembers />
          <ReportBug />
          <Contributors />
        </div>
        <div :sx="styles.div9">
          <FeedbackForm />
          <BookAppointment />
          <SleepReport />
          <GithubProfile />
        </div>
        <div :sx="styles.div10">
          <WeeklyFitnessSummary />
          <FileUpload />
          <AnalyticsCard />
          <UsageCard />
          <Shortcuts />
        </div>
        <div :sx="styles.div11">
          <AnomalyAlert />
          <LiveWaveformCard />
          <Visitors />
          <ContributionsActivity />
          <NotFound />
        </div>
      </div>
    </div>
  </div>
</template>
