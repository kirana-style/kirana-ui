import { For } from "solid-js"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Progress } from "../ui/progress"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function ContextDemo() {
  const styles = {
    div: css({
      display: "flex",
      justifyContent: "center",
      paddingBlock: space[12],
    }),
    hoverCardContent: css({
      display: { "*": null, base: "flex" },
      width: { "*": null, base: space[64] },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[3] },
    }),
    div2: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: space[3],
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    span: css({
      fontWeight: fontWeight.medium,
    }),
    span2: css({
      color: theme.mutedForeground,
    }),
    div3: css({
      display: "flex",
      flexDirection: "column",
      gap: space[1],
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    div4: css({
      display: "flex",
      justifyContent: "space-between",
      gap: space[3],
    }),
    span3: css({
      color: theme.mutedForeground,
    }),
  }

  const usage = {
    input: 8420,
    output: 1260,
    reasoning: 980,
    limit: 128000,
  }

  const used = usage.input + usage.output + usage.reasoning

  const percent = Math.round((used / usage.limit) * 100)

  function formatTokens(value: number) {
    if (value < 1000) {
      return String(value)
    }

    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`
  }

  const rows = [
    { label: "Input", value: usage.input },
    { label: "Output", value: usage.output },
    { label: "Reasoning", value: usage.reasoning },
  ]

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" size="sm">
                {`${percent}% context`}
              </Button>
            )}
          />
          <HoverCardContent sx={styles.hoverCardContent}>
            <div sx={styles.div2}>
              <span sx={styles.span}>Context</span>
              <span sx={styles.span2}>
                {formatTokens(used)} / {formatTokens(usage.limit)}
              </span>
            </div>
            <Progress value={percent} aria-label="Context used" />
            <div sx={styles.div3}>
              <For each={rows}>
                {(row) => (
                  <div sx={styles.div4}>
                    <span sx={styles.span3}>{row.label}</span>
                    <span>{formatTokens(row.value)}</span>
                  </div>
                )}
              </For>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}
