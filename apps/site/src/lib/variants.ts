/**
 * The frameworks and bases a component is documented for, as the registry names them, in order,
 * the first the default. Each is a page of its own (`/docs/components/<framework>/<base>/<name>`,
 * the scheme `/preview` and the registry use), written from the component's one source
 * (`content/docs/components/<name>.md`, its `variants`, `::only` blocks and per-variant tabs) by
 * the content generator, with an override beside it where a variant differs throughout
 * (`<name>/<framework>-<base>.md`). React's two are labelled by their base; every other framework
 * has one, so it is labelled by the framework.
 */
export const VARIANTS = [
  { id: "react/base", label: "Base UI", name: "React with Base UI" },
  { id: "react/aria", label: "React Aria", name: "React with React Aria" },
  { id: "vue/ark", label: "Vue", name: "Vue" },
  { id: "svelte/ark", label: "Svelte", name: "Svelte" },
  { id: "solid/ark", label: "Solid", name: "Solid" },
  { id: "angular/ng", label: "Angular", name: "Angular" },
] as const

export type VariantId = (typeof VARIANTS)[number]["id"]

/** `/docs/components/vue/ark/button` → `vue/ark`; a page with no variant in its path → undefined. */
export function variantOfPath(path: string): VariantId | undefined {
  const match = /^\/docs\/[^/]+\/([a-z]+\/[a-z]+)\/[^/]+\/?$/.exec(path)
  return VARIANTS.find((variant) => variant.id === match?.[1])?.id
}

/** A variant page's path, without its variant: the URL every variant of the page shares. */
export function sharedPath(path: string): string {
  const variant = variantOfPath(path)
  return variant ? path.replace(`/${variant}/`, "/") : path
}
