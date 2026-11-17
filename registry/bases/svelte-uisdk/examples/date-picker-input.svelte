<script lang="ts">
  import { untrack } from "svelte"
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Calendar } from "../ui/calendar"
  import { Field, FieldLabel } from "../ui/field"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "../ui/input-group"
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    field: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: space[48] },
    }),
    span: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
    popoverContent: css({
      width: { "*": null, base: "auto" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  function formatDate(date: Date | undefined) {
    if (!date) {
      return ""
    }

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false
    }
    return !isNaN(date.getTime())
  }

  let open = $state(false)
  let date = $state<Date | undefined>(new Date("2025-06-01"))
  let month = $state<Date | undefined>(untrack(() => date))
  let value = $state(untrack(() => formatDate(date)))
</script>

<div sx={page.example}>
  <Field sx={styles.field}>
    <FieldLabel for="date-required">
      Subscription Date
    </FieldLabel>
    <InputGroup>
      <InputGroupInput id="date-required" value={value} placeholder="June 01, 2025" oninput={
            (e: Event) => {
              const parsed = new Date((e.target as HTMLInputElement).value)
              value = (e.target as HTMLInputElement).value
              if (isValidDate(parsed)) {
                date = parsed
                month = parsed
              }
            }
          } onkeydown={
            (e: KeyboardEvent) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                open = true
              }
            }
          } />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
          <PopoverTrigger>
            {#snippet asChild(props)}
              <InputGroupButton {...props()} id="date-picker" variant="ghost" size="icon-xs" aria-label="Select date">
                <IconPlaceholder lucide="CalendarIcon" tabler="IconCalendar" hugeicons="CalendarIcon" phosphor="CalendarIcon" remixicon="RiCalendarLine" />
                <span sx={styles.span}>
                  Select date
                </span>
              </InputGroupButton>
            {/snippet}
          </PopoverTrigger>
          <PopoverContent sx={styles.popoverContent} align="end" alignOffset={-8} sideOffset={10}>
            <Calendar mode="single" selected={date} month={month} onMonthChange={(details: { month: typeof month }) => (month = details.month)} onSelectedChange={({ selected }: { selected: Date | undefined }) => {
                    date = selected
                    value = formatDate(selected)
                    open = false
                  }} />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  </Field>
</div>
