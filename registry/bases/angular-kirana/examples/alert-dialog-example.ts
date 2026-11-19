import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { surface, theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

const styles = {
  itemsCenter: css({ alignItems: "center" }),
  bgDestructive10TextDestr: css({
    backgroundColor: { "*": null, base: surface.destructiveSoft },
    color: theme.destructive,
  }),
}

@Component({
  selector: "alert-dialog-example",
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- AlertDialogBasic -->
      <div kuiExample title="Basic" [sx]="styles.itemsCenter">
        <ng-container kuiAlertDialog>
          <button kuiButton kuiAlertDialogTrigger variant="outline">
            Default
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
      <!-- AlertDialogSmall -->
      <div kuiExample title="Small" [sx]="styles.itemsCenter">
        <ng-container kuiAlertDialog>
          <button kuiButton kuiAlertDialogTrigger variant="outline">
            Small
          </button>
          <div kuiAlertDialogContent size="sm">
            <div kuiAlertDialogHeader>
              <h2 kuiAlertDialogTitle>Allow accessory to connect?</h2>
              <p kuiAlertDialogDescription>
                Do you want to allow the USB accessory to connect to this
                device?
              </p>
            </div>
            <div kuiAlertDialogFooter>
              <button kuiAlertDialogCancel>Don't allow</button>
              <button kuiAlertDialogAction>Allow</button>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- AlertDialogWithMedia -->
      <div kuiExample title="With Media" [sx]="styles.itemsCenter">
        <ng-container kuiAlertDialog>
          <button kuiButton kuiAlertDialogTrigger variant="outline">
            Default (Media)
          </button>
          <div kuiAlertDialogContent>
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
              <h2 kuiAlertDialogTitle>Are you absolutely sure?</h2>
              <p kuiAlertDialogDescription>
                This will permanently delete your account and remove your data
                from our servers.
              </p>
            </div>
            <div kuiAlertDialogFooter>
              <button kuiAlertDialogCancel>Cancel</button>
              <button kuiAlertDialogAction>Continue</button>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- AlertDialogSmallWithMedia -->
      <div kuiExample title="Small With Media" [sx]="styles.itemsCenter">
        <ng-container kuiAlertDialog>
          <button kuiButton kuiAlertDialogTrigger variant="outline">
            Small (Media)
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
                Do you want to allow the USB accessory to connect to this
                device?
              </p>
            </div>
            <div kuiAlertDialogFooter>
              <button kuiAlertDialogCancel>Don't allow</button>
              <button kuiAlertDialogAction>Allow</button>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- AlertDialogDestructive -->
      <div kuiExample title="Destructive" [sx]="styles.itemsCenter">
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
              <button kuiAlertDialogCancel variant="ghost">Cancel</button>
              <button kuiAlertDialogAction variant="destructive">Delete</button>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- AlertDialogInDialog -->
      <div kuiExample title="In Dialog" [sx]="styles.itemsCenter">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Alert Dialog Example</h2>
              <p kuiDialogDescription>
                Click the button below to open an alert dialog.
              </p>
            </div>
            <div kuiDialogFooter>
              <ng-container kuiAlertDialog>
                <button kuiButton kuiAlertDialogTrigger>
                  Open Alert Dialog
                </button>
                <div kuiAlertDialogContent size="sm">
                  <div kuiAlertDialogHeader>
                    <h2 kuiAlertDialogTitle>Are you absolutely sure?</h2>
                    <p kuiAlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </p>
                  </div>
                  <div kuiAlertDialogFooter>
                    <button kuiAlertDialogCancel>Cancel</button>
                    <button kuiAlertDialogAction>Continue</button>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class AlertDialogExample {
  protected readonly styles = styles
}
