"use client"

/**
 * The agent bridge, live: a settings form on the left, and on the right what an agent reads from it
 * (`snapshot()`, as it changes) and a script of steps a reader starts with a button. No model runs:
 * the steps are fixed, and they go through `act` exactly as a model's tool calls would. The last
 * step presses a button marked `data-agent-confirm`, so the person is asked; the token is a
 * password, so it is read back as redacted; and Undo takes the agent's changes back.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { createAgent } from "@kirana-ui/react/agent"
import type { Agent, AgentComponent, AgentStep } from "@kirana-ui/react/agent"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
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
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const REGIONS = [
  { label: "Frankfurt", value: "frankfurt" },
  { label: "Singapore", value: "singapore" },
  { label: "Virginia", value: "virginia" },
]

/** What the agent is asked to do, one step at a time: each is what a model's `act` call holds. */
const STEPS: AgentStep[] = [
  { ref: "Project name", action: "setValue", args: ["Atlas"] },
  { ref: "Region", action: "setValue", args: ["singapore"] },
  { ref: "Alerts", action: "toggle" },
  { ref: "Retention in days", action: "setValue", args: ["90"] },
  { ref: "Delete project", action: "press" },
]

const styles = {
  layout: css({
    display: "grid",
    alignItems: "start",
    gap: space[4],
    width: "100%",
    maxWidth: "60rem",
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "minmax(0, 1fr) minmax(0, 1fr)",
    },
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[4],
  }),
  footer: css({ justifyContent: "space-between", gap: space[2] }),
  note: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  actions: css({ display: "flex", flexWrap: "wrap", gap: space[2] }),
  panel: css({ display: "grid", gap: space[4] }),
  legend: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  }),
  lines: css({
    display: "grid",
    gap: space[1],
    margin: 0,
    padding: space[3],
    minHeight: "6.5rem",
    listStyleType: "none",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.muted,
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: "1.6",
    overflowWrap: "anywhere",
  }),
  line: css({ display: "flex", gap: space[2] }),
  ok: css({ color: theme.foreground }),
  refused: css({ color: theme.destructive }),
  quiet: css({ color: theme.mutedForeground }),
  key: css({ color: theme.mutedForeground, flexShrink: 0 }),
}

type Line = { text: string; refused?: boolean }

/** A component as one line: what an agent is given for it, less the list of its actions. */
function seen(component: AgentComponent): string {
  const { actions: _actions, items: _items, ...rest } = component
  return JSON.stringify(rest)
}

export default function AgentBridgeDemo() {
  // The form is made again on Reset, and the bridge with it: its root is the form alone, so the
  // panel's own buttons are not something the agent can see or press.
  const [round, setRound] = React.useState(0)
  const form = React.useRef<HTMLDivElement>(null)
  const agent = React.useRef<Agent | null>(null)
  const [snapshot, setSnapshot] = React.useState<AgentComponent[]>([])
  const [log, setLog] = React.useState<Line[]>([])
  const [running, setRunning] = React.useState(false)
  const [deleted, setDeleted] = React.useState(false)
  // The question a marked step asks, and how the person's answer reaches the bridge.
  const [question, setQuestion] = React.useState<string | null>(null)
  const answer = React.useRef<(yes: boolean) => void>(() => {})

  React.useEffect(() => {
    if (!form.current) return
    const made = createAgent({
      root: form.current,
      // The policy: this agent works the form's controls and nothing else.
      allow: (action) => action.component !== "menu-item",
      // A person's answer, for a step on something marked `data-agent-confirm`.
      confirm: (action) =>
        new Promise<boolean>((resolve) => {
          answer.current = resolve
          setQuestion(action.confirm)
        }),
    })
    agent.current = made
    setSnapshot(made.snapshot())
    const stop = made.subscribe(() => setSnapshot(made.snapshot()))
    return () => {
      stop()
      agent.current = null
    }
  }, [round])

  const say = (line: Line) => setLog((lines) => [...lines, line])

  const run = async () => {
    const bridge = agent.current
    if (!bridge) return
    setRunning(true)
    setLog([])
    for (const step of STEPS) {
      const call = `${step.action}(${[JSON.stringify(step.ref), ...(step.args ?? []).map((arg) => JSON.stringify(arg))].join(", ")})`
      const result = await bridge.act({ steps: [step] })
      say(
        result.ok
          ? { text: call }
          : { text: `${call}: ${result.error}`, refused: true }
      )
      setSnapshot(bridge.snapshot())
      await new Promise((resolve) => setTimeout(resolve, 450))
    }
    setRunning(false)
  }

  const undo = async () => {
    const bridge = agent.current
    if (!bridge) return
    setRunning(true)
    // Each change the agent made, newest first, through the same handlers.
    for (let left = bridge.history().length; left > 0; left--) {
      const result = await bridge.undo()
      if (!result.ok) break
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
    say({ text: "undo(): the agent's changes taken back" })
    setSnapshot(bridge.snapshot())
    setRunning(false)
  }

  const reset = () => {
    setLog([])
    setDeleted(false)
    setRound((value) => value + 1)
  }

  const reply = (yes: boolean) => {
    setQuestion(null)
    answer.current(yes)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.layout}>
        <Card key={round} ref={form}>
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>
              A form like any other. Change it yourself, or let the agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="bridge-name">Project name</FieldLabel>
                <Input id="bridge-name" defaultValue="Apollo" />
              </Field>
              <Field>
                <FieldLabel htmlFor="bridge-region">Region</FieldLabel>
                <Select items={REGIONS} defaultValue="frankfurt">
                  <SelectTrigger id="bridge-region">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {REGIONS.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <div sx={styles.row}>
                  <FieldLabel htmlFor="bridge-alerts">Alerts</FieldLabel>
                  <Switch id="bridge-alerts" />
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="bridge-retention">
                  Retention in days
                </FieldLabel>
                <Input
                  id="bridge-retention"
                  type="number"
                  min={7}
                  max={365}
                  defaultValue={30}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="bridge-token">API token</FieldLabel>
                <Input
                  id="bridge-token"
                  type="password"
                  defaultValue="kui_live_5f3a9c"
                  autoComplete="off"
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter sx={styles.footer}>
            <span sx={styles.note} aria-live="polite">
              {deleted ? "Deleted (not really)." : "Nothing is saved."}
            </span>
            <Button
              type="button"
              variant="destructive"
              data-agent-confirm="Deletes the project and its files"
              onClick={() => setDeleted(true)}
            >
              Delete project
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>The agent</CardTitle>
            <CardDescription>
              Five fixed steps through <code>agent.act()</code>. No model, no
              screenshots.
            </CardDescription>
          </CardHeader>
          <CardContent sx={styles.panel}>
            <div sx={styles.actions}>
              <Button type="button" onClick={run} disabled={running}>
                Run the steps
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={undo}
                disabled={running}
              >
                Undo
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={reset}
                disabled={running}
              >
                Reset
              </Button>
            </div>
            <div>
              <p sx={styles.legend}>What it did</p>
              <ol sx={styles.lines} aria-live="polite">
                {log.length === 0 ? (
                  <li sx={styles.quiet}>Nothing yet.</li>
                ) : (
                  log.map((line, index) => (
                    <li
                      key={index}
                      sx={[
                        styles.line,
                        line.refused ? styles.refused : styles.ok,
                      ]}
                    >
                      <span sx={styles.key}>{index + 1}</span>
                      {line.text}
                    </li>
                  ))
                )}
              </ol>
            </div>
            <div>
              <p sx={styles.legend}>
                What it sees
                <Badge variant="outline">snapshot()</Badge>
              </p>
              <ul sx={styles.lines}>
                {snapshot.map((component) => (
                  <li key={component.ref}>{seen(component)}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={question !== null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>The agent is asking</AlertDialogTitle>
            <AlertDialogDescription>
              {question}. This step is marked as needing a person, so the agent
              cannot answer it itself.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reply(false)}>
              No
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => reply(true)}>
              Yes, let it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
