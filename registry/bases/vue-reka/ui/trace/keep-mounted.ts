import type { InjectionKey, Ref } from "vue"

/** Whether a Trace collapsible's content stays in the page while closed (its `keepMounted`). */
export const KEEP_MOUNTED: InjectionKey<Ref<boolean>> =
  Symbol("trace-keep-mounted")
