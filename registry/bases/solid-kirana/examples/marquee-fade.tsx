import { For } from "solid-js"
import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { Marquee, MarqueeItem } from "../ui/marquee"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  marquee: css({ width: "100%", maxWidth: containerSize.lg }),
}

const CUSTOMERS = [
  "Northwind",
  "Fieldstone",
  "Kestrel",
  "Orbit Labs",
  "Quill",
  "Tidewater",
  "Brightline",
  "Harbor & Co",
]

export default function MarqueeFade() {
  return (
    <div sx={page.example}>
      <Marquee fade sx={styles.marquee}>
        <For each={CUSTOMERS}>
          {(name) => (
            <MarqueeItem>
              <Badge variant="secondary">{name}</Badge>
            </MarqueeItem>
          )}
        </For>
      </Marquee>
    </div>
  )
}
