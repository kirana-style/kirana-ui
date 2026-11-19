<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Slider } from "../ui/slider"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    mxAutoWFullMaxWXs: css({
      marginInline: "auto",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.xs,
    }),
  }
</script>

<div sx={page.example}>
  <Slider defaultValue={[10, 20, 70]} max={100} step={10} sx={styles.mxAutoWFullMaxWXs} />
</div>
