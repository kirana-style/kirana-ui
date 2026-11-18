<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { toast } from "../ui/toast"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexFlexWrapGap2">
      <Button
        variant="outline"
        @click="() => toast.add({ description: 'Event has been created.' })"
      >
        Default
      </Button>
      <Button
        variant="outline"
        @click="
          () =>
            toast.add({
              type: 'success',
              description: 'Event has been created.',
            })
        "
      >
        Success
      </Button>
      <Button
        variant="outline"
        @click="
          () =>
            toast.add({
              type: 'info',
              description: 'Arrive 10 minutes before the event.',
            })
        "
      >
        Info
      </Button>
      <Button
        variant="outline"
        @click="
          () =>
            toast.add({
              type: 'warning',
              description: 'The event cannot start before 8:00 AM.',
            })
        "
      >
        Warning
      </Button>
      <Button
        variant="outline"
        @click="
          () =>
            toast.add({
              type: 'error',
              description: 'The event could not be created.',
              priority: 'high',
            })
        "
      >
        Error
      </Button>
    </div>
  </div>
</template>
