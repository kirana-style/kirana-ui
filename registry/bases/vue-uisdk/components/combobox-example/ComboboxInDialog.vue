<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Field, FieldLabel } from "../../ui/field"
import { breakpoint } from "../../../../core/scales"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"

const styles = {
  narrow: css({
    maxWidth: {
      "*": null,
      base: "calc(100% - 2rem)",
      [breakpoint.sm]: "425px",
    },
  }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const open = ref(false)
</script>

<template>
  <Example title="Combobox in Dialog">
    <Dialog v-model:open="open">
      <DialogTrigger as-child>
        <Button variant="outline"> Open Dialog </Button>
      </DialogTrigger>
      <DialogContent :sx="styles.narrow">
        <DialogHeader>
          <DialogTitle> Select Framework </DialogTitle>
          <DialogDescription>
            Choose your preferred framework from the list below.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel for="framework-dialog" :sx="visuallyHidden">
            Framework
          </FieldLabel>
          <Combobox :items="frameworks">
            <ComboboxInput
              id="framework-dialog"
              placeholder="Select a framework"
            />
            <ComboboxContent>
              <ComboboxEmpty> No items found. </ComboboxEmpty>
              <ComboboxList v-slot="{ item }">
                <ComboboxItem :key="item" :value="item">
                  {{ item }}
                </ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <DialogFooter>
          <Button type="button" variant="outline" @click="() => (open = false)">
            Cancel
          </Button>
          <Button
            type="button"
            @click="
              () => {
                toast('Framework selected.')
                open = false
              }
            "
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Example>
</template>
