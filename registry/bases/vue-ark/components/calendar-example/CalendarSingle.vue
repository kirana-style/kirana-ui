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
}

const date = ref<Date | undefined>(
  new Date(new Date().getFullYear(), new Date().getMonth(), 12)
)
</script>

<template>
  <Example title="Single">
    <Card :sx="styles.mxAutoWFitP0">
      <CardContent :sx="styles.p0">
        <Calendar
          mode="single"
          v-model:selected="date"
          caption-layout="dropdown"
        />
      </CardContent>
    </Card>
  </Example>
</template>
