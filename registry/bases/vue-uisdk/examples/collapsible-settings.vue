<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  collapsible: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[2] },
  }),
  fieldGroup: css({
    display: { "*": null, base: "grid" },
    width: { "*": null, base: "100%" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  fieldLabel2: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  collapsibleContent: css({
    gridColumn: { "*": null, base: "1 / -1" },
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "subgrid" },
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel3: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  fieldLabel4: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
}

const isOpen = ref(false)
</script>

<template>
  <div :sx="page.example">
    <Card :sx="styles.card" size="sm">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible v-model:open="isOpen" :sx="styles.collapsible">
          <FieldGroup :sx="styles.fieldGroup">
            <Field>
              <FieldLabel for="radius-x" :sx="styles.fieldLabel"
                >Radius X</FieldLabel
              >
              <Input id="radius" placeholder="0" :value="0" />
            </Field>
            <Field>
              <FieldLabel for="radius-y" :sx="styles.fieldLabel2"
                >Radius Y</FieldLabel
              >
              <Input id="radius" placeholder="0" :value="0" />
            </Field>
            <CollapsibleContent :sx="styles.collapsibleContent">
              <Field>
                <FieldLabel for="radius-x" :sx="styles.fieldLabel3"
                  >Radius X</FieldLabel
                >
                <Input id="radius" placeholder="0" :value="0" />
              </Field>
              <Field>
                <FieldLabel for="radius-y" :sx="styles.fieldLabel4"
                  >Radius Y</FieldLabel
                >
                <Input id="radius" placeholder="0" :value="0" />
              </Field>
            </CollapsibleContent>
          </FieldGroup>
          <CollapsibleTrigger as-child>
            <Button variant="outline" size="icon">
              <IconPlaceholder
                v-if="isOpen"
                lucide="MinimizeIcon"
                tabler="IconMinimize"
                hugeicons="MinusSignIcon"
                phosphor="MinusIcon"
                remixicon="RiSubtractLine"
              />
              <IconPlaceholder
                v-else
                lucide="MaximizeIcon"
                tabler="IconMaximize"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardContent>
    </Card>
  </div>
</template>
