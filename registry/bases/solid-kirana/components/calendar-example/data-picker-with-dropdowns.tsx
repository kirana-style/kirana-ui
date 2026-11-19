import { createSignal, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { format } from "date-fns"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Field, FieldLabel } from "../../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { fontWeight, space, spacing } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import type { Sx } from "@kirana-style/core"

export function DataPickerWithDropdowns(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
    w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
    justifyStartPx25FontNorm: css({
      justifyContent: "flex-start",
      paddingInline: { "*": null, base: spacing(2.5) },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    mlAuto: css({ marginLeft: "auto" }),
    flexGap2BorderTP2: css({
      display: "flex",
      gap: { "*": null, base: space[2] },
      borderTopWidth: "1px",
      borderTopColor: theme.border,
      padding: space[2],
    }),
    full: css({ width: "100%" }),
  }

  const [date, setDate] = createSignal<Date>()
  const [open, setOpen] = createSignal(false)

  return (
    <Example
      title="Date Picker with Dropdowns"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <Field sx={styles.w72}>
        <Popover
          open={open()}
          onOpenChange={(details: { open: ReturnType<typeof open> }) =>
            setOpen(details.open)
          }
        >
          <FieldLabel for="date-picker-with-dropdowns-desktop">Date</FieldLabel>
          <PopoverTrigger
            asChild={(childProps) => (
              <Button
                {...childProps()}
                variant="outline"
                id="date-picker-with-dropdowns-desktop"
                sx={styles.justifyStartPx25FontNorm}
              >
                {date() ? format(date()!, "PPP") : <span>Pick a date()</span>}
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDownIcon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  data-icon="inline-start"
                  {...styleProps(styles.mlAuto)}
                />
              </Button>
            )}
          />
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar
              mode="single"
              selected={date()}
              onSelectedChange={(details: {
                selected: ReturnType<typeof date>
              }) => setDate(details.selected)}
              captionLayout="dropdown"
            />
            <div sx={styles.flexGap2BorderTP2}>
              <Button
                variant="outline"
                size="sm"
                sx={styles.full}
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}
