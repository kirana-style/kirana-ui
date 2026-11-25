<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Badge } from "../ui/badge"
  import { Marquee, MarqueeItem } from "../ui/marquee"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    rows: css({
      display: "flex",
      flexDirection: "column",
      gap: space[4],
      width: "100%",
      maxWidth: containerSize.lg,
    }),
  }

  const FIRST = ["Design", "Engineering", "Research", "Marketing", "Sales"]
  const SECOND = ["Support", "Finance", "Legal", "Operations", "People"]
</script>

<div sx={page.example}>
  <div sx={styles.rows}>
    <Marquee speed="30s" fade>
      {#each FIRST as team (team)}
        <MarqueeItem>
          <Badge variant="outline">{team}</Badge>
        </MarqueeItem>
      {/each}
    </Marquee>
    <Marquee speed="30s" fade reverse>
      {#each SECOND as team (team)}
        <MarqueeItem>
          <Badge variant="outline">{team}</Badge>
        </MarqueeItem>
      {/each}
    </Marquee>
  </div>
</div>
