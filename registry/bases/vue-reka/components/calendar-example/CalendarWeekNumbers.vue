<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  justifyCenter: css({ justifyContent: "center" }),
}

const date = ref<Date | undefined>(new Date(new Date().getFullYear(), 1, 3))
</script>

<template>
  <Example title="Week Numbers" :sx="styles.justifyCenter">
    <Card :sx="styles.mxAutoWFitP0">
      <CardContent :sx="styles.p0">
        <Calendar
          mode="single"
          :default-month="date"
          v-model:selected="date"
          show-week-number
        />
      </CardContent>
    </Card>
  </Example>
</template>
