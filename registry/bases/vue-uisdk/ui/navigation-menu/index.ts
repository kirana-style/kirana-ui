import { navigationMenu } from "../../../../styles/navigation-menu.styles"

export { default as NavigationMenu } from "./NavigationMenu.vue"
export { default as NavigationMenuContent } from "./NavigationMenuContent.vue"
export { default as NavigationMenuIndicator } from "./NavigationMenuIndicator.vue"
export { default as NavigationMenuItem } from "./NavigationMenuItem.vue"
export { default as NavigationMenuLink } from "./NavigationMenuLink.vue"
export { default as NavigationMenuList } from "./NavigationMenuList.vue"
export { default as NavigationMenuTrigger } from "./NavigationMenuTrigger.vue"

/**
 * The trigger's look, for a link in the bar beside the triggers:
 * `<NavigationMenuLink :sx="navigationMenuTriggerStyle" />`, upstream's `navigationMenuTriggerStyle()`.
 */
export const navigationMenuTriggerStyle = navigationMenu.triggerLook
