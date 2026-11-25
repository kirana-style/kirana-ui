<script lang="ts">
  import { onMount } from "svelte"

  import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"
  import { page } from "../../../styles/page.styles"

  let progress = $state(13)

  onMount(() => {
    const timer = setTimeout(() => (progress = 66), 500)
    return () => clearTimeout(timer)
  })
</script>

<div sx={page.example}>
  <ProgressCircle value={progress} size="lg" aria-label="Upload progress">
    <ProgressCircleLabel />
  </ProgressCircle>
</div>
