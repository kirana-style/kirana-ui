<script lang="ts">
  import { onMount } from "svelte"

  import { css } from "@kirana-style/core"
  import { Progress } from "../ui/progress"
  import { page } from "../../../styles/page.styles"

  const styles = {
    w60: css({ width: { "*": null, base: "60%" } }),
  }

  let progress = $state(13)

  onMount(() => {
    setTimeout(() => (progress = 66), 500)
  })
</script>

<div sx={page.example}>
  <Progress value={progress} sx={styles.w60} />
</div>
