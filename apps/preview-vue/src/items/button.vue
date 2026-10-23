<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "@workspace/registry/bases/vue-ark/ui/button"
import { space } from "@workspace/registry/core/scales.ts"

const row = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: space[2],
})
</script>

<template>
  <div :sx="row">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="link">Link</Button>
    <Button size="sm" variant="outline">Small</Button>
    <Button size="lg">Large</Button>
    <Button disabled>Disabled</Button>
  </div>
</template>
