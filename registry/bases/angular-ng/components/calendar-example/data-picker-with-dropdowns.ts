import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { format } from "date-fns"
import { fontWeight, space, spacing } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { IconPlaceholder } from "../../../../icons/angular"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Field, FieldLabel } from "../../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"

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

@Component({
  selector: "kui-data-picker-with-dropdowns",
  imports: [
    Button,
    Calendar,
    Example,
    Field,
    FieldLabel,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Date Picker with Dropdowns">
      <div kuiField [sx]="styles.w72">
        <ng-container kuiPopover [(open)]="open">
          <label kuiFieldLabel for="date-picker-with-dropdowns-desktop"
            >Date</label
          >
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            id="date-picker-with-dropdowns-desktop"
            [sx]="styles.justifyStartPx25FontNorm"
          >
            @if (date(); as chosen) {
              {{ format(chosen, "PPP") }}
            } @else {
              <span>Pick a date()</span>
            }
            <svg
              iconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDownIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              data-icon="inline-start"
              [sx]="styles.mlAuto"
            ></svg>
          </button>
          <div kuiPopoverContent [sx]="styles.wAutoP0" align="start">
            <div
              kuiCalendar
              mode="single"
              [(selected)]="date"
              captionLayout="dropdown"
            ></div>
            <div [sx]="styles.flexGap2BorderTP2">
              <button
                kuiButton
                variant="outline"
                size="sm"
                [sx]="styles.full"
                (click)="open.set(false)"
              >
                Done
              </button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class DataPickerWithDropdowns {
  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly format = format
}
