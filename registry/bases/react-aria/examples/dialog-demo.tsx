import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  dialog: css({
    maxWidth: { [breakpoint.sm]: containerSize.sm },
  }),
}

export default function DialogDemo() {
  return (
    <div sx={page.example}>
      <DialogTrigger>
        <form>
          <Button variant="outline">Open Dialog</Button>
          <Dialog sx={styles.dialog}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose variant="outline">Cancel</DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </Dialog>
        </form>
      </DialogTrigger>
    </div>
  )
}
