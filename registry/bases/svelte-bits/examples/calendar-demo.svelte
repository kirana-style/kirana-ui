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

  let date = $state<Date | undefined>(new Date())
</script>

<div sx={page.example}>
  <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} sx={styles.bordered} captionLayout="dropdown" />
</div>
