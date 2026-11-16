<script setup lang="ts">
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
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css, select } from "@kirana-style/core"
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
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> Ship faster & safer with Vercel Agent </CardTitle>
      <CardDescription>
        Your use is subject to Vercel&apos;s{{ " " }}
        <a href="#"> Public Beta Agreement </a>
        and{{ " " }} <a href="#"> AI Product Terms </a>.
      </CardDescription>
    </CardHeader>
    <CardContent :sx="styles.cardContent">
      <ItemGroup :sx="styles.itemGroup">
        <Item
          v-for="feature in agentFeatures"
          :key="feature.id"
          size="xs"
          :sx="styles.item"
        >
          <ItemMedia variant="icon" :sx="styles.itemMedia">
            <IconPlaceholder
              lucide="CheckCircle2Icon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              :sx="styles.iconPlaceholder"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle :sx="styles.itemTitle">
              <template v-for="(run, index) in feature.runs" :key="index"
                ><strong v-if="run.strong">{{ run.text }}</strong
                ><template v-else>{{ run.text }}</template></template
              ><Badge
                v-if="feature.badge"
                variant="secondary"
                :sx="styles.badge"
                >{{ feature.badge }}</Badge
              >
            </ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
      <Alert>
        <AlertDescription>
          Pro teams get $100 in Vercel Agent trial credit for 2 weeks after
          activation.
        </AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter :sx="styles.cardFooter">
      <Button variant="outline" :sx="styles.button"> Cancel </Button>
      <Button :sx="styles.button2"> Enable with $100 credits </Button>
    </CardFooter>
  </Card>
</template>
