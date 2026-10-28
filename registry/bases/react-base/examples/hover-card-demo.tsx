import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexW64FlexColGap05: css({
    display: "flex",
    width: { "*": null, base: space[64] },
    flexDirection: "column",
    gap: { "*": null, base: spacing(0.5) },
  }),
  fontSemibold: css({ fontWeight: fontWeight.semibold }),
  mt1TextXsTextMutedForegr: css({
    marginTop: space[1],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
}

export default function HoverCardDemo() {
  return (
    <div sx={page.example}>
      <HoverCard>
        <HoverCardTrigger
          delay={10}
          closeDelay={100}
          render={<Button variant="link" />}
        >
          Hover Here
        </HoverCardTrigger>
        <HoverCardContent sx={styles.flexW64FlexColGap05}>
          <div sx={styles.fontSemibold}>@nextjs</div>
          <div>The React Framework – created and maintained by @vercel.</div>
          <div sx={styles.mt1TextXsTextMutedForegr}>Joined December 2021</div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
