import { createMemo, splitProps } from "solid-js"
import { Button } from "../../ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"

type Source = {
  url: string
  title: string
  description: string
}

export function Citation(props: { source: Source; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["source", "sx", "class"])
  const styles = {
    citationHoverCardContent: css({
      display: { "*": null, base: "flex" },
      width: { "*": null, base: space[64] },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[1] },
    }),
    citationDiv: css({
      fontWeight: fontWeight.medium,
    }),
    citationP: css({
      color: theme.mutedForeground,
    }),
    citationA: css({
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      color: theme.mutedForeground,
      textUnderlineOffset: "4px",
      textDecorationLine: { ":hover": "underline" },
    }),
    citationSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
  }

  function hostname(url: string) {
    return new URL(url).hostname.replace(/^www\./, "")
  }

  const host = createMemo(() => hostname(local.source.url))

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger
        asChild={(childProps) => (
          <Button {...childProps()} variant="secondary" size="xs">
            {host()}
          </Button>
        )}
      />
      <HoverCardContent sx={styles.citationHoverCardContent}>
        <div sx={styles.citationDiv}>{local.source.title}</div>
        <p sx={styles.citationP}>{local.source.description}</p>
        <a
          href={local.source.url}
          target="_blank"
          rel="noreferrer"
          sx={styles.citationA}
        >
          {host()} <span sx={styles.citationSpan}>(opens in a new tab)</span>
        </a>
      </HoverCardContent>
    </HoverCard>
  )
}
