/**
 * The frameworks' marks, kept in `brands/` as the other logos are: the header's Frameworks menu,
 * the docs' base switch and `/create`'s Get Code draw them from here.
 */
import type { SvglIcon } from "./brand-icon.tsx"
import angularLogo from "./brands/angular.svg?url"
import reactDark from "./brands/react_dark.svg?url"
import reactLight from "./brands/react_light.svg?url"
import solidLogo from "./brands/solidjs.svg?url"
import svelteLogo from "./brands/svelte.svg?url"
import vueLogo from "./brands/vue.svg?url"

export const REACT: SvglIcon = {
  title: "React",
  url: "https://react.dev",
  route: { light: reactLight, dark: reactDark },
}
export const VUE: SvglIcon = {
  title: "Vue",
  url: "https://vuejs.org",
  route: vueLogo,
}
export const SVELTE: SvglIcon = {
  title: "Svelte",
  url: "https://svelte.dev",
  route: svelteLogo,
}
export const SOLID: SvglIcon = {
  title: "Solid",
  url: "https://www.solidjs.com",
  route: solidLogo,
}
export const ANGULAR: SvglIcon = {
  title: "Angular",
  url: "https://angular.dev",
  route: angularLogo,
}

/** Each framework's mark, by the registry's framework name. */
export const FRAMEWORK_LOGOS: Record<string, SvglIcon> = {
  react: REACT,
  vue: VUE,
  svelte: SVELTE,
  solid: SOLID,
  angular: ANGULAR,
}
