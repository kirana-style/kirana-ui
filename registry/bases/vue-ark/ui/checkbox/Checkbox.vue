<script setup lang="ts">
import {
  CheckboxContext,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxRoot,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { checkbox } from "../../../../styles/checkbox.styles"

defineOptions({ inheritAttrs: false })

// `id` names the hidden input, so a `<Label for>` beside the box reaches it, as React's `htmlFor`.
const { id, defaultChecked } = defineProps<{
  id?: string
  /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
  defaultChecked?: boolean
}>()
const { sx, attrs } = useSx()
// `aria-invalid`, as upstream's demos mark an invalid control: Ark's `invalid`, which marks the box.
const invalid = computed(() =>
  [true, "true", ""].includes(attrs.value["aria-invalid"] as never)
)
</script>

<template>
  <CheckboxRoot
    :default-checked="defaultChecked"
    :invalid="invalid || undefined"
    v-bind="attrs"
    :ids="id ? { hiddenInput: id } : undefined"
    :sx="checkbox.wrapper"
  >
    <!-- Spans, as Base UI's box and indicator, the indicator there only while checked. -->
    <CheckboxControl as-child>
      <span data-slot="checkbox" :sx="[checkbox.root, sx]">
        <CheckboxContext v-slot="state">
          <CheckboxIndicator v-if="state.checked" as-child>
            <span data-slot="checkbox-indicator" :sx="checkbox.indicator">
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            </span>
          </CheckboxIndicator>
        </CheckboxContext>
      </span>
    </CheckboxControl>
    <CheckboxHiddenInput />
  </CheckboxRoot>
</template>
