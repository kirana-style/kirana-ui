import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

@Component({
  selector: "alert-dialog-small",
  imports: [
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiAlertDialog>
        <button kuiButton kuiAlertDialogTrigger variant="outline">
          Show Dialog
        </button>
        <div kuiAlertDialogContent size="sm">
          <div kuiAlertDialogHeader>
            <h2 kuiAlertDialogTitle>Allow accessory to connect?</h2>
            <p kuiAlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </p>
          </div>
          <div kuiAlertDialogFooter>
            <button kuiAlertDialogCancel>Don't allow</button>
            <button kuiAlertDialogAction>Allow</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class AlertDialogSmall {
  protected readonly page = page
}
