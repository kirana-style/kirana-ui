import { For } from "solid-js"
import { css } from "@kirana-style/core"

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Marquee, MarqueeItem } from "../ui/marquee"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  marquee: css({
    width: "100%",
    maxWidth: containerSize.xs,
    height: space[80],
  }),
  item: css({ width: "100%" }),
}

const RELEASES = [
  { version: "v2.4.0", note: "Dark mode for every chart." },
  { version: "v2.3.2", note: "Faster search across projects." },
  { version: "v2.3.0", note: "Comments on any file." },
  { version: "v2.2.1", note: "Keyboard shortcuts for the editor." },
  { version: "v2.2.0", note: "Export a report as a PDF." },
]

export default function MarqueeVertical() {
  return (
    <div sx={page.example}>
      <Marquee direction="up" speed="20s" fade sx={styles.marquee}>
        <For each={RELEASES}>
          {(release) => (
            <MarqueeItem sx={styles.item}>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>{release.version}</CardTitle>
                  <CardDescription>{release.note}</CardDescription>
                </CardHeader>
              </Card>
            </MarqueeItem>
          )}
        </For>
      </Marquee>
    </div>
  )
}
