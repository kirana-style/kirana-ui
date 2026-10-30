import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, lineHeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function TabsDemo() {
  return (
    <div sx={page.example}>
      <Tabs defaultValue="overview" sx={styles.tabs}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.cardContent}>
              You have 12 active projects and 3 pending tasks.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.cardContent2}>
              Page views are up 25% compared to last month.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.cardContent3}>
              You have 5 reports ready and available to export.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.cardContent4}>
              Configure notifications, security, and themes.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
