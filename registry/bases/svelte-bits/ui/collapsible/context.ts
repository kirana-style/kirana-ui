/** Whether a collapsible's closed panel stays in the page, `hidden` (Ark UI's `unmountOnExit` false). */
export const KEEP_PANEL = Symbol("collapsible-keep-panel")

export type KeepPanel = () => boolean
