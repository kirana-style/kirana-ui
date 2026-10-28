import * as React from "react"
import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { breakpoint, space } from "../../../core/scales"
import { useIsMobile } from "../../../lib/use-mobile"
import type { Sx } from "../../../lib/sx"
import { page } from "../../../styles/page.styles"

const styles = {
  // `sm:max-w-[425px]`
  narrow: css({
    maxWidth: {
      "*": null,
      base: "calc(100% - 2rem)",
      [breakpoint.sm]: "425px",
    },
  }),
  textLeft: css({ textAlign: "left" }),
  px4: css({ paddingInline: space[4] }),
  pt2: css({ paddingTop: space[2] }),
  form: css({ display: "grid", alignItems: "start", gap: space[6] }),
  field: css({ display: "grid", gap: space[3] }),
}

export default function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = !useIsMobile()

  if (isDesktop) {
    return (
      <div sx={page.example}>
        <DialogTrigger isOpen={open} onOpenChange={setOpen}>
          <Button variant="outline">Edit Profile</Button>
          <Dialog sx={styles.narrow}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <ProfileForm />
          </Dialog>
        </DialogTrigger>
      </div>
    )
  }

  return (
    <div sx={page.example}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" />}>
          Edit Profile
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader sx={styles.textLeft}>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm sx={styles.px4} />
          <DrawerFooter sx={styles.pt2}>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

function ProfileForm({ sx }: { sx?: Sx }) {
  return (
    <form sx={[styles.form, sx]}>
      <div sx={styles.field}>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div sx={styles.field}>
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
