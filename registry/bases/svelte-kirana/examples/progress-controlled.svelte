<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Progress } from "../ui/progress"
  import { Slider } from "../ui/slider"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    flexWFullMaxWSmFlexColGa: css({
      display: "flex",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
      flexDirection: "column",
      gap: { "*": null, base: space[4] },
    }),
    full: css({ width: "100%" }),
  }

  let value = $state(50)
</script>

<div sx={page.example}>
  <div sx={styles.flexWFullMaxWSmFlexColGa}>
    <Progress value={value} sx={styles.full} />
    <Slider value={value} onValueChange={(details: { value: typeof value }) => (value = details.value)} min={0} max={100} step={1} />
  </div>
</div>
