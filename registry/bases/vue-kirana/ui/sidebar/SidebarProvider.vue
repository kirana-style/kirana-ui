<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { computed, onMounted, onUnmounted, provide, ref } from "vue"

import { useIsMobile } from "../../../../lib/vue/use-mobile"
import { sidebar } from "../../../../styles/sidebar.styles"
import { SIDEBAR } from "./context"

defineOptions({ inheritAttrs: false })

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    /** `v-model:open`: the caller's state, in place of the sidebar's own. */
    open?: boolean
  }>(),
  { defaultOpen: true, open: undefined }
)
const emit = defineEmits<{ "update:open": [open: boolean] }>()
const { sx, attrs } = useSx()

const isMobile = useIsMobile()
const openMobile = ref(false)

// The sidebar's own state, unless the caller controls it with `v-model:open`.
const own = ref(props.defaultOpen)
const open = computed(() => props.open ?? own.value)
function setOpen(value: boolean | ((value: boolean) => boolean)) {
  const openState = typeof value === "function" ? value(open.value) : value
  if (props.open !== undefined) emit("update:open", openState)
  else own.value = openState
  // Kept in a cookie, so the next page load starts in the same state.
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}
function setOpenMobile(value: boolean | ((value: boolean) => boolean)) {
  openMobile.value =
    typeof value === "function" ? value(openMobile.value) : value
}
const toggleSidebar = () =>
  isMobile.value
    ? setOpenMobile((current) => !current)
    : setOpen((current) => !current)

// ⌘B or Ctrl+B toggles the sidebar.
function onKeydown(event: KeyboardEvent) {
  if (
    event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
    (event.metaKey || event.ctrlKey)
  ) {
    event.preventDefault()
    toggleSidebar()
  }
}
onMounted(() => window.addEventListener("keydown", onKeydown))
onUnmounted(() => window.removeEventListener("keydown", onKeydown))

// `data-state="expanded"` or `"collapsed"` on the sidebar, which its parts read.
const state = computed(() => (open.value ? "expanded" : "collapsed"))

provide(SIDEBAR, {
  state,
  open,
  setOpen,
  openMobile,
  setOpenMobile,
  isMobile,
  toggleSidebar,
})
</script>

<template>
  <div data-slot="sidebar-wrapper" v-bind="attrs" :sx="[sidebar.wrapper, sx]">
    <slot />
  </div>
</template>
