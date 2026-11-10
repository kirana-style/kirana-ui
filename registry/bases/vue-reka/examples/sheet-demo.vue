<script setup lang="ts">
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
</script>

<template>
  <div :sx="page.example">
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline"> Open </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle> Edit profile </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div :sx="styles.fields">
          <div :sx="styles.field">
            <Label for="sheet-demo-name"> Name </Label>
            <Input id="sheet-demo-name" value="Pedro Duarte" />
          </div>
          <div :sx="styles.field">
            <Label for="sheet-demo-username"> Username </Label>
            <Input id="sheet-demo-username" value="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit"> Save changes </Button>
          <SheetClose as-child>
            <Button variant="outline"> Close </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
