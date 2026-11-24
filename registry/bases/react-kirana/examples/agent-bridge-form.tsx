"use client"

/**
 * A project's settings, with the agent bridge on the page as an app would have it (`window.agent`,
 * and the browser's own agent where it has WebMCP). The screen the bridge's benchmark is run on
 * (`benchmarks/agent`): eight ordinary controls and a Save that writes what the form holds beside
 * it, so a run can be checked. Nothing here is for the benchmark alone but that line of output.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { createAgent, registerTools } from "@kirana-ui/react/agent"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { fontFamily, fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const REGIONS = [
  { label: "Frankfurt", value: "frankfurt" },
  { label: "Singapore", value: "singapore" },
  { label: "Sydney", value: "sydney" },
  { label: "Virginia", value: "virginia" },
]
const VISIBILITY = [
  { label: "Private", value: "private" },
  { label: "Team", value: "team" },
  { label: "Public", value: "public" },
]

const styles = {
  card: css({ width: "100%", maxWidth: "34rem" }),
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[4],
  }),
  footer: css({ justifyContent: "space-between", gap: space[3] }),
  saved: css({
    minWidth: 0,
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    overflowWrap: "anywhere",
  }),
}

type Settings = {
  name: string
  description: string
  region: string
  visibility: string
  alerts: boolean
  digest: boolean
  review: boolean
  retention: string
}

const START: Settings = {
  name: "Apollo",
  description: "",
  region: "frankfurt",
  visibility: "private",
  alerts: false,
  digest: true,
  review: false,
  retention: "30",
}

export default function AgentBridgeForm() {
  const [settings, setSettings] = React.useState(START)
  const [saved, setSaved] = React.useState<Settings | null>(null)
  const set = <Key extends keyof Settings>(key: Key, value: Settings[Key]) =>
    setSettings((held) => ({ ...held, [key]: value }))

  React.useEffect(() => {
    const agent = createAgent()
    ;(window as unknown as { agent: typeof agent }).agent = agent
    // Where the browser has an agent of its own, it gets the same three tools.
    return registerTools(agent, { allow: () => true })
  }, [])

  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>
            How the project is named, where it runs and who is told.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="settings-name">Project name</FieldLabel>
              <Input
                id="settings-name"
                value={settings.name}
                onChange={(event) => set("name", event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-description">
                Description
              </FieldLabel>
              <Textarea
                id="settings-description"
                value={settings.description}
                onChange={(event) => set("description", event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-region">Region</FieldLabel>
              <Select
                items={REGIONS}
                value={settings.region}
                onValueChange={(value) => set("region", String(value))}
              >
                <SelectTrigger id="settings-region">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {REGIONS.map((each) => (
                      <SelectItem key={each.value} value={each.value}>
                        {each.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-visibility">Visibility</FieldLabel>
              <Select
                items={VISIBILITY}
                value={settings.visibility}
                onValueChange={(value) => set("visibility", String(value))}
              >
                <SelectTrigger id="settings-visibility">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {VISIBILITY.map((each) => (
                      <SelectItem key={each.value} value={each.value}>
                        {each.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-retention">
                Retention in days
              </FieldLabel>
              <Input
                id="settings-retention"
                type="number"
                min={7}
                max={365}
                value={settings.retention}
                onChange={(event) => set("retention", event.target.value)}
              />
            </Field>
            {/* PF-058: a label's `for` reaches a switch's or a checkbox's hidden input, not the
                element with its role, so each is named here itself. */}
            <Field>
              <div sx={styles.row}>
                <FieldLabel
                  id="settings-alerts-label"
                  htmlFor="settings-alerts"
                >
                  Alerts
                </FieldLabel>
                <Switch
                  id="settings-alerts"
                  aria-labelledby="settings-alerts-label"
                  checked={settings.alerts}
                  onCheckedChange={(checked) => set("alerts", checked)}
                />
              </div>
            </Field>
            <Field>
              <div sx={styles.row}>
                <FieldLabel
                  id="settings-digest-label"
                  htmlFor="settings-digest"
                >
                  Weekly digest
                </FieldLabel>
                <Switch
                  id="settings-digest"
                  aria-labelledby="settings-digest-label"
                  checked={settings.digest}
                  onCheckedChange={(checked) => set("digest", checked)}
                />
              </div>
            </Field>
            <Field>
              <div sx={styles.row}>
                <FieldLabel
                  id="settings-review-label"
                  htmlFor="settings-review"
                >
                  Require a review before deploys
                </FieldLabel>
                <Checkbox
                  id="settings-review"
                  aria-labelledby="settings-review-label"
                  checked={settings.review}
                  onCheckedChange={(checked) => set("review", checked === true)}
                />
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter sx={styles.footer}>
          <output
            sx={styles.saved}
            data-saved={saved ? JSON.stringify(saved) : undefined}
            aria-live="polite"
          >
            {saved ? "Saved." : "Not saved yet."}
          </output>
          <Button type="button" onClick={() => setSaved(settings)}>
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
