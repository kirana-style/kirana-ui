<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css, props as styleProps, select } from "@kirana-style/core"
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
    // `[&>button]:line-through opacity-100`: a booked day, struck through and not dimmed as disabled.
    booked: css({
      opacity: { '[data-disabled="true"]': 1 },
      [select.child("button")]: { textDecorationLine: "line-through" },
    }),
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
  }

  let date = $state<Date | undefined>(new Date(new Date().getFullYear(), 1, 3))
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  )

  // The class in the script: Kirana compiles `props()` here and drops its import, so a template
  // calling it fails at run time (KF-096, Kirana 0.3.7).
  const bookedClass = styleProps(styles.booked).className ?? ""
</script>

<Example title="Booked Dates" {...rest} sx={[className as Sx]}>
  <Card sx={styles.mxAutoWFitP0}>
    <CardContent sx={styles.p0}>
      <Calendar mode="single" defaultMonth={date} selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} disabled={bookedDates} modifiers={{
            booked: bookedDates,
          }} modifiersClassNames={{
            booked: bookedClass,
          }} />
    </CardContent>
  </Card>
</Example>
