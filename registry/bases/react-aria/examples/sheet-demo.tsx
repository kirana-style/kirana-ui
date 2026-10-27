import { css } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

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

export default function SheetDemo() {
  return (
    <div sx={page.example}>
      <SheetTrigger>
        <Button variant="outline">Open</Button>
        <Sheet>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div sx={styles.fields}>
            <div sx={styles.field}>
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div sx={styles.field}>
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose variant="outline">Close</SheetClose>
          </SheetFooter>
        </Sheet>
      </SheetTrigger>
    </div>
  )
}
