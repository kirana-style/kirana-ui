import { navigationMenu } from "../../../../styles/navigation-menu.styles"

export { default as NavigationMenu } from "./NavigationMenu.svelte"
export { default as NavigationMenuContent } from "./NavigationMenuContent.svelte"
export { default as NavigationMenuIndicator } from "./NavigationMenuIndicator.svelte"
export { default as NavigationMenuItem } from "./NavigationMenuItem.svelte"
export { default as NavigationMenuLink } from "./NavigationMenuLink.svelte"
export { default as NavigationMenuList } from "./NavigationMenuList.svelte"
export { default as NavigationMenuTrigger } from "./NavigationMenuTrigger.svelte"

/**
 * The trigger's look, for a link in the bar beside the triggers:
 * `<NavigationMenuLink :sx="navigationMenuTriggerStyle" />`, upstream's `navigationMenuTriggerStyle()`.
 */
export const navigationMenuTriggerStyle = navigationMenu.triggerLook
