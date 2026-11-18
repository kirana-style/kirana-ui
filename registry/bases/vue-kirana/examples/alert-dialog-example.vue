<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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

const styles = {
  itemsCenter: css({ alignItems: "center" }),
  bgDestructive10TextDestr: css({
    backgroundColor: { "*": null, base: surface.destructiveSoft },
    color: theme.destructive,
  }),
}
</script>

<template>
  <ExampleWrapper>
    <!-- AlertDialogBasic -->
    <Example title="Basic" :sx="styles.itemsCenter">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline"> Default </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Cancel </AlertDialogCancel>
            <AlertDialogAction> Continue </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
    <!-- AlertDialogSmall -->
    <Example title="Small" :sx="styles.itemsCenter">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline"> Small </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle> Allow accessory to connect? </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Don&apos;t allow </AlertDialogCancel>
            <AlertDialogAction> Allow </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
    <!-- AlertDialogWithMedia -->
    <Example title="With Media" :sx="styles.itemsCenter">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline"> Default (Media) </Button>
        </AlertDialogTrigger>
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
            <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and remove your data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Cancel </AlertDialogCancel>
            <AlertDialogAction> Continue </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
    <!-- AlertDialogSmallWithMedia -->
    <Example title="Small With Media" :sx="styles.itemsCenter">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline"> Small (Media) </Button>
        </AlertDialogTrigger>
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
            <AlertDialogTitle> Allow accessory to connect? </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Don&apos;t allow </AlertDialogCancel>
            <AlertDialogAction> Allow </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
    <!-- AlertDialogDestructive -->
    <Example title="Destructive" :sx="styles.itemsCenter">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="destructive"> Delete Chat </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia :sx="styles.bgDestructive10TextDestr">
              <IconPlaceholder
                lucide="Trash2Icon"
                tabler="IconTrash"
                hugeicons="Delete02Icon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
            </AlertDialogMedia>
            <AlertDialogTitle> Delete chat? </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this chat conversation. View
              <a href="#"> Settings </a>
              delete any memories saved during this chat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="ghost"> Cancel </AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
    <!-- AlertDialogInDialog -->
    <Example title="In Dialog" :sx="styles.itemsCenter">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Open Dialog </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Alert Dialog Example </DialogTitle>
            <DialogDescription>
              Click the button below to open an alert dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button> Open Alert Dialog </Button>
              </AlertDialogTrigger>
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
                  <AlertDialogCancel> Cancel </AlertDialogCancel>
                  <AlertDialogAction> Continue </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
