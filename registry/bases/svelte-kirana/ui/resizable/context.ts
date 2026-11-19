/** A pane as the group names it, Ark UI's `panels` entry: its id and its limits, in percent. */
export type PanelEntry = { id: string; minSize?: number; maxSize?: number }

/** The group's panels and their first sizes, which each pane reads by its id. */
export const PANELS = Symbol("resizable-panels")
export type PanelsContext = {
  panels: () => PanelEntry[]
  defaultSize: () => number[] | undefined
}
