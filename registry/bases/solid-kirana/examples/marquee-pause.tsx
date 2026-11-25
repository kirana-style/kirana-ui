import { For } from "solid-js"
import { css } from "@kirana-style/core"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Marquee, MarqueeItem } from "../ui/marquee"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  marquee: css({ width: "100%", maxWidth: containerSize["2xl"] }),
  card: css({ width: space[64] }),
  quote: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
}

const REVIEWS = [
  {
    name: "Amara Okafor",
    role: "Product designer",
    quote: "We shipped our new onboarding in a week.",
  },
  {
    name: "Lucas Moreau",
    role: "Engineering lead",
    quote: "The components fit our design system on day one.",
  },
  {
    name: "Mei Tanaka",
    role: "Founder",
    quote: "Our landing page finally looks the way we drew it.",
  },
  {
    name: "Diego Alvarez",
    role: "Frontend developer",
    quote: "Every part is accessible without extra work.",
  },
]

export default function MarqueePause() {
  return (
    <div sx={page.example}>
      <Marquee pauseOnHover sx={styles.marquee}>
        <For each={REVIEWS}>
          {(review) => (
            <MarqueeItem>
              <Card size="sm" sx={styles.card}>
                <CardHeader>
                  <CardTitle>{review.name}</CardTitle>
                  <CardDescription>{review.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p sx={styles.quote}>{review.quote}</p>
                </CardContent>
              </Card>
            </MarqueeItem>
          )}
        </For>
      </Marquee>
    </div>
  )
}
