import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { cardCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Calendar } from "../ui/calendar"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const styles = {
  mxAutoWFit: css({ marginInline: "auto", width: "fit-content" }),
  p0: css({ padding: { "*": null, base: "0" } }),
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

@Component({
  selector: "calendar-time",
  imports: [
    Calendar,
    Card,
    CardContent,
    CardFooter,
    Field,
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard size="sm" [sx]="styles.mxAutoWFit">
        <div kuiCardContent>
          <div
            kuiCalendar
            mode="single"
            [(selected)]="date"
            [sx]="styles.p0"
          ></div>
        </div>
        <div kuiCardFooter [sx]="styles.borderTBgCard">
          <div kuiFieldGroup>
            <div kuiField>
              <label kuiFieldLabel for="time-from">Start Time</label>
              <div kuiInputGroup>
                <input
                  kuiInputGroupInput
                  id="time-from"
                  type="time"
                  step="1"
                  default-value="10:30:00"
                  [sx]="styles.appearanceNoneWebkitCale"
                />
                <div kuiInputGroupAddon>
                  <svg
                    iconPlaceholder
                    lucide="Clock2Icon"
                    tabler="IconClockHour2"
                    hugeicons="Clock03Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                    [sx]="styles.textMutedForeground"
                  ></svg>
                </div>
              </div>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="time-to">End Time</label>
              <div kuiInputGroup>
                <input
                  kuiInputGroupInput
                  id="time-to"
                  type="time"
                  step="1"
                  default-value="12:30:00"
                  [sx]="styles.appearanceNoneWebkitCale"
                />
                <div kuiInputGroupAddon>
                  <svg
                    iconPlaceholder
                    lucide="Clock2Icon"
                    tabler="IconClockHour2"
                    hugeicons="Clock03Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                    [sx]="styles.textMutedForeground"
                  ></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CalendarTime {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  protected readonly styles = styles
  protected readonly page = page
}
