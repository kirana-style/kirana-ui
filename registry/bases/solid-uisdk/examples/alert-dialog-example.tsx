import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
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
import { surface, theme } from "../../../core/tokens"

export default function AlertDialogExample() {
  const styles = {
    itemsCenter: css({ alignItems: "center" }),
    bgDestructive10TextDestr: css({
      backgroundColor: { "*": null, base: surface.destructiveSoft },
      color: theme.destructive,
    }),
  }

  return (
    <ExampleWrapper>
      <Example title="Basic" sx={styles.itemsCenter}>
        <AlertDialog>
          <AlertDialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Default
              </Button>
            )}
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="Small" sx={styles.itemsCenter}>
        <AlertDialog>
          <AlertDialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Small
              </Button>
            )}
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to allow the USB accessory to connect to this
                device?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Don't allow</AlertDialogCancel>
              <AlertDialogAction>Allow</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="With Media" sx={styles.itemsCenter}>
        <AlertDialog>
          <AlertDialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Default (Media)
              </Button>
            )}
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <IconPlaceholder
                  lucide="BluetoothIcon"
                  tabler="IconBluetooth"
                  hugeicons="BluetoothIcon"
                  phosphor="BluetoothIcon"
                  remixicon="RiBluetoothLine"
                />
              </AlertDialogMedia>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account and remove your data
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="Small With Media" sx={styles.itemsCenter}>
        <AlertDialog>
          <AlertDialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Small (Media)
              </Button>
            )}
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia>
                <IconPlaceholder
                  lucide="BluetoothIcon"
                  tabler="IconBluetooth"
                  hugeicons="BluetoothIcon"
                  phosphor="BluetoothIcon"
                  remixicon="RiBluetoothLine"
                />
              </AlertDialogMedia>
              <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to allow the USB accessory to connect to this
                device?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Don't allow</AlertDialogCancel>
              <AlertDialogAction>Allow</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="Destructive" sx={styles.itemsCenter}>
        <AlertDialog>
          <AlertDialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="destructive">
                Delete Chat
              </Button>
            )}
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia sx={styles.bgDestructive10TextDestr}>
                <IconPlaceholder
                  lucide="Trash2Icon"
                  tabler="IconTrash"
                  hugeicons="Delete02Icon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete chat?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this chat conversation. View{" "}
                <a href="#">Settings</a> delete any memories saved during this
                chat.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
      <Example title="In Dialog" sx={styles.itemsCenter}>
        <Dialog>
          <DialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Open Dialog
              </Button>
            )}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Alert Dialog Example</DialogTitle>
              <DialogDescription>
                Click the button below to open an alert dialog.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <AlertDialog>
                <AlertDialogTrigger
                  asChild={(props) => (
                    <Button {...props()}>Open Alert Dialog</Button>
                  )}
                />
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
    </ExampleWrapper>
  )
}
