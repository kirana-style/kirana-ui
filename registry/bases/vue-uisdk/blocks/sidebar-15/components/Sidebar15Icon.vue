<script setup lang="ts">
/**
 * An icon this block's data names, drawn by a placeholder written out for each, as React's data
 * holds placeholder elements: a project's installer resolves only a placeholder whose
 * icons are written on it.
 */
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"

defineProps<{
  icon: {
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }
}>()
</script>

<template>
  <IconPlaceholder
    v-if="icon.lucide === 'CommandIcon'"
    lucide="CommandIcon"
    tabler="IconCommand"
    hugeicons="CommandIcon"
    phosphor="CommandIcon"
    remixicon="RiCommandLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'AudioLinesIcon'"
    lucide="AudioLinesIcon"
    tabler="IconWaveSine"
    hugeicons="AudioWave01Icon"
    phosphor="WaveformIcon"
    remixicon="RiPulseLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'SearchIcon'"
    lucide="SearchIcon"
    tabler="IconSearch"
    hugeicons="SearchIcon"
    phosphor="MagnifyingGlassIcon"
    remixicon="RiSearchLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'SparklesIcon'"
    lucide="SparklesIcon"
    tabler="IconSparkles"
    hugeicons="SparklesIcon"
    phosphor="SparkleIcon"
    remixicon="RiSparklingLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'HomeIcon'"
    lucide="HomeIcon"
    tabler="IconHome"
    hugeicons="HomeIcon"
    phosphor="HouseIcon"
    remixicon="RiHomeLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'InboxIcon'"
    lucide="InboxIcon"
    tabler="IconInbox"
    hugeicons="InboxIcon"
    phosphor="TrayIcon"
    remixicon="RiInboxLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'CalendarIcon'"
    lucide="CalendarIcon"
    tabler="IconCalendar"
    hugeicons="CalendarIcon"
    phosphor="CalendarIcon"
    remixicon="RiCalendarLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'Settings2Icon'"
    lucide="Settings2Icon"
    tabler="IconSettings"
    hugeicons="Settings05Icon"
    phosphor="GearIcon"
    remixicon="RiSettingsLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'BlocksIcon'"
    lucide="BlocksIcon"
    tabler="IconCube"
    hugeicons="CubeIcon"
    phosphor="CubeIcon"
    remixicon="RiBox3Line"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'Trash2Icon'"
    lucide="Trash2Icon"
    tabler="IconTrash"
    hugeicons="Delete02Icon"
    phosphor="TrashIcon"
    remixicon="RiDeleteBinLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'MessageCircleQuestionIcon'"
    lucide="MessageCircleQuestionIcon"
    tabler="IconMessageQuestion"
    hugeicons="MessageQuestionIcon"
    phosphor="ChatCircleIcon"
    remixicon="RiQuestionLine"
  />
</template>
