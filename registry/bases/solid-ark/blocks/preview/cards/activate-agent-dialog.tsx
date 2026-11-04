import { For, Show } from "solid-js"
import { css, props as styleProps, select } from "@kirana-style/core"
import { Alert, AlertDescription } from "../../../ui/alert"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontWeight, leading, space } from "../../../../../core/scales"

export function ActivateAgentDialog() {
  const styles = {
    // Over the secondary badge in every style, Sera's transparent one too: upstream's utilities beat
    // the badge's per-style rules.
    badge: css({
      backgroundColor: { "*": null, base: theme.chart1 },
      color: { "*": null, base: theme.chart5 },
    }),
    cardContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[4] },
    }),
    itemGroup: css({
      gap: { "*": null, base: space["0"] },
    }),
    item: css({
      paddingInline: { "*": null, base: space["0"] },
    }),
    itemMedia: css({
      alignSelf: { "*": null, base: "flex-start" },
    }),
    iconPlaceholder: css({
      width: space[5],
      height: space[5],
      fill: theme.primary,
      color: theme.primaryForeground,
    }),
    itemTitle: css({
      display: { "*": null, base: "inline" },
      lineHeight: { "*": null, base: leading.relaxed },
      fontWeight: { "*": null, base: fontWeight.normal },
      color: theme.mutedForeground,
      [select.child("strong")]: {
        fontWeight: fontWeight.medium,
        color: theme.foreground,
      },
    }),
    cardFooter: css({
      justifyContent: { "*": null, base: "flex-end" },
      gap: { "*": null, base: space[2] },
    }),
    button: css({
      display: { [axes.style.sera]: "none" },
    }),
    button2: css({
      width: { [axes.style.sera]: "100%" },
    }),
  }

  // Each feature's text as runs, the bold ones `strong`, and the badge one of them closes on.
  const agentFeatures = [
    {
      id: "code-reviews",
      runs: [
        { text: "Code reviews", strong: true },
        { text: " with full codebase context to catch " },
        { text: "hard-to-find", strong: true },
        { text: " bugs." },
      ],
    },
    {
      id: "code-suggestions",
      runs: [
        { text: "Code suggestions", strong: true },
        { text: " validated in sandboxes before you merge." },
      ],
    },
    {
      id: "root-cause",
      runs: [
        { text: "Root-cause analysis", strong: true },
        { text: " for production issues with deployment context. " },
      ],
      badge: "Requires Observability Plus",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship faster & safer with Vercel Agent</CardTitle>
        <CardDescription>
          Your use is subject to Vercel's <a href="#">Public Beta Agreement</a>{" "}
          and <a href="#">AI Product Terms</a> .
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ItemGroup sx={styles.itemGroup}>
          <For each={agentFeatures}>
            {(feature) => (
              <Item size="xs" sx={styles.item}>
                <ItemMedia variant="icon" sx={styles.itemMedia}>
                  <IconPlaceholder
                    lucide="CheckCircle2Icon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle02Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleLine"
                    {...styleProps(styles.iconPlaceholder)}
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle sx={styles.itemTitle}>
                    <For each={feature.runs}>
                      {(run) => (
                        <>
                          {run.strong ? <strong>{run.text}</strong> : run.text}
                        </>
                      )}
                    </For>
                    <Show when={feature.badge}>
                      <Badge variant="secondary" sx={styles.badge}>
                        {feature.badge}
                      </Badge>
                    </Show>
                  </ItemTitle>
                </ItemContent>
              </Item>
            )}
          </For>
        </ItemGroup>
        <Alert>
          <AlertDescription>
            Pro teams get $100 in Vercel Agent trial credit for 2 weeks after
            activation.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button variant="outline" sx={styles.button}>
          Cancel
        </Button>
        <Button sx={styles.button2}>Enable with $100 credits</Button>
      </CardFooter>
    </Card>
  )
}
