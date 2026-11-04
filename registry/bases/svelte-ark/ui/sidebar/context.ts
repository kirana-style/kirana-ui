import { getContext } from "svelte"

/** What a SidebarProvider hands its parts, as React's context does: getters, so they follow it. */
export type SidebarContext = {
  readonly state: "expanded" | "collapsed"
  readonly open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  readonly openMobile: boolean
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void
  readonly isMobile: boolean
  toggleSidebar: () => void
}

export const SIDEBAR = Symbol("sidebar")

export function useSidebar() {
  const context = getContext<SidebarContext | undefined>(SIDEBAR)
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.")
  return context
}
