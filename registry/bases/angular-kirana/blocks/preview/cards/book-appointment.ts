import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "kui-book-appointment",
  imports: [
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldGroup,
    FieldLabel,
    ToggleGroup,
    ToggleGroupItem,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Book Appointment</div>
        <div kuiCardDescription>Dr. Sarah Chen · Cardiology</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel>Available on March 18, 2026</label>
            <div kuiToggleGroup [spacing]="2" [defaultValue]="['slot-0']">
              @for (
                time of ["9:00 AM", "10:30 AM", "11:00 AM", "1:30 PM"];
                track time;
                let index = $index
              ) {
                <button kuiToggleGroupItem [value]="\`slot-\${index}\`">
                  {{ time }}
                </button>
              }
            </div>
          </div>
        </div>
        <div kuiAlert>
          <div kuiAlertTitle>New patient?</div>
          <div kuiAlertDescription>Please arrive 15 minutes early.</div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button">Book Appointment</button>
      </div>
    </div>
  `,
})
export class BookAppointment {
  protected readonly styles = styles
}
