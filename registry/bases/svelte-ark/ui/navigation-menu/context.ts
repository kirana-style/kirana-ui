/** The element the open panel is shown in, which each content is portalled into: a getter. */
export const VIEWPORT = Symbol("navigation-menu-viewport")
export type ViewportContext = { readonly element: HTMLElement | undefined }
