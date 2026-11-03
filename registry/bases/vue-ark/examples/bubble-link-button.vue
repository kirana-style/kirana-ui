<script setup lang="ts">
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
import { Bubble, BubbleContent, BubbleGroup } from "../ui/bubble"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexWFullMaxWSmFlexColGa">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="tinted" align="end">
          <BubbleContent as-child>
            <button @click="() => toast('You clicked forgot password')">
              I forgot my password
            </button>
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent as-child>
            <button @click="() => toast('You clicked help with subscription')">
              I need help with my subscription
            </button>
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent as-child>
            <button
              @click="
                () => toast('You clicked something else. Talk to a human.')
              "
            >
              Something else. Talk to a human.
            </button>
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  </div>
</template>
