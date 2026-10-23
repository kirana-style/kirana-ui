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
import { page } from "../../../styles/page.styles"

export default function DialogDemo() {
  return (
    <div sx={page.example}>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done. <a href="#">Learn more</a>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
