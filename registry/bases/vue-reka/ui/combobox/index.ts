import { ref } from "vue"

export { default as Combobox } from "./Combobox.vue"
export { default as ComboboxChip } from "./ComboboxChip.vue"
export { default as ComboboxChips } from "./ComboboxChips.vue"
export { default as ComboboxChipsInput } from "./ComboboxChipsInput.vue"
export { default as ComboboxClear } from "./ComboboxClear.vue"
export { default as ComboboxCollection } from "./ComboboxCollection.vue"
export { default as ComboboxContent } from "./ComboboxContent.vue"
export { default as ComboboxEmpty } from "./ComboboxEmpty.vue"
export { default as ComboboxGroup } from "./ComboboxGroup.vue"
export { default as ComboboxInput } from "./ComboboxInput.vue"
export { default as ComboboxItem } from "./ComboboxItem.vue"
export { default as ComboboxLabel } from "./ComboboxLabel.vue"
export { default as ComboboxList } from "./ComboboxList.vue"
export { default as ComboboxSeparator } from "./ComboboxSeparator.vue"
export { default as ComboboxTrigger } from "./ComboboxTrigger.vue"
export { default as ComboboxValue } from "./ComboboxValue.vue"

/** Base UI's anchor ref; Reka anchors the popup to the chips (`ComboboxChips`) on its own. */
export const useComboboxAnchor = () => ref<HTMLElement | null>(null)
