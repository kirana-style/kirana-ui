import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { page } from "../../../styles/page.styles"

export default function DialogNoCloseButton() {
  return (
    <div sx={page.example}>
      <Dialog>
        <DialogTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              No Close Button
            </Button>
          )}
        />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog doesn't have a close button in the top-right corner.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
