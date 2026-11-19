<script lang="ts">
  /**
   * An icon this block's data names, drawn by a placeholder written out for each, as React's data
   * holds placeholder elements: a project's installer resolves only a placeholder whose
   * icons are written on it.
   */
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"

  let { icon }: {
    icon: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
  } = $props()
</script>

{#if icon.lucide === 'Settings2Icon'}
  <IconPlaceholder lucide="Settings2Icon" tabler="IconSettings" hugeicons="Settings05Icon" phosphor="GearIcon" remixicon="RiSettingsLine" />
{:else if icon.lucide === 'FileTextIcon'}
  <IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="File01Icon" phosphor="FileTextIcon" remixicon="RiFileTextLine" />
{:else if icon.lucide === 'LinkIcon'}
  <IconPlaceholder lucide="LinkIcon" tabler="IconLink" hugeicons="LinkIcon" phosphor="LinkIcon" remixicon="RiLinksLine" />
{:else if icon.lucide === 'CopyIcon'}
  <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" hugeicons="Copy01Icon" phosphor="CopyIcon" remixicon="RiFileCopyLine" />
{:else if icon.lucide === 'CornerUpRightIcon'}
  <IconPlaceholder lucide="CornerUpRightIcon" tabler="IconCornerUpRight" hugeicons="RedoIcon" phosphor="ArrowBendUpRightIcon" remixicon="RiCornerUpRightLine" />
{:else if icon.lucide === 'Trash2Icon'}
  <IconPlaceholder lucide="Trash2Icon" tabler="IconTrash" hugeicons="Delete02Icon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
{:else if icon.lucide === 'CornerUpLeftIcon'}
  <IconPlaceholder lucide="CornerUpLeftIcon" tabler="IconCornerUpLeft" hugeicons="UndoIcon" phosphor="ArrowBendUpLeftIcon" remixicon="RiCornerUpLeftLine" />
{:else if icon.lucide === 'ChartLineIcon'}
  <IconPlaceholder lucide="ChartLineIcon" tabler="IconChartLine" hugeicons="ChartIcon" phosphor="ChartLineIcon" remixicon="RiLineChartLine" />
{:else if icon.lucide === 'GalleryVerticalEndIcon'}
  <IconPlaceholder lucide="GalleryVerticalEndIcon" tabler="IconLayoutRows" hugeicons="LayoutBottomIcon" phosphor="RowsIcon" remixicon="RiGalleryLine" />
{:else if icon.lucide === 'TrashIcon'}
  <IconPlaceholder lucide="TrashIcon" tabler="IconTrash" hugeicons="DeleteIcon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
{:else if icon.lucide === 'BellIcon'}
  <IconPlaceholder lucide="BellIcon" tabler="IconBell" hugeicons="NotificationIcon" phosphor="BellIcon" remixicon="RiNotificationLine" />
{:else if icon.lucide === 'ArrowUpIcon'}
  <IconPlaceholder lucide="ArrowUpIcon" tabler="IconArrowUp" hugeicons="ArrowUpIcon" phosphor="ArrowUpIcon" remixicon="RiArrowUpLine" />
{:else if icon.lucide === 'ArrowDownIcon'}
  <IconPlaceholder lucide="ArrowDownIcon" tabler="IconArrowDown" hugeicons="ArrowDownIcon" phosphor="ArrowDownIcon" remixicon="RiArrowDownLine" />
{:else if icon.lucide === 'CommandIcon'}
  <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
{:else if icon.lucide === 'AudioLinesIcon'}
  <IconPlaceholder lucide="AudioLinesIcon" tabler="IconWaveSine" hugeicons="AudioWave01Icon" phosphor="WaveformIcon" remixicon="RiPulseLine" />
{:else if icon.lucide === 'SearchIcon'}
  <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" />
{:else if icon.lucide === 'SparklesIcon'}
  <IconPlaceholder lucide="SparklesIcon" tabler="IconSparkles" hugeicons="SparklesIcon" phosphor="SparkleIcon" remixicon="RiSparklingLine" />
{:else if icon.lucide === 'HomeIcon'}
  <IconPlaceholder lucide="HomeIcon" tabler="IconHome" hugeicons="HomeIcon" phosphor="HouseIcon" remixicon="RiHomeLine" />
{:else if icon.lucide === 'InboxIcon'}
  <IconPlaceholder lucide="InboxIcon" tabler="IconInbox" hugeicons="InboxIcon" phosphor="TrayIcon" remixicon="RiInboxLine" />
{:else if icon.lucide === 'CalendarIcon'}
  <IconPlaceholder lucide="CalendarIcon" tabler="IconCalendar" hugeicons="CalendarIcon" phosphor="CalendarIcon" remixicon="RiCalendarLine" />
{:else if icon.lucide === 'BlocksIcon'}
  <IconPlaceholder lucide="BlocksIcon" tabler="IconCube" hugeicons="CubeIcon" phosphor="CubeIcon" remixicon="RiBox3Line" />
{:else if icon.lucide === 'MessageCircleQuestionIcon'}
  <IconPlaceholder lucide="MessageCircleQuestionIcon" tabler="IconMessageQuestion" hugeicons="MessageQuestionIcon" phosphor="ChatCircleIcon" remixicon="RiQuestionLine" />
{/if}
