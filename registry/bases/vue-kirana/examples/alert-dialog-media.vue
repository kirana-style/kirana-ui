<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button variant="outline"> Share Project </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <IconPlaceholder
              lucide="CircleFadingPlusIcon"
              tabler="IconCirclePlus"
              hugeicons="AddCircleHalfDotIcon"
              phosphor="PlusCircleIcon"
              remixicon="RiAddCircleLine"
            />
          </AlertDialogMedia>
          <AlertDialogTitle> Share this project? </AlertDialogTitle>
          <AlertDialogDescription>
            Anyone with the link will be able to view and edit this project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel> Cancel </AlertDialogCancel>
          <AlertDialogAction> Share </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
