/**
 * What the site header links to, as the Kirana site's `nav.ts` lays its menus out: one list, so
 * the header, the phone's sheet and the footer never disagree. kirana/ui is its components, so
 * they lead, with the blocks and the charts, as links of their own (the colours are under Docs); Docs and Community
 * are the two menus, each page in one of them. Create, to `/create`, is the button at the end, as
 * the Kirana site's Quick start is.
 */
import {
  BookOpen01Icon,
  FavouriteIcon,
  GitBranchIcon,
  GithubIcon,
  HandshakeIcon,
  JusticeScale01Icon,
  ChartAreaIcon,
  LayoutTwoColumnIcon,
  Rocket01Icon,
  SourceCodeIcon,
  DashboardSquare01Icon,
  PackageIcon,
  PaintBrush01Icon,
  QrCodeIcon,
  RoboticIcon,
  SwatchIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import type { HueName } from "@/components/page/hue"

type IconData = typeof BookOpen01Icon

/**
 * The landscapes the site's pages stand in, from the Kirana site's scenery: each gives its page a
 * picture (the hero and the footer draw it in pixels) and a hue (`page/hue.ts`), and each menu
 * link the hue of the page it leads to.
 */
export type SceneId =
  | "highlands"
  | "heritage-street"
  | "old-hall"
  | "golden-fields"
  | "rock-garden"
  | "still-water"
  | "city-dusk"
  | "misty-hills"
  | "turquoise-lake"

export const SCENES: Record<SceneId, { position: string; hue: HueName }> = {
  // The docs, and the menus' first steps.
  highlands: { position: "50% 40%", hue: "forest" },
  // The home page, and how the styles are built.
  "heritage-street": { position: "50% 55%", hue: "terracotta" },
  // The project: open source, the licence, the partners.
  "old-hall": { position: "50% 50%", hue: "ochre" },
  "golden-fields": { position: "50% 50%", hue: "ochre" },
  // Many stones, one garden: the blocks.
  "rock-garden": { position: "50% 50%", hue: "tea" },
  // The charts.
  "still-water": { position: "50% 50%", hue: "lake" },
  // The colours.
  "city-dusk": { position: "50% 45%", hue: "dusk" },
  // The Docs menu's featured cards, none of them a scene the Kirana site's menus show: a sunrise
  // over tea rows for a start, a clear lake for how the styles are built.
  "misty-hills": { position: "50% 45%", hue: "tea" },
  "turquoise-lake": { position: "50% 55%", hue: "crater" },
}

export const sceneImage = (id: SceneId) => `/scenes/${id}-800.webp`

export type NavLinkItem = {
  title: string
  description: string
  href: string
  icon: IconData
  /** The scene the destination stands in: its glyph takes that scene's hue. */
  scene: SceneId
}

export type Featured = NavLinkItem & {
  /** Which small illustration stands on the scene (`menu-art.tsx`). */
  art: "start" | "compile"
}

export type Menu = {
  title: string
  featured: readonly Featured[]
  columns: readonly { title?: string; links: readonly NavLinkItem[] }[]
}

export const REPOSITORY = "https://github.com/kirana-style/kirana-ui"

/** The header's links of their own, before the menus: what kirana/ui is. */
export const LINKS: readonly NavLinkItem[] = [
  {
    title: "Components",
    description: "Each one live, with the code it installs",
    href: "/docs/components",
    icon: DashboardSquare01Icon,
    scene: "highlands",
  },
  {
    title: "Blocks",
    description: "Sidebars and login pages, with their code",
    href: "/blocks",
    icon: LayoutTwoColumnIcon,
    scene: "rock-garden",
  },
  {
    title: "Charts",
    description: "Area, bar, line, pie, radar and radial",
    href: "/charts",
    icon: ChartAreaIcon,
    scene: "still-water",
  },
]

/** The sponsor link: the heart beside the menus, and a row in Community. */
export const SPONSOR: NavLinkItem = {
  title: "Sponsor",
  description: "Keep both projects independent",
  href: "/sponsor",
  icon: FavouriteIcon,
  scene: "golden-fields",
}

export const MENUS: readonly Menu[] = [
  {
    title: "Docs",
    featured: [
      {
        title: "Installation",
        description:
          "Start a project in the design you chose, or add it to one you have.",
        href: "/docs/installation",
        icon: Rocket01Icon,
        scene: "misty-hills",
        art: "start",
      },
      {
        title: "How the styles are built",
        description:
          "Every style in one module per component, compiled by Kirana.",
        href: "/docs/kirana/how-styles-are-built",
        icon: SourceCodeIcon,
        scene: "turquoise-lake",
        art: "compile",
      },
    ],
    columns: [
      {
        links: [
          {
            title: "Introduction",
            description: "What kirana/ui is, and what you get",
            href: "/docs",
            icon: BookOpen01Icon,
            scene: "highlands",
          },
          {
            title: "Design system",
            description: "Styles, colours, fonts and radius",
            href: "/docs/design-system/styles",
            icon: PaintBrush01Icon,
            scene: "heritage-street",
          },
          {
            title: "Colors",
            description: "Tailwind's palette, in three formats",
            href: "/colors",
            icon: SwatchIcon,
            scene: "city-dusk",
          },
          {
            title: "Presets",
            description: "A whole design in a short code",
            href: "/docs/presets",
            icon: QrCodeIcon,
            scene: "still-water",
          },
          {
            title: "Registry",
            description: "A registry of your own, in this format",
            href: "/docs/registry",
            icon: PackageIcon,
            scene: "rock-garden",
          },
          {
            title: "For agents",
            description: "llms.txt, and every page as markdown",
            href: "/docs#for-language-models",
            icon: RoboticIcon,
            scene: "highlands",
          },
        ],
      },
    ],
  },
  {
    title: "Community",
    featured: [],
    columns: [
      {
        title: "Follow",
        links: [
          {
            title: "GitHub",
            description: "The repository, its issues",
            href: REPOSITORY,
            icon: GithubIcon,
            scene: "old-hall",
          },
          {
            title: "Kirana",
            description: "The compiler it is built on",
            href: "https://kirana.style",
            icon: SourceCodeIcon,
            scene: "highlands",
          },
          {
            title: "shadcn/ui",
            description: "The components it ports",
            href: "https://ui.shadcn.com",
            icon: DashboardSquare01Icon,
            scene: "rock-garden",
          },
        ],
      },
      {
        title: "Take part",
        links: [
          {
            title: "Open source",
            description: "Why it is free, and stays so",
            href: "/open-source",
            icon: UserGroupIcon,
            scene: "old-hall",
          },
          {
            title: "Contributing",
            description: "Report, port, fix a page",
            href: "/docs/project/contributing",
            icon: GitBranchIcon,
            scene: "old-hall",
          },
          {
            title: "License",
            description: "MIT, and what it builds on",
            href: "/license",
            icon: JusticeScale01Icon,
            scene: "old-hall",
          },
        ],
      },
      {
        title: "Support",
        links: [
          SPONSOR,
          {
            title: "Partners",
            description: "The services it runs on",
            href: "/partners",
            icon: HandshakeIcon,
            scene: "old-hall",
          },
        ],
      },
    ],
  },
]

/** The footer's link groups. */
export const FOOTER: readonly {
  title: string
  links: readonly { label: string; href: string }[]
}[] = [
  {
    title: "Learn",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "kirana-style ui", href: "/docs/cli" },
      { label: "shadcn/ui's CLI", href: "/docs/shadcn" },
      { label: "Design system", href: "/docs/design-system/styles" },
      { label: "Presets", href: "/docs/presets" },
      {
        label: "How styles are built",
        href: "/docs/kirana/how-styles-are-built",
      },
    ],
  },
  {
    title: "Library",
    links: [
      { label: "Components", href: "/docs/components" },
      { label: "Blocks", href: "/blocks" },
      { label: "Charts", href: "/charts" },
      { label: "Colors", href: "/colors" },
      { label: "Create", href: "/create" },
      { label: "Registry", href: "/docs/registry" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: REPOSITORY },
      { label: "Open source", href: "/open-source" },
      { label: "Contributing", href: "/docs/project/contributing" },
      { label: "License", href: "/license" },
      { label: "Sponsor", href: "/sponsor" },
      { label: "Partners", href: "/partners" },
      { label: "For LLMs", href: "/llms.txt" },
      { label: "Kirana", href: "https://kirana.style" },
    ],
  },
]
