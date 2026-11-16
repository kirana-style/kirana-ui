<script setup lang="ts">
/**
 * A QR code as an SVG, `react-qr-code`'s markup (MIT): its light and dark modules each one path,
 * encoded by the same `qrcode-generator`.
 */
import qrcode from "qrcode-generator"
import { computed } from "vue"

const props = withDefaults(
  defineProps<{
    value: string
    size?: number
    level?: "L" | "M" | "Q" | "H"
    bgColor?: string
    fgColor?: string
    title?: string
  }>(),
  { size: 256, level: "L", bgColor: "#FFFFFF", fgColor: "#000000" }
)

// As `react-qr-code`, the text is encoded as UTF-8.
qrcode.stringToBytes = (text: string) =>
  Array.from(new TextEncoder().encode(text))

const cells = computed(() => {
  const qr = qrcode(0, props.level)
  qr.addData(props.value)
  qr.make()
  const count = qr.getModuleCount()
  return Array.from({ length: count }, (_row, row) =>
    Array.from({ length: count }, (_cell, column) => qr.isDark(row, column))
  )
})
const path = (dark: boolean) =>
  cells.value
    .map((row, rowIndex) =>
      row
        .map((cell, cellIndex) =>
          cell === dark ? `M ${cellIndex} ${rowIndex} l 1 0 0 1 -1 0 Z` : ""
        )
        .join(" ")
    )
    .join(" ")
</script>

<template>
  <svg
    :height="size"
    :viewBox="`0 0 ${cells.length} ${cells.length}`"
    :width="size"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title v-if="title">{{ title }}</title>
    <path :d="path(false)" :fill="bgColor" />
    <path :d="path(true)" :fill="fgColor" />
  </svg>
</template>
