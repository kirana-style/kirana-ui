import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

@Component({
  selector: "dialog-no-close-button",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDialog>
        <button kuiButton kuiDialogTrigger variant="outline">
          No Close Button
        </button>
        <div kuiDialogContent [showCloseButton]="false">
          <div kuiDialogHeader>
            <h2 kuiDialogTitle>No Close Button</h2>
            <p kuiDialogDescription>
              This dialog doesn't have a close button in the top-right corner.
            </p>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DialogNoCloseButton {
  protected readonly page = page
}
