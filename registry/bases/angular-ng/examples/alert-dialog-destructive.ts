import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { surface, theme } from "../../../core/tokens"
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

const styles = {
  bgDestructive10TextDestr: css({
    backgroundColor: { "*": null, base: surface.destructiveSoft },
    color: theme.destructive,
  }),
}

@Component({
  selector: "alert-dialog-destructive",
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
        <button kuiButton kuiAlertDialogTrigger variant="destructive">
          Delete Chat
        </button>
        <div kuiAlertDialogContent size="sm">
          <div kuiAlertDialogHeader>
            <div kuiAlertDialogMedia [sx]="styles.bgDestructive10TextDestr">
              <svg
                iconPlaceholder
                lucide="Trash2Icon"
                tabler="IconTrash"
                hugeicons="Delete02Icon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              ></svg>
            </div>
            <h2 kuiAlertDialogTitle>Delete chat?</h2>
            <p kuiAlertDialogDescription>
              This will permanently delete this chat conversation. View
              <a href="#">Settings</a>
              delete any memories saved during this chat.
            </p>
          </div>
          <div kuiAlertDialogFooter>
            <button kuiAlertDialogCancel variant="outline">Cancel</button>
            <button kuiAlertDialogAction variant="destructive">Delete</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class AlertDialogDestructive {
  protected readonly styles = styles
  protected readonly page = page
}
