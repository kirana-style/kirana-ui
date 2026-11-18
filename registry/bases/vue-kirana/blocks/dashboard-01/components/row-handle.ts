import type { InjectionKey, Ref } from "vue"

/** The row's drag handle: the element the row's sortable is dragged by. */
export const ROW_HANDLE: InjectionKey<Ref<HTMLElement | null>> =
  Symbol("row-handle")
