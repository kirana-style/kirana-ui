import type { InjectionKey } from "vue"

/** A panel's share and limits, by its id: what Vue's Ark UI group is given for its panels. */
export type PanelSizes = (id: string) => {
  defaultSize?: number
  minSize?: number
  maxSize?: number
}

export const RESIZABLE: InjectionKey<PanelSizes> = Symbol("resizable")
