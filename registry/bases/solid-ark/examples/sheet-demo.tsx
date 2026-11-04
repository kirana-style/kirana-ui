import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

export default function SheetDemo() {
  const styles = {
    fields: css({
      display: "grid",
      flex: "1 1 0%",
      gridAutoRows: "min-content",
      gap: space[6],
      paddingInline: space[4],
    }),
    field: css({ display: "grid", gap: space[3] }),
  }

  return (
    <div sx={page.example}>
      <Sheet>
        <SheetTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Open
            </Button>
          )}
        />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div sx={styles.fields}>
            <div sx={styles.field}>
              <Label for="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" value="Pedro Duarte" />
            </div>
            <div sx={styles.field}>
              <Label for="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" value="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Close
                </Button>
              )}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
