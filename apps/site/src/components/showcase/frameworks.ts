/**
 * The frameworks the showcase switches between, each with the combination it shows (the docs'
 * shared choice, `react/base` …) and its mark. Each is its preview app's showcase page,
 * `/preview/<framework>/<base>/showcase`.
 */
import type { SvglIcon } from "@workspace/docs-ui/brand-icon.tsx"
import angularLogo from "@workspace/docs-ui/brands/angular.svg?url"
import reactDark from "@workspace/docs-ui/brands/react_dark.svg?url"
import reactLight from "@workspace/docs-ui/brands/react_light.svg?url"
import solidLogo from "@workspace/docs-ui/brands/solidjs.svg?url"
import svelteLogo from "@workspace/docs-ui/brands/svelte.svg?url"
import vueLogo from "@workspace/docs-ui/brands/vue.svg?url"

export type ShowcaseFramework = {
  id: string
  label: string
  /** The combination it shows, as the docs name them. */
  combination: string
  icon: SvglIcon
  /** Upstream's whole home, its rails beside the grid: framed across the band, as React's. */
  full?: true
}

export const SHOWCASE_FRAMEWORKS: readonly ShowcaseFramework[] = [
  {
    id: "react",
    label: "React",
    combination: "react/base",
    full: true,
    icon: {
      title: "React",
      url: "https://react.dev",
      route: { light: reactLight, dark: reactDark },
    },
  },
  {
    id: "vue",
    label: "Vue",
    combination: "vue/ark",
    full: true,
    icon: { title: "Vue", url: "https://vuejs.org", route: vueLogo },
  },
  {
    id: "svelte",
    label: "Svelte",
    combination: "svelte/ark",
    full: true,
    icon: { title: "Svelte", url: "https://svelte.dev", route: svelteLogo },
  },
  {
    id: "solid",
    label: "Solid",
    combination: "solid/ark",
    full: true,
    icon: { title: "Solid", url: "https://www.solidjs.com", route: solidLogo },
  },
  {
    id: "angular",
    label: "Angular",
    combination: "angular/ng",
    full: true,
    icon: { title: "Angular", url: "https://angular.dev", route: angularLogo },
  },
]
