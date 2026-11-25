<script lang="ts">
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
</script>

<div sx={page.example}>
  <Marquee sx={styles.marquee}>
    {#each CUSTOMERS as name (name)}
      <MarqueeItem>
        <Badge variant="outline">{name}</Badge>
      </MarqueeItem>
    {/each}
  </Marquee>
</div>
