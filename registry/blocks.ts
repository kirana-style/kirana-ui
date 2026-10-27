/**
 * The registry's blocks: each one's title, description and categories, as upstream's
 * `registry/bases/base/blocks/_registry.ts` gives them, and the categories the blocks page lists.
 * The builder writes the registry's items from it and the site's `/blocks` pages read it, so a
 * block ported into `bases/<base>/blocks/<name>/` is added here once and appears in both. Not an
 * installed file.
 */
export type BlockCategory = {
  name: string
  slug: string
  /** Upstream's: a category the blocks page does not list in its navigation. */
  hidden: boolean
}

/** Upstream's categories (`apps/v4/lib/categories.ts`), in its order. */
export const BLOCK_CATEGORIES: readonly BlockCategory[] = [
  { name: "Sidebar", slug: "sidebar", hidden: false },
  { name: "Dashboard", slug: "dashboard", hidden: true },
  { name: "Authentication", slug: "authentication", hidden: true },
  { name: "Login", slug: "login", hidden: false },
  { name: "Signup", slug: "signup", hidden: false },
]

export type Block = {
  name: string
  title: string
  description: string
  categories: readonly string[]
  /** The frame's height on the blocks page, where upstream's sets one; 930px otherwise. */
  height?: string
}

/** Every block the registry has, in upstream's order. */
export const BLOCKS: readonly Block[] = [
  {
    name: "login-01",
    title: "Login 01",
    description: "A simple login form.",
    categories: ["authentication", "login"],
  },
  {
    name: "sidebar-07",
    title: "Sidebar 07",
    description: "A sidebar that collapses to icons.",
    categories: ["sidebar", "dashboard"],
  },
]

/** Upstream's featured blocks (`/blocks`), those of them the registry has. */
export const FEATURED_BLOCKS: readonly string[] = [
  "dashboard-01",
  "sidebar-07",
  "sidebar-03",
  "login-03",
  "login-04",
].filter((name) => BLOCKS.some((block) => block.name === name))

export function blockInfo(name: string): Block {
  const block = BLOCKS.find((entry) => entry.name === name)
  if (!block) throw new Error(`registry/blocks.ts: no block ${name}`)
  return block
}
