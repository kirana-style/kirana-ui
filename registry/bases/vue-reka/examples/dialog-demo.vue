<script setup lang="ts">
import { css } from "@kirana-style/core"

import { breakpoint, containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const styles = {
  dialogContent: css({
    maxWidth: { [breakpoint.sm]: containerSize.sm },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <Dialog>
      <form>
        <DialogTrigger as-child>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent :sx="styles.dialogContent">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label for="name-1">Name</Label>
              <Input id="name-1" name="name" value="Pedro Duarte" />
            </Field>
            <Field>
              <Label for="username-1">Username</Label>
              <Input id="username-1" name="username" value="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  </div>
</template>
