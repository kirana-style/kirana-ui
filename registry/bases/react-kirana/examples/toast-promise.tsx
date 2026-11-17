import { Button } from "../ui/button"
import { toast } from "../ui/toast"
import { page } from "../../../styles/page.styles"

export default function ToastPromise() {
  function showToast() {
    void toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "Event" }), 2000)
      }),
      {
        loading: "Creating event…",
        success: (data) => `${data.name} created.`,
        error: "Could not create event.",
      }
    )
  }

  return (
    <div sx={page.example}>
      <Button variant="outline" onClick={showToast}>
        Create Event
      </Button>
    </div>
  )
}
