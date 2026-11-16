import { Toast, createToaster } from "@kirana-ui/react/toast"

import type { Styles } from "../../styled.ts"

// The page's toasts: made once, and added to from anywhere.
const toaster = createToaster()

export default function Demo({
  s,
}: {
  s: Styles<
    | "button"
    | "viewport"
    | "toast"
    | "content"
    | "title"
    | "description"
    | "close"
  >
}) {
  return (
    <>
      <button
        type="button"
        onClick={() =>
          toaster.add({
            title: "Changes saved",
            description: "Your profile is up to date.",
          })
        }
        {...s.button}
      >
        Save changes
      </button>
      <Toast.Viewport toaster={toaster} {...s.viewport}>
        <Toast.List>
          {(toast) => (
            <Toast.Root toast={toast} {...s.toast}>
              <Toast.Content {...s.content}>
                <Toast.Title {...s.title}>{toast.title}</Toast.Title>
                <Toast.Description {...s.description}>
                  {toast.description}
                </Toast.Description>
              </Toast.Content>
              <Toast.Close aria-label="Close" {...s.close}>
                ×
              </Toast.Close>
            </Toast.Root>
          )}
        </Toast.List>
      </Toast.Viewport>
    </>
  )
}
