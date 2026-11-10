<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
import { useIsMobile } from "../../../lib/vue/use-mobile"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { scrollFade } from "../../../styles/scroll-fade.styles"

const styles = {
  flex1ScrollFadeOverflowY: css({
    flex: "1 1 0%",
    overflowY: "auto",
    padding: space[4],
  }),
  gap2: css({ gap: { "*": null, base: space[2] } }),
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  h34Px: css({ height: { "*": null, base: "34px" } }),
}

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
]

const open = ref(false)

const deliveryTime = ref("asap")

const isMobile = useIsMobile()

function handleConfirm() {
  const selected = deliveryTimes.find(
    (time) => time.value === deliveryTime.value
  )

  if (!selected) {
    return
  }

  open.value = false
  toast("Delivery time confirmed", {
    description: selected.label,
  })
}
</script>

<template>
  <div :sx="page.example">
    <Drawer
      v-model:open="open"
      :show-swipe-handle="isMobile"
      :swipe-direction="isMobile ? 'down' : 'right'"
    >
      <DrawerTrigger as-child>
        <Button variant="secondary"> Open Drawer </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle> Pick a delivery time </DrawerTitle>
          <DrawerDescription>
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div :sx="[scrollFade, styles.flex1ScrollFadeOverflowY]">
          <RadioGroup v-model="deliveryTime" :sx="styles.gap2">
            <FieldLabel
              v-for="time in deliveryTimes"
              :key="time.value"
              :for="time.id"
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle :sx="styles.pair">
                    {{ time.label }}
                    <Badge v-if="time.badge" variant="secondary">
                      {{ time.badge }}
                    </Badge>
                  </FieldTitle>
                  <FieldDescription>
                    {{ time.description }}
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem :value="time.value" :id="time.id" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button @click="handleConfirm" :sx="styles.h34Px">
            Confirm Delivery Time
          </Button>
          <DrawerClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
