import { getContext, setContext } from "svelte"

/** A panel's entry in its group's `panels`, as Ark UI's splitter takes it. */
export type PanelEntry = {
  id: string
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  collapsedSize?: number
}

const KEY = Symbol("resizable-panels")
/** The group's panels by id, which each panel reads its limits from. */
export const setPanels = (panels: () => PanelEntry[] | undefined) =>
  setContext(KEY, panels)
export const usePanels = () =>
  getContext<(() => PanelEntry[] | undefined) | undefined>(KEY)
