import { inject } from "vue"
import type { InjectionKey, Ref } from "vue"

/** What a SidebarProvider hands its parts, as React's context does. */
export type SidebarContext = {
  state: Ref<"expanded" | "collapsed">
  open: Ref<boolean>
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  openMobile: Ref<boolean>
  setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void
  isMobile: Readonly<Ref<boolean>>
  toggleSidebar: () => void
}

export const SIDEBAR: InjectionKey<SidebarContext> = Symbol("sidebar")

export function useSidebar() {
  const context = inject(SIDEBAR)
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.")
  return context
}
