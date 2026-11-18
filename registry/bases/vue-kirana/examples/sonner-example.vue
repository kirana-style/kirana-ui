<script setup lang="ts">
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"

const styles = {
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  fit: css({ width: "fit-content" }),
}
</script>

<template>
  <ExampleWrapper>
    <!-- SonnerBasic -->
    <Example title="Basic" :sx="styles.itemsCenterJustifyCenter">
      <Button
        @click="() => toast('Event has been created')"
        variant="outline"
        :sx="styles.fit"
        >Show Toast</Button
      >
    </Example>
    <!-- SonnerWithDescription -->
    <Example title="With Description" :sx="styles.itemsCenterJustifyCenter">
      <Button
        @click="
          () =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            })
        "
        variant="outline"
        :sx="styles.fit"
        >Show Toast</Button
      >
    </Example>
  </ExampleWrapper>
</template>
