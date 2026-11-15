import type { InjectionKey } from "vue"

/** A panel's entry in its group's `panels`, as Ark UI's splitter takes it. */
export type PanelEntry = {
  id: string
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  collapsedSize?: number
}

/** The group's panels by id, which each panel reads its limits from. */
export const PANELS: InjectionKey<() => PanelEntry[] | undefined> =
  Symbol("resizable-panels")
