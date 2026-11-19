import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

@Component({
  selector: "alert-dialog-media",
  imports: [
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiAlertDialog>
        <button kuiButton kuiAlertDialogTrigger variant="outline">
          Share Project
        </button>
        <div kuiAlertDialogContent>
          <div kuiAlertDialogHeader>
            <div kuiAlertDialogMedia>
              <svg
                iconPlaceholder
                lucide="CircleFadingPlusIcon"
                tabler="IconCirclePlus"
                hugeicons="AddCircleHalfDotIcon"
                phosphor="PlusCircleIcon"
                remixicon="RiAddCircleLine"
              ></svg>
            </div>
            <h2 kuiAlertDialogTitle>Share this project?</h2>
            <p kuiAlertDialogDescription>
              Anyone with the link will be able to view and edit this project.
            </p>
          </div>
          <div kuiAlertDialogFooter>
            <button kuiAlertDialogCancel>Cancel</button>
            <button kuiAlertDialogAction>Share</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class AlertDialogMediaExample {
  protected readonly page = page
}
