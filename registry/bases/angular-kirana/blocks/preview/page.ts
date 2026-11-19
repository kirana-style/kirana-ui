import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../../core/axes"
import { theme } from "../../../../core/tokens"
import { breakpoint, space, spacing } from "../../../../core/scales"
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
import { LiveWaveformCard } from "./cards/live-waveform-card"
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
import { UiElements } from "./cards/ui-elements"
import { UsageCard } from "./cards/usage-card"
import { Visitors } from "./cards/visitors"
import { WeeklyFitnessSummary } from "./cards/weekly-fitness-summary"

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

@Component({
  selector: "preview",
  imports: [
    ActivateAgentDialog,
    AnalyticsCard,
    AnomalyAlert,
    BarChartCard,
    BookAppointment,
    CodespacesCard,
    ContributionsActivity,
    Contributors,
    EnvironmentVariables,
    FeedbackForm,
    FileUpload,
    GithubProfile,
    IconPreviewGrid,
    InviteTeam,
    Invoice,
    LiveWaveformCard,
    NoTeamMembers,
    NotFound,
    ObservabilityCard,
    PieChartCard,
    ReportBug,
    ShippingAddress,
    Shortcuts,
    SkeletonLoading,
    SleepReport,
    StyleOverview,
    TypographySpecimen,
    UiElements,
    UsageCard,
    Visitors,
    WeeklyFitnessSummary,
    SxDirective,
  ],
  template: `
    <div [sx]="styles.div">
      <div [sx]="styles.div2">
        <div [sx]="styles.captureTarget" data-slot="capture-target">
          <div [sx]="styles.div3">
            <kui-style-overview />
            <kui-typography-specimen />
            <div [sx]="styles.div4">
              <kui-ui-elements />
            </div>
            <kui-codespaces-card />
            <kui-invoice />
          </div>
          <div [sx]="styles.div5">
            <kui-icon-preview-grid />
            <div [sx]="styles.div6">
              <kui-ui-elements />
            </div>
            <kui-observability-card />
            <kui-shipping-address />
          </div>
          <div [sx]="styles.div7">
            <kui-environment-variables />
            <kui-bar-chart-card />
            <kui-invite-team />
            <kui-activate-agent-dialog />
          </div>
          <div [sx]="styles.div8">
            <kui-skeleton-loading />
            <kui-pie-chart-card />
            <kui-no-team-members />
            <kui-report-bug />
            <kui-contributors />
          </div>
          <div [sx]="styles.div9">
            <kui-feedback-form />
            <kui-book-appointment />
            <kui-sleep-report />
            <kui-github-profile />
          </div>
          <div [sx]="styles.div10">
            <kui-weekly-fitness-summary />
            <kui-file-upload />
            <kui-analytics-card />
            <kui-usage-card />
            <kui-shortcuts />
          </div>
          <div [sx]="styles.div11">
            <kui-anomaly-alert />
            <kui-live-waveform-card />
            <kui-visitors />
            <kui-contributions-activity />
            <kui-not-found />
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class Preview {
  protected readonly styles = styles
}
