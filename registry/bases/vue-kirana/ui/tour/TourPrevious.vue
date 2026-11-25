<script setup lang="ts">
import { Tour } from "@kirana-ui/vue/tour"
import { useSx } from "@kirana-style/core/vue"

import { tour } from "../../../../styles/tour.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

/** An outline Button that goes back a step, "Back" unless given a slot. */
const { sx, attrs } = useSx()
</script>

<template>
  <Tour.Previous data-slot="tour-previous" v-bind="attrs" as-child>
    <Button variant="outline" size="sm" :sx="[tour.previous, sx]">
      <slot>Back</slot>
    </Button>
  </Tour.Previous>
</template>
