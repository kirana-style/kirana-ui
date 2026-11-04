import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, lineHeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const styles = {
  tabs: css({
    width: { "*": null, base: "400px" },
  }),
  cardContent: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  cardContent2: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  cardContent3: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  cardContent4: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "tabs-demo",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTabs defaultValue="overview" [sx]="styles.tabs">
        <div kuiTabsList>
          <button kuiTabsTrigger value="overview">Overview</button>
          <button kuiTabsTrigger value="analytics">Analytics</button>
          <button kuiTabsTrigger value="reports">Reports</button>
          <button kuiTabsTrigger value="settings">Settings</button>
        </div>
        <div kuiTabsContent value="overview">
          <div kuiCard>
            <div kuiCardHeader>
              <div kuiCardTitle>Overview</div>
              <div kuiCardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </div>
            </div>
            <div kuiCardContent [sx]="styles.cardContent">
              You have 12 active projects and 3 pending tasks.
            </div>
          </div>
        </div>
        <div kuiTabsContent value="analytics">
          <div kuiCard>
            <div kuiCardHeader>
              <div kuiCardTitle>Analytics</div>
              <div kuiCardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </div>
            </div>
            <div kuiCardContent [sx]="styles.cardContent2">
              Page views are up 25% compared to last month.
            </div>
          </div>
        </div>
        <div kuiTabsContent value="reports">
          <div kuiCard>
            <div kuiCardHeader>
              <div kuiCardTitle>Reports</div>
              <div kuiCardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </div>
            </div>
            <div kuiCardContent [sx]="styles.cardContent3">
              You have 5 reports ready and available to export.
            </div>
          </div>
        </div>
        <div kuiTabsContent value="settings">
          <div kuiCard>
            <div kuiCardHeader>
              <div kuiCardTitle>Settings</div>
              <div kuiCardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </div>
            </div>
            <div kuiCardContent [sx]="styles.cardContent4">
              Configure notifications, security, and themes.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TabsDemo {
  protected readonly styles = styles
  protected readonly page = page
}
