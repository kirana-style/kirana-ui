<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Calendar } from "../ui/calendar"
  import { Card, CardContent } from "../ui/card"
  import { page } from "../../../styles/page.styles"

  const styles = {
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
  }

  let date = $state<Date | undefined>(new Date(new Date().getFullYear(), 0, 12))
</script>

<div sx={page.example}>
  <Card sx={styles.mxAutoWFitP0}>
    <CardContent sx={styles.p0}>
      <Calendar mode="single" defaultMonth={date} selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} showWeekNumber />
    </CardContent>
  </Card>
</div>
