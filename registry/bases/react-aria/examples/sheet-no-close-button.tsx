import { Button } from "../ui/button"
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { page } from "../../../styles/page.styles"

export default function SheetNoCloseButton() {
  return (
    <div sx={page.example}>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
        <Sheet showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn&apos;t have a close button in the top-right
              corner. Click outside to close.
            </SheetDescription>
          </SheetHeader>
        </Sheet>
      </SheetTrigger>
    </div>
  )
}
