import {
  createContext,
  createSignal,
  createUniqueId,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"
import { Portal } from "solid-js/web"
import { props as styleProps } from "@kirana-style/core"
// Ark's package root does not export the navigation menu (LF-010), so every part imports its
// subpath.
import {
  NavigationMenuContent as ArkNavigationMenuContent,
  NavigationMenuIndicator as ArkNavigationMenuIndicator,
  NavigationMenuItem as ArkNavigationMenuItem,
  NavigationMenuLink as ArkNavigationMenuLink,
  NavigationMenuList as ArkNavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger as ArkNavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
} from "@ark-ui/solid/navigation-menu"
import type {
  NavigationMenuIndicatorProps,
  NavigationMenuLinkProps,
  NavigationMenuTriggerProps,
} from "@ark-ui/solid/navigation-menu"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import { navigationMenu } from "../../../styles/navigation-menu.styles"
import { IconPlaceholder } from "./icon-placeholder"

/** The viewport the open item's content is shown in. */
const ViewportContext = createContext<() => HTMLElement | undefined>()

/**
 * Ark UI's navigation menu, drawn as Base UI's: the bar, and below it a positioner holding the
 * popup and its viewport, which the open item's content is shown in (each content portals there,
 * as Base UI's moves into its viewport). Zag measures the panel and the open trigger's offset
 * (`--viewport-*`), which the popup reads (`navigationMenu.popupArk`).
 */
function NavigationMenu(props: {
  align?: "start" | "center" | "end"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ align: "start" } as const, props),
    ["align", "class", "sx", "children"]
  )
  const [viewport, setViewport] = createSignal<HTMLElement>()
  // Closed panels unmount, as Base UI's do.
  return (
    <ViewportContext.Provider value={viewport}>
      <NavigationMenuRoot
        lazyMount
        unmountOnExit
        {...rest}
        asChild={(childProps) => (
          <nav
            {...childProps()}
            data-slot="navigation-menu"
            {...styleProps(
              childProps().class,
              local.class,
              navigationMenu.root,
              local.sx
            )}
          >
            {local.children}
            {/* The viewport takes its alignment from the positioner; an `align` on it would land
                on the div as HTML's presentational attribute, a `text-align`. */}
            <NavigationMenuViewportPositioner
              align={local.align}
              asChild={(positionerProps) => (
                <div
                  {...positionerProps()}
                  {...styleProps(
                    positionerProps().class,
                    navigationMenu.positioner,
                    navigationMenu.positionerArk
                  )}
                >
                  <NavigationMenuViewport
                    asChild={(viewportProps) => (
                      <div
                        {...viewportProps()}
                        {...styleProps(
                          viewportProps().class,
                          navigationMenu.popup,
                          navigationMenu.popupArk
                        )}
                      >
                        <div ref={setViewport} sx={navigationMenu.viewport} />
                      </div>
                    )}
                  />
                </div>
              )}
            />
          </nav>
        )}
      />
    </ViewportContext.Provider>
  )
}

function NavigationMenuContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const viewport = useContext(ViewportContext)
  return (
    <Portal mount={viewport?.()}>
      <ArkNavigationMenuContent
        data-slot="navigation-menu-content"
        {...rest}
        {...styleProps(local.class, navigationMenu.content, local.sx)}
      >
        {local.children}
      </ArkNavigationMenuContent>
    </Portal>
  )
}

function NavigationMenuIndicator(props: {
  asChild?: NavigationMenuIndicatorProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <ArkNavigationMenuIndicator
      asChild={local.asChild}
      data-slot="navigation-menu-indicator"
      {...rest}
      {...styleProps(local.class, navigationMenu.indicator, local.sx)}
    >
      <div sx={navigationMenu.arrow} />
    </ArkNavigationMenuIndicator>
  )
}

function NavigationMenuItem(props: {
  /** Base UI's `value` is optional: one is made when it is not given. */
  value?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const id = createUniqueId()
  const [local, rest] = splitProps(mergeProps({ value: id }, props), [
    "value",
    "class",
    "sx",
    "children",
  ])
  return (
    <ArkNavigationMenuItem
      value={local.value}
      asChild={(childProps) => (
        <li
          {...childProps()}
          data-slot="navigation-menu-item"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            navigationMenu.item,
            local.sx
          )}
        >
          {local.children}
        </li>
      )}
    />
  )
}

function NavigationMenuLink(props: {
  /** Base UI's: the current page's link. */
  active?: boolean
  asChild?: NavigationMenuLinkProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ active: false } as const, props),
    ["asChild", "active", "class", "sx", "children"]
  )
  return (
    <ArkNavigationMenuLink
      data-slot="navigation-menu-link"
      current={local.active}
      asChild={local.asChild}
      {...rest}
      {...styleProps(local.class, navigationMenu.link, local.sx)}
    >
      {local.children}
    </ArkNavigationMenuLink>
  )
}

function NavigationMenuList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    // Zag writes `position: relative` on the list for its indicator; Base UI's list is static.
    <ArkNavigationMenuList
      style={{ position: "static" }}
      asChild={(childProps) => (
        <ul
          {...childProps()}
          data-slot="navigation-menu-list"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            navigationMenu.list,
            local.sx
          )}
        >
          {local.children}
        </ul>
      )}
    />
  )
}

function NavigationMenuTrigger(props: {
  asChild?: NavigationMenuTriggerProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ArkNavigationMenuTrigger
      asChild={local.asChild}
      data-slot="navigation-menu-trigger"
      {...rest}
      {...styleProps(local.class, navigationMenu.trigger, local.sx)}
    >
      {local.children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        aria-hidden="true"
        {...styleProps(navigationMenu.triggerIcon)}
      />
    </ArkNavigationMenuTrigger>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
}
export const navigationMenuTriggerStyle = navigationMenu.triggerLook
