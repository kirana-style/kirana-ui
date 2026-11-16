<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion"

const { questions } = defineProps<{
  questions: { q: string; a: string }[]
}>()
</script>

<template>
  <Accordion :default-value="['0']">
    <AccordionItem
      v-for="(item, index) in questions"
      :key="index"
      :value="String(index)"
    >
      <AccordionTrigger>
        {{ item.q }}
      </AccordionTrigger>
      <AccordionContent>
        {{ item.a }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
