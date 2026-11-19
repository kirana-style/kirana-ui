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
  selector: "alert-dialog-basic",
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
        <div kuiAlertDialogContent>
          <div kuiAlertDialogHeader>
            <h2 kuiAlertDialogTitle>Are you absolutely sure?</h2>
            <p kuiAlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
          </div>
          <div kuiAlertDialogFooter>
            <button kuiAlertDialogCancel>Cancel</button>
            <button kuiAlertDialogAction>Continue</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class AlertDialogBasic {
  protected readonly page = page
}
