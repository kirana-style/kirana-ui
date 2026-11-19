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
  selector: "alert-dialog-small-media",
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
          Show Dialog
        </button>
        <div kuiAlertDialogContent size="sm">
          <div kuiAlertDialogHeader>
            <div kuiAlertDialogMedia>
              <svg
                iconPlaceholder
                lucide="BluetoothIcon"
                tabler="IconBluetooth"
                hugeicons="BluetoothIcon"
                phosphor="BluetoothIcon"
                remixicon="RiBluetoothLine"
              ></svg>
            </div>
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
export default class AlertDialogSmallMedia {
  protected readonly page = page
}
