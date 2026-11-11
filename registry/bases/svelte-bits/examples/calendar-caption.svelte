<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Calendar } from "../ui/calendar"
  import { radius, theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    bordered: css({
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderColor: theme.border,
    }),
  }
</script>

<div sx={page.example}>
  <Calendar mode="single" captionLayout="dropdown" sx={styles.bordered} />
</div>
