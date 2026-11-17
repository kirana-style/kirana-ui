/**
 * The site's docs, as docs-ui needs them: its link, its search, its data, its tabs and where an
 * item's preview is served.
 */
import {
  AiBrain01Icon,
  BookOpen01Icon,
  CubeIcon,
  DashboardSquare01Icon,
  PackageIcon,
  PaintBrush01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"
import { useRouter } from "@tanstack/react-router"

import { DocsProvider } from "@workspace/docs-ui/provider.tsx"
import type {
  DocsConfig,
  DocsTab,
  DocsTabGroup,
} from "@workspace/docs-ui/provider.tsx"

import { DocsLink } from "@/components/docs-link"
import { FrameworkMenu } from "@/components/frameworks"
import { NAV, PAGES } from "@/generated/content.gen"
import { FRAMEWORKS, VARIANTS, frameworkOf } from "@/lib/variants"
import { frameQuery, usePageDesign } from "@/lib/page-design"
import { loadSearch, search } from "@/lib/search"

/** Tabs group sections; a page's URL never depends on its tab. */
export const TABS: readonly DocsTab[] = [
  {
    id: "docs",
    label: "Docs",
    href: "/docs",
    sections: ["start", "design", "forms", "utils", "project"],
    accent: "neutral",
    icon: BookOpen01Icon,
  },
  {
    id: "components",
    label: "Components",
    href: "/docs/components",
    sections: ["components"],
    accent: "neutral",
    icon: DashboardSquare01Icon,
  },
  {
    id: "ai-elements",
    label: "AI Elements",
    href: "/docs/ai-elements",
    sections: ["ai-elements"],
    accent: "neutral",
    icon: SparklesIcon,
  },
  {
    id: "kirana",
    label: "Kirana",
    href: "/docs/kirana/how-styles-are-built",
    sections: ["kirana"],
    accent: "neutral",
    icon: PaintBrush01Icon,
  },
  {
    id: "registry",
    label: "Registry",
    href: "/docs/registry",
    sections: ["registry"],
    accent: "neutral",
    icon: PackageIcon,
  },
]

/**
 * Kirana UI Primitives' pages have a chrome of their own: these three tabs alone, and "Headless"
 * beside the logo where the other pages say "Docs".
 */
export const HEADLESS_TABS: readonly DocsTab[] = [
  {
    id: "primitives",
    label: "Primitives",
    href: "/docs/primitives",
    sections: ["primitives"],
    accent: "neutral",
    icon: CubeIcon,
  },
  {
    id: "primitives-components",
    label: "Components",
    href: "/docs/primitives/components",
    sections: ["primitives-components"],
    accent: "neutral",
    icon: DashboardSquare01Icon,
  },
  {
    id: "ai",
    label: "AI",
    href: "/docs/ai",
    sections: ["ai"],
    accent: "neutral",
    icon: AiBrain01Icon,
  },
]

export const TAB_GROUPS: readonly DocsTabGroup[] = [
  { id: "headless", badge: "Headless", tabs: HEADLESS_TABS },
]

/** The frameworks and bases a component page can show, as the registry names them (`lib/variants.ts`). */
const COMBINATIONS = VARIANTS.map(({ id, label, base }) => {
  const framework = FRAMEWORKS.find((each) => each.id === frameworkOf(id))
  return {
    id,
    label,
    base,
    framework: framework && { id: framework.id, label: framework.label },
  }
})

export function SiteDocsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const design = usePageDesign()
  const value: DocsConfig = {
    Link: DocsLink,
    nav: NAV,
    pages: PAGES,
    tabs: TABS,
    tabGroups: TAB_GROUPS,
    search: (query) => search(query),
    loadSearch,
    navigate: (href) => {
      const [path = "", hash] = href.split("#")
      void router.navigate({
        to: "/docs/$",
        params: { _splat: path.replace(/^\/docs\/?/, "") },
        hash,
      })
    },
    siteUrl: "https://ui.kirana.style",
    siteName: "kirana/ui",
    // An item's preview page for a combination, Base UI's by default; it reads the reader's design
    // from the cookie, and takes a change from the customizer by message.
    // The reader's framework, where pages differ by it (U-025's navigation): Components and AI
    // Elements; Docs, Kirana and Registry are the same for every framework, and the headless
    // pages (Primitives, AI) have no framework menu.
    sidebarHeader: (tab) =>
      tab === "components" || tab === "ai-elements" ? <FrameworkMenu /> : null,
    previewSrc: (item, combination = "react/base") =>
      `/preview/${combination}/${item}`,
    frameQuery,
    combinations: COMBINATIONS,
    registryItem: (name) => `/r/${name}.json`,
    // The code installing an item writes, in the reader's style.
    codeStyle: design.system.style,
    // A demo's code, as a project writes it, with the reader's icon library.
    demoCode: (item) => `/r/demos/${item}.json`,
    iconLibrary: design.system.iconLibrary,
    rtlGuide: "/docs/design-system/rtl",
  }
  return <DocsProvider value={value}>{children}</DocsProvider>
}
