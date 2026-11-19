import { Component, input } from "@angular/core"
import { IconPlaceholder } from "../../../../../icons/angular"

/**
 * An icon this block's data names, drawn by a placeholder written out for each, as React's data
 * holds placeholder elements: a project's installer resolves only a placeholder whose
 * icons are written on it.
 */

@Component({
  selector: "kui-sidebar15-icon",
  imports: [IconPlaceholder],
  host: { style: "display: contents" },
  template: `
    @if (icon().lucide === "CommandIcon") {
      <svg
        iconPlaceholder
        lucide="CommandIcon"
        tabler="IconCommand"
        hugeicons="CommandIcon"
        phosphor="CommandIcon"
        remixicon="RiCommandLine"
      ></svg>
    } @else if (icon().lucide === "AudioLinesIcon") {
      <svg
        iconPlaceholder
        lucide="AudioLinesIcon"
        tabler="IconWaveSine"
        hugeicons="AudioWave01Icon"
        phosphor="WaveformIcon"
        remixicon="RiPulseLine"
      ></svg>
    } @else if (icon().lucide === "SearchIcon") {
      <svg
        iconPlaceholder
        lucide="SearchIcon"
        tabler="IconSearch"
        hugeicons="SearchIcon"
        phosphor="MagnifyingGlassIcon"
        remixicon="RiSearchLine"
      ></svg>
    } @else if (icon().lucide === "SparklesIcon") {
      <svg
        iconPlaceholder
        lucide="SparklesIcon"
        tabler="IconSparkles"
        hugeicons="SparklesIcon"
        phosphor="SparkleIcon"
        remixicon="RiSparklingLine"
      ></svg>
    } @else if (icon().lucide === "HomeIcon") {
      <svg
        iconPlaceholder
        lucide="HomeIcon"
        tabler="IconHome"
        hugeicons="HomeIcon"
        phosphor="HouseIcon"
        remixicon="RiHomeLine"
      ></svg>
    } @else if (icon().lucide === "InboxIcon") {
      <svg
        iconPlaceholder
        lucide="InboxIcon"
        tabler="IconInbox"
        hugeicons="InboxIcon"
        phosphor="TrayIcon"
        remixicon="RiInboxLine"
      ></svg>
    } @else if (icon().lucide === "CalendarIcon") {
      <svg
        iconPlaceholder
        lucide="CalendarIcon"
        tabler="IconCalendar"
        hugeicons="CalendarIcon"
        phosphor="CalendarIcon"
        remixicon="RiCalendarLine"
      ></svg>
    } @else if (icon().lucide === "Settings2Icon") {
      <svg
        iconPlaceholder
        lucide="Settings2Icon"
        tabler="IconSettings"
        hugeicons="Settings05Icon"
        phosphor="GearIcon"
        remixicon="RiSettingsLine"
      ></svg>
    } @else if (icon().lucide === "BlocksIcon") {
      <svg
        iconPlaceholder
        lucide="BlocksIcon"
        tabler="IconCube"
        hugeicons="CubeIcon"
        phosphor="CubeIcon"
        remixicon="RiBox3Line"
      ></svg>
    } @else if (icon().lucide === "Trash2Icon") {
      <svg
        iconPlaceholder
        lucide="Trash2Icon"
        tabler="IconTrash"
        hugeicons="Delete02Icon"
        phosphor="TrashIcon"
        remixicon="RiDeleteBinLine"
      ></svg>
    } @else if (icon().lucide === "MessageCircleQuestionIcon") {
      <svg
        iconPlaceholder
        lucide="MessageCircleQuestionIcon"
        tabler="IconMessageQuestion"
        hugeicons="MessageQuestionIcon"
        phosphor="ChatCircleIcon"
        remixicon="RiQuestionLine"
      ></svg>
    }
  `,
})
export class Sidebar15Icon {
  readonly icon = input.required<{
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }>()
}
