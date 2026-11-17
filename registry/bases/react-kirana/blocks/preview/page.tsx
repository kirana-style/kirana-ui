"use client"

import { ActivateAgentDialog } from "./cards/activate-agent-dialog"
import { AnalyticsCard } from "./cards/analytics-card"
import { AnomalyAlert } from "./cards/anomaly-alert"
import { BarChartCard } from "./cards/bar-chart-card"
import { BookAppointment } from "./cards/book-appointment"
import { CodespacesCard } from "./cards/codespaces-card"
import { ContributionsActivity } from "./cards/contributions-activity"
import { Contributors } from "./cards/contributors"
import { EnvironmentVariables } from "./cards/environment-variables"
import { FeedbackForm } from "./cards/feedback-form"
import { FileUpload } from "./cards/file-upload"
import { GithubProfile } from "./cards/github-profile"
import { IconPreviewGrid } from "./cards/icon-preview-grid"
import { InviteTeam } from "./cards/invite-team"
import { Invoice } from "./cards/invoice"
import { LiveWaveformCard } from "./cards/live-waveform"
import { NoTeamMembers } from "./cards/no-team-members"
import { NotFound } from "./cards/not-found"
import { ObservabilityCard } from "./cards/observability-card"
import { PieChartCard } from "./cards/pie-chart-card"
import { ReportBug } from "./cards/report-bug"
import { ShippingAddress } from "./cards/shipping-address"
import { Shortcuts } from "./cards/shortcuts"
import { SkeletonLoading } from "./cards/skeleton-loading"
import { SleepReport } from "./cards/sleep-report"
import { StyleOverview } from "./cards/style-overview"
import { TypographySpecimen } from "./cards/typography-specimen"
import { UIElements } from "./cards/ui-elements"
import { UsageCard } from "./cards/usage-card"
import { Visitors } from "./cards/visitors"
import { WeeklyFitnessSummary } from "./cards/weekly-fitness-summary"
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

export default function PreviewExample() {
  return (
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
  )
}
