import { AlertDialog } from "@kirana-ui/react/alert-dialog"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "trigger"
    | "backdrop"
    | "popup"
    | "title"
    | "description"
    | "actions"
    | "cancel"
    | "confirm"
  >
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger {...s.trigger}>Delete project</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop {...s.backdrop} />
        <AlertDialog.Popup {...s.popup}>
          <AlertDialog.Title {...s.title}>
            Delete this project?
          </AlertDialog.Title>
          <AlertDialog.Description {...s.description}>
            Its files and history go with it. This cannot be undone.
          </AlertDialog.Description>
          <div {...s.actions}>
            <AlertDialog.Close {...s.cancel}>Cancel</AlertDialog.Close>
            <AlertDialog.Close {...s.confirm}>Delete</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
