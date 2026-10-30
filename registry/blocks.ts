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
    name: "login-02",
    title: "Login 02",
    description: "A two column login page with a cover image.",
    categories: ["authentication", "login"],
  },
  {
    name: "login-03",
    title: "Login 03",
    description: "A login page with a muted background color.",
    categories: ["authentication", "login"],
  },
  {
    name: "login-04",
    title: "Login 04",
    description: "A login page with form and image.",
    categories: ["authentication", "login"],
  },
  {
    name: "login-05",
    title: "Login 05",
    description: "A simple email-only login page.",
    categories: ["authentication", "login"],
  },
  {
    name: "signup-01",
    title: "Signup 01",
    description: "A simple signup form.",
    categories: ["authentication", "signup"],
  },
  {
    name: "signup-02",
    title: "Signup 02",
    description: "A two column signup page with a cover image.",
    categories: ["authentication", "signup"],
  },
  {
    name: "signup-03",
    title: "Signup 03",
    description: "A signup page with a muted background color.",
    categories: ["authentication", "signup"],
  },
  {
    name: "signup-04",
    title: "Signup 04",
    description: "A signup page with form and image.",
    categories: ["authentication", "signup"],
  },
  {
    name: "signup-05",
    title: "Signup 05",
    description: "A simple signup form with social providers.",
    categories: ["authentication", "signup"],
  },
  {
    name: "dashboard-01",
    title: "Dashboard 01",
    description: "A dashboard with sidebar, charts and data table.",
    categories: ["dashboard"],
    height: "1000px",
  },
  {
    name: "sidebar-01",
    title: "Sidebar 01",
    description: "A simple sidebar with navigation grouped by section.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-02",
    title: "Sidebar 02",
    description: "A sidebar with collapsible sections.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-03",
    title: "Sidebar 03",
    description: "A sidebar with submenus.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-04",
    title: "Sidebar 04",
    description: "A floating sidebar with submenus.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-05",
    title: "Sidebar 05",
    description: "A sidebar with collapsible submenus.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-06",
    title: "Sidebar 06",
    description: "A sidebar with submenus as dropdowns.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-07",
    title: "Sidebar 07",
    description: "A sidebar that collapses to icons.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-08",
    title: "Sidebar 08",
    description: "An inset sidebar with secondary navigation.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-09",
    title: "Sidebar 09",
    description: "Collapsible nested sidebars.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-10",
    title: "Sidebar 10",
    description: "A sidebar in a popover.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-11",
    title: "Sidebar 11",
    description: "A sidebar with a collapsible file tree.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-12",
    title: "Sidebar 12",
    description: "A sidebar with a calendar.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-13",
    title: "Sidebar 13",
    description: "A sidebar in a dialog.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-14",
    title: "Sidebar 14",
    description: "A sidebar on the right.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-15",
    title: "Sidebar 15",
    description: "A left and right sidebar.",
    categories: ["sidebar", "dashboard"],
  },
  {
    name: "sidebar-16",
    title: "Sidebar 16",
    description: "A sidebar with a sticky site header.",
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
