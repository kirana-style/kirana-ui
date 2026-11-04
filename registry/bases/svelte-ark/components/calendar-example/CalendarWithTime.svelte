<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { Example } from "../../components/example"
  import { Calendar } from "../../ui/calendar"
  import { Card, CardContent, CardFooter } from "../../ui/card"
  import { Field, FieldGroup, FieldLabel } from "../../ui/field"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "../../ui/input-group"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { theme } from "../../../../core/tokens"
  import { cardCtx } from "../../../../core/context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    p0: css({ padding: { "*": null, base: "0" } }),
    mxAutoWFit: css({ marginInline: "auto", width: "fit-content" }),
    borderTBgCard: css({
      borderTopWidth: { "*": null, base: "1px" },
      borderTopColor: theme.border,
      backgroundColor: { "*": null, base: theme.card },
      // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
      paddingBlockStart: cardCtx.spacing,
    }),
    appearanceNoneWebkitCale: css({
      appearance: "none",
      "::-webkit-calendar-picker-indicator": {
        display: "none",
        appearance: "none",
      },
    }),
    textMutedForeground: css({ color: theme.mutedForeground }),
  }

  let date = $state<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
</script>

<Example title="With Time" {...rest} sx={[className as Sx]}>
  <Card size="sm" sx={styles.mxAutoWFit}>
    <CardContent>
      <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} sx={styles.p0} />
    </CardContent>
    <CardFooter sx={styles.borderTBgCard}>
      <FieldGroup>
        <Field>
          <FieldLabel for="time-from">
            Start Time
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="time-from" type="time" step="1" defaultValue="10:30:00" sx={styles.appearanceNoneWebkitCale} />
            <InputGroupAddon>
              <IconPlaceholder lucide="Clock2Icon" tabler="IconClockHour2" hugeicons="Clock03Icon" phosphor="ClockIcon" remixicon="RiTimeLine" sx={styles.textMutedForeground} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="time-to">
            End Time
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="time-to" type="time" step="1" defaultValue="12:30:00" sx={styles.appearanceNoneWebkitCale} />
            <InputGroupAddon>
              <IconPlaceholder lucide="Clock2Icon" tabler="IconClockHour2" hugeicons="Clock03Icon" phosphor="ClockIcon" remixicon="RiTimeLine" sx={styles.textMutedForeground} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </CardFooter>
  </Card>
</Example>
