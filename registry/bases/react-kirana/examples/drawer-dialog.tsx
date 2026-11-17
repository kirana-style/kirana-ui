import * as React from "react"
import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Drawer,
  DrawerContent,
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
  p4: css({ padding: space[4] }),
  form: css({ display: "grid", alignItems: "start", gap: space[6] }),
  field: css({ display: "grid", gap: space[3] }),
}

export default function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = !useIsMobile()

  if (isDesktop) {
    return (
      <div sx={page.example}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button variant="outline" />}>
            Edit Profile
          </DialogTrigger>
          <DialogContent sx={styles.narrow}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <ProfileForm />
          </DialogContent>
        </Dialog>
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
          <ProfileForm sx={styles.p4} />
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
