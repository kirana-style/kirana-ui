import type { InjectionKey } from "vue"

/** A panel as the group names it, Ark UI's `panels` entry: its id and its limits, in percent. */
export type PanelEntry = { id: string; minSize?: number; maxSize?: number }

/** The group's panels and their first sizes, which each panel reads by its id. */
export const PANELS: InjectionKey<{
  panels: () => PanelEntry[]
  defaultSize: () => number[] | undefined
}> = Symbol("resizable-panels")
