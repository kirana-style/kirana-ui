import { Component, input } from "@angular/core"
import { IconPlaceholder } from "../../../../../icons/angular"

/**
 * An icon this block's data names, drawn by a placeholder written out for each, as React's data
 * holds placeholder elements: a project's installer resolves only a placeholder whose
 * icons are written on it.
 */

@Component({
  selector: "kui-sidebar07-icon",
  imports: [IconPlaceholder],
  host: { style: "display: contents" },
  template: `
    @if (icon().lucide === "GalleryVerticalEndIcon") {
      <svg
        iconPlaceholder
        lucide="GalleryVerticalEndIcon"
        tabler="IconLayoutRows"
        hugeicons="LayoutBottomIcon"
        phosphor="RowsIcon"
        remixicon="RiGalleryLine"
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
    } @else if (icon().lucide === "CommandIcon") {
      <svg
        iconPlaceholder
        lucide="CommandIcon"
        tabler="IconCommand"
        hugeicons="CommandIcon"
        phosphor="CommandIcon"
        remixicon="RiCommandLine"
      ></svg>
    } @else if (icon().lucide === "TerminalSquareIcon") {
      <svg
        iconPlaceholder
        lucide="TerminalSquareIcon"
        tabler="IconTerminal2"
        hugeicons="ComputerTerminalIcon"
        phosphor="TerminalIcon"
        remixicon="RiTerminalBoxLine"
      ></svg>
    } @else if (icon().lucide === "BotIcon") {
      <svg
        iconPlaceholder
        lucide="BotIcon"
        tabler="IconRobot"
        hugeicons="RoboticIcon"
        phosphor="RobotIcon"
        remixicon="RiRobotLine"
      ></svg>
    } @else if (icon().lucide === "BookOpenIcon") {
      <svg
        iconPlaceholder
        lucide="BookOpenIcon"
        tabler="IconBook"
        hugeicons="BookOpen02Icon"
        phosphor="BookOpenIcon"
        remixicon="RiBookOpenLine"
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
    } @else if (icon().lucide === "FrameIcon") {
      <svg
        iconPlaceholder
        lucide="FrameIcon"
        tabler="IconFrame"
        hugeicons="CropIcon"
        phosphor="CropIcon"
        remixicon="RiCropLine"
      ></svg>
    } @else if (icon().lucide === "PieChartIcon") {
      <svg
        iconPlaceholder
        lucide="PieChartIcon"
        tabler="IconChartPie"
        hugeicons="PieChartIcon"
        phosphor="ChartPieIcon"
        remixicon="RiPieChartLine"
      ></svg>
    } @else if (icon().lucide === "MapIcon") {
      <svg
        iconPlaceholder
        lucide="MapIcon"
        tabler="IconMap"
        hugeicons="MapsIcon"
        phosphor="MapTrifoldIcon"
        remixicon="RiMapLine"
      ></svg>
    }
  `,
})
export class Sidebar07Icon {
  readonly icon = input.required<{
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }>()
}
