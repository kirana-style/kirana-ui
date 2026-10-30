"use client"

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
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, select, props as styleProps } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontWeight, leading, space } from "../../../../../core/scales"

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

// Agent feature descriptions.
const agentFeatures = [
  {
    id: "code-reviews",
    content: (
      <>
        <strong>Code reviews</strong> with full codebase context to catch{" "}
        <strong>hard-to-find</strong> bugs.
      </>
    ),
  },
  {
    id: "code-suggestions",
    content: (
      <>
        <strong>Code suggestions</strong> validated in sandboxes before you
        merge.
      </>
    ),
  },
  {
    id: "root-cause",
    content: (
      <>
        <strong>Root-cause analysis</strong> for production issues with
        deployment context.{" "}
        <Badge variant="secondary" sx={styles.badge}>
          Requires Observability Plus
        </Badge>
      </>
    ),
  },
]

export function ActivateAgentDialog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship faster & safer with Vercel Agent</CardTitle>
        <CardDescription>
          Your use is subject to Vercel&apos;s{" "}
          <a href="#">Public Beta Agreement</a> and{" "}
          <a href="#">AI Product Terms</a>.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ItemGroup sx={styles.itemGroup}>
          {agentFeatures.map((feature) => (
            <Item key={feature.id} size="xs" sx={styles.item}>
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
                <ItemTitle sx={styles.itemTitle}>{feature.content}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
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
