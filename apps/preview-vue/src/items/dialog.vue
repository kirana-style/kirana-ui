<script setup lang="ts">
import { Button } from "@workspace/registry/bases/vue-ark/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/registry/bases/vue-ark/ui/dialog"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Open dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
          <a href="#">Learn more</a>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter show-close-button>
        <Button>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
