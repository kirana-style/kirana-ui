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

{#if icon.lucide === 'CommandIcon'}
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
{:else if icon.lucide === 'Settings2Icon'}
  <IconPlaceholder lucide="Settings2Icon" tabler="IconSettings" hugeicons="Settings05Icon" phosphor="GearIcon" remixicon="RiSettingsLine" />
{:else if icon.lucide === 'BlocksIcon'}
  <IconPlaceholder lucide="BlocksIcon" tabler="IconCube" hugeicons="CubeIcon" phosphor="CubeIcon" remixicon="RiBox3Line" />
{:else if icon.lucide === 'Trash2Icon'}
  <IconPlaceholder lucide="Trash2Icon" tabler="IconTrash" hugeicons="Delete02Icon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
{:else if icon.lucide === 'MessageCircleQuestionIcon'}
  <IconPlaceholder lucide="MessageCircleQuestionIcon" tabler="IconMessageQuestion" hugeicons="MessageQuestionIcon" phosphor="ChatCircleIcon" remixicon="RiQuestionLine" />
{/if}
