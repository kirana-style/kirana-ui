import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { page } from "../../../styles/page.styles"

export default function SheetNoCloseButton() {
  return (
    <div sx={page.example}>
      <Sheet>
        <SheetTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Open Sheet
            </Button>
          )}
        />
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn't have a close button in the top-right corner.
              Click outside to close.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
