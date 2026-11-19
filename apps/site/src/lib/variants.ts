/**
 * The frameworks and bases a component is documented for, as the registry names them, in order,
 * the first the default. Each is a page of its own (`/docs/components/<framework>/<base>/<name>`,
 * the scheme `/preview` and the registry use), written from the component's one source
 * (`content/docs/components/<name>.md`, its `variants`, `::only` blocks and per-variant tabs) by
 * the content generator, with an override beside it where a variant differs throughout
 * (`<name>/<framework>-<base>.md`). React's are labelled by their base; a framework with one is
 * labelled by the framework, and the others, with more, by both. Each framework's
 * Kirana UI comes first; what a reader with no choice is shown is `DEFAULT_VARIANTS`' order.
 */
export const VARIANTS = [
  {
    id: "react/kirana",
    label: "Kirana UI",
    name: "React with Kirana UI",
    base: "Kirana UI",
  },
  {
    id: "react/base",
    label: "Base UI",
    name: "React with Base UI",
    base: "Base UI",
  },
  {
    id: "react/aria",
    label: "React Aria",
    name: "React with React Aria",
    base: "React Aria",
  },
  {
    id: "react/uisdk",
    label: "UI SDK",
    name: "React with UI SDK",
    base: "UI SDK",
  },
  {
    id: "vue/kirana",
    label: "Vue · Kirana UI",
    name: "Vue with Kirana UI",
    base: "Kirana UI",
  },
  {
    id: "vue/ark",
    label: "Vue · Ark UI",
    name: "Vue with Ark UI",
    base: "Ark UI",
  },
  {
    id: "vue/reka",
    label: "Vue · Reka UI",
    name: "Vue with Reka UI",
    base: "Reka UI",
  },
  {
    id: "vue/uisdk",
    label: "Vue · UI SDK",
    name: "Vue with UI SDK",
    base: "UI SDK",
  },
  {
    id: "svelte/kirana",
    label: "Svelte · Kirana UI",
    name: "Svelte with Kirana UI",
    base: "Kirana UI",
  },
  {
    id: "svelte/ark",
    label: "Svelte · Ark UI",
    name: "Svelte with Ark UI",
    base: "Ark UI",
  },
  {
    id: "svelte/bits",
    label: "Svelte · Bits UI",
    name: "Svelte with Bits UI",
    base: "Bits UI",
  },
  {
    id: "svelte/uisdk",
    label: "Svelte · UI SDK",
    name: "Svelte with UI SDK",
    base: "UI SDK",
  },
  {
    id: "solid/kirana",
    label: "Solid · Kirana UI",
    name: "Solid with Kirana UI",
    base: "Kirana UI",
  },
  {
    id: "solid/ark",
    label: "Solid · Ark UI",
    name: "Solid with Ark UI",
    base: "Ark UI",
  },
  {
    id: "angular/kirana",
    label: "Angular · Kirana UI",
    name: "Angular with Kirana UI",
    base: "Kirana UI",
  },
  {
    id: "angular/ng",
    label: "Angular · NG Primitives",
    name: "Angular with NG Primitives",
    base: "NG Primitives",
  },
] as const

/**
 * What a reader who has chosen nothing is shown, in order: a framework's base before Kirana UI,
 * React's Base UI first, as shadcn/ui's own links land on its Base UI page.
 */
export const DEFAULT_VARIANTS = [
  "react/base",
  "react/aria",
  "react/uisdk",
  "vue/ark",
  "vue/reka",
  "vue/uisdk",
  "svelte/ark",
  "svelte/bits",
  "svelte/uisdk",
  "solid/ark",
  "angular/ng",
] as const

/** Of `ids`, the one a reader who has chosen nothing is shown: `DEFAULT_VARIANTS`' first, else the first. */
export const defaultOf = (ids: readonly string[]): string | undefined =>
  DEFAULT_VARIANTS.find((id) => ids.includes(id)) ?? ids[0]

/**
 * The frameworks, in the variants' order, each with its variants: the header's Frameworks menu
 * lists them, and a component page switches between the bases of its own (U-025's navigation).
 */
export const FRAMEWORKS = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "solid", label: "Solid" },
  { id: "angular", label: "Angular" },
].map((framework) => ({
  ...framework,
  variants: VARIANTS.filter((variant) =>
    variant.id.startsWith(`${framework.id}/`)
  ),
}))

/** `vue/reka` → `vue`. */
export const frameworkOf = (variant: string) => variant.split("/")[0] ?? ""

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
