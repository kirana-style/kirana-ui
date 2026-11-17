<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { Example } from "../../components/example"
  import { Calendar } from "../../ui/calendar"
  import { Card, CardContent } from "../../ui/card"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
    justifyCenter: css({ justifyContent: "center" }),
  }

  let date = $state<Date | undefined>(new Date(new Date().getFullYear(), 1, 3))
</script>

<Example title="Week Numbers" sx={[styles.justifyCenter, className as Sx]} {...rest}>
  <Card sx={styles.mxAutoWFitP0}>
    <CardContent sx={styles.p0}>
      <Calendar mode="single" defaultMonth={date} selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} showWeekNumber />
    </CardContent>
  </Card>
</Example>
