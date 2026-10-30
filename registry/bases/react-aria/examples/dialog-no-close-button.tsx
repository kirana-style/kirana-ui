import { Button } from "../ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { page } from "../../../styles/page.styles"

export default function DialogNoCloseButton() {
  return (
    <div sx={page.example}>
      <DialogTrigger>
        <Button variant="outline">No Close Button</Button>
        <Dialog showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog doesn&apos;t have a close button in the top-right
              corner.
            </DialogDescription>
          </DialogHeader>
        </Dialog>
      </DialogTrigger>
    </div>
  )
}
