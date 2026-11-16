import { Dialog } from "@kirana-ui/react/dialog"
import { useState } from "react"
import type { FormEvent } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "row"
    | "name"
    | "button"
    | "backdrop"
    | "popup"
    | "title"
    | "description"
    | "form"
    | "input"
    | "actions"
    | "save"
  >
}) {
  const [name, setName] = useState("Ada Lovelace")
  const [open, setOpen] = useState(false)

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const typed = String(new FormData(event.currentTarget).get("name")).trim()
    if (typed) setName(typed)
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => setOpen(next)}>
      <div {...s.row}>
        <span {...s.name}>{name}</span>
        <Dialog.Trigger {...s.button}>Edit name</Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Backdrop {...s.backdrop} />
        <Dialog.Popup {...s.popup}>
          <Dialog.Title {...s.title}>Edit name</Dialog.Title>
          <Dialog.Description {...s.description}>
            This is the name other people see.
          </Dialog.Description>
          <form {...s.form} onSubmit={save}>
            <input
              {...s.input}
              name="name"
              aria-label="Name"
              defaultValue={name}
              autoComplete="off"
            />
            <div {...s.actions}>
              <Dialog.Close {...s.button}>Cancel</Dialog.Close>
              <button {...s.save} type="submit">
                Save
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
