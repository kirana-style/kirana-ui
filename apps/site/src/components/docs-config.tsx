/**
 * The site's docs, as docs-ui needs them: its link, its search, its data, its tabs and where an
 * item's preview is served.
 */
import {
  BookOpen01Icon,
  DashboardSquare01Icon,
  PackageIcon,
  PaintBrush01Icon,
} from "@hugeicons/core-free-icons"
import { useRouter } from "@tanstack/react-router"

import { DocsProvider } from "@workspace/docs-ui/provider.tsx"
import type { DocsConfig, DocsTab } from "@workspace/docs-ui/provider.tsx"

import { DocsLink } from "@/components/docs-link"
import { NAV, PAGES } from "@/generated/content.gen"
import { usePageDesign } from "@/lib/page-design"
import { loadSearch, search } from "@/lib/search"

/** Tabs group sections; a page's URL never depends on its tab. */
export const TABS: readonly DocsTab[] = [
  {
    id: "docs",
    label: "Docs",
    href: "/docs",
    sections: ["start", "design", "project"],
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

/** The frameworks and bases a component page can show, as the registry names them. */
const COMBINATIONS = [
  { id: "react/base", label: "Base UI" },
  { id: "react/aria", label: "React Aria" },
  { id: "vue/ark", label: "Ark UI" },
] as const

export function SiteDocsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const design = usePageDesign()
  const value: DocsConfig = {
    Link: DocsLink,
    nav: NAV,
    pages: PAGES,
    tabs: TABS,
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
    previewSrc: (item, combination = "react/base") =>
      `/preview/${combination}/${item}`,
    combinations: COMBINATIONS,
    registryItem: (name) => `/r/${name}.json`,
    // The code installing an item writes, in the reader's style.
    codeStyle: design.system.style,
  }
  return <DocsProvider value={value}>{children}</DocsProvider>
}
