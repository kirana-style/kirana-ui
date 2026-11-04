import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { page } from "../../../styles/page.styles"

export default function AlertDialogSmallMedia() {
  return (
    <div sx={page.example}>
      <AlertDialog>
        <AlertDialogTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Show Dialog
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
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don't allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
