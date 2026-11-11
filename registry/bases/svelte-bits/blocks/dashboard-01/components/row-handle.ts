/** The row's drag handle: its sortable's `attachHandle`, which the handle in its first cell takes. */
export const ROW_HANDLE = Symbol("row-handle")
export type RowHandleContext = { attach: (node: HTMLElement) => () => void }
