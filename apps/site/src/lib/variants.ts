/**
 * The frameworks and bases a component is documented for, as the registry names them, in order,
 * the first the default. Each is a page of its own (`/docs/components/<framework>/<base>/<name>`,
 * the scheme `/preview` and the registry use), written from the component's one source
 * (`content/docs/components/<name>.md`, its `variants`, `::only` blocks and per-variant tabs) by
 * the content generator, with an override beside it where a variant differs throughout
 * (`<name>/<framework>-<base>.md`). React's two are labelled by their base; a framework with one
 * is labelled by the framework, and Vue and Svelte, with two, by both.
 */
export const VARIANTS = [
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
    label: "ui-sdk",
    name: "React with ui-sdk",
    base: "ui-sdk",
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
  { id: "solid/ark", label: "Solid", name: "Solid", base: "Ark UI" },
  {
    id: "angular/ng",
    label: "Angular",
    name: "Angular",
    base: "ng-primitives",
  },
] as const

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
