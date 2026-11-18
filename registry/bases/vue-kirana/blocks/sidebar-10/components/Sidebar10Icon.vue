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
    v-if="icon.lucide === 'Settings2Icon'"
    lucide="Settings2Icon"
    tabler="IconSettings"
    hugeicons="Settings05Icon"
    phosphor="GearIcon"
    remixicon="RiSettingsLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'FileTextIcon'"
    lucide="FileTextIcon"
    tabler="IconFileText"
    hugeicons="File01Icon"
    phosphor="FileTextIcon"
    remixicon="RiFileTextLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'LinkIcon'"
    lucide="LinkIcon"
    tabler="IconLink"
    hugeicons="LinkIcon"
    phosphor="LinkIcon"
    remixicon="RiLinksLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'CopyIcon'"
    lucide="CopyIcon"
    tabler="IconCopy"
    hugeicons="Copy01Icon"
    phosphor="CopyIcon"
    remixicon="RiFileCopyLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'CornerUpRightIcon'"
    lucide="CornerUpRightIcon"
    tabler="IconCornerUpRight"
    hugeicons="RedoIcon"
    phosphor="ArrowBendUpRightIcon"
    remixicon="RiCornerUpRightLine"
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
    v-else-if="icon.lucide === 'CornerUpLeftIcon'"
    lucide="CornerUpLeftIcon"
    tabler="IconCornerUpLeft"
    hugeicons="UndoIcon"
    phosphor="ArrowBendUpLeftIcon"
    remixicon="RiCornerUpLeftLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'ChartLineIcon'"
    lucide="ChartLineIcon"
    tabler="IconChartLine"
    hugeicons="ChartIcon"
    phosphor="ChartLineIcon"
    remixicon="RiLineChartLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'GalleryVerticalEndIcon'"
    lucide="GalleryVerticalEndIcon"
    tabler="IconLayoutRows"
    hugeicons="LayoutBottomIcon"
    phosphor="RowsIcon"
    remixicon="RiGalleryLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'TrashIcon'"
    lucide="TrashIcon"
    tabler="IconTrash"
    hugeicons="DeleteIcon"
    phosphor="TrashIcon"
    remixicon="RiDeleteBinLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'BellIcon'"
    lucide="BellIcon"
    tabler="IconBell"
    hugeicons="NotificationIcon"
    phosphor="BellIcon"
    remixicon="RiNotificationLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'ArrowUpIcon'"
    lucide="ArrowUpIcon"
    tabler="IconArrowUp"
    hugeicons="ArrowUpIcon"
    phosphor="ArrowUpIcon"
    remixicon="RiArrowUpLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'ArrowDownIcon'"
    lucide="ArrowDownIcon"
    tabler="IconArrowDown"
    hugeicons="ArrowDownIcon"
    phosphor="ArrowDownIcon"
    remixicon="RiArrowDownLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'CommandIcon'"
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
    v-else-if="icon.lucide === 'BlocksIcon'"
    lucide="BlocksIcon"
    tabler="IconCube"
    hugeicons="CubeIcon"
    phosphor="CubeIcon"
    remixicon="RiBox3Line"
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
