<script lang="ts">
  import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <ProgressCircle value={64} aria-label="Storage used">
    <ProgressCircleLabel />
  </ProgressCircle>
</div>
