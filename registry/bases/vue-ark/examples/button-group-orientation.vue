<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { page } from "../../../styles/page.styles"

const styles = {
  hFit: css({ height: "fit-content" }),
}
</script>

<template>
  <div :sx="page.example">
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      :sx="styles.hFit"
    >
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
        />
      </Button>
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="MinusIcon"
          tabler="IconMinus"
          hugeicons="MinusSignIcon"
          phosphor="MinusIcon"
          remixicon="RiSubtractLine"
        />
      </Button>
    </ButtonGroup>
  </div>
</template>
