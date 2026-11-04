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
  }

  let date = $state<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
</script>

<Example title="Single" {...rest} sx={[className as Sx]}>
  <Card sx={styles.mxAutoWFitP0}>
    <CardContent sx={styles.p0}>
      <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} captionLayout="dropdown" />
    </CardContent>
  </Card>
</Example>
