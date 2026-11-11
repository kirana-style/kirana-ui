<script lang="ts">
  import { onMount, setContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { useIsMobile } from "../../../../lib/svelte/use-mobile.svelte"
  import { sidebar } from "../../../../styles/sidebar.styles"
  import { SIDEBAR } from "./context"
  import type { SidebarContext } from "./context"

  const SIDEBAR_COOKIE_NAME = "sidebar_state"
  const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
  const SIDEBAR_KEYBOARD_SHORTCUT = "b"

  let {
    defaultOpen = true,
    open: controlled,
    onOpenChange,
    class: className,
    children,
    ...rest
  }: {
    defaultOpen?: boolean
    /** The caller's state, in place of the sidebar's own, with `onOpenChange`. */
    open?: boolean
    onOpenChange?: (open: boolean) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const isMobile = useIsMobile()
  let openMobile = $state(false)
  // The sidebar's own state, unless the caller controls it.
  // svelte-ignore state_referenced_locally
  let own = $state(defaultOpen)
  const open = $derived(controlled ?? own)

  function setOpen(value: boolean | ((value: boolean) => boolean)) {
    const openState = typeof value === "function" ? value(open) : value
    if (controlled !== undefined) onOpenChange?.(openState)
    else own = openState
    // Kept in a cookie, so the next page load starts in the same state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }
  function setOpenMobile(value: boolean | ((value: boolean) => boolean)) {
    openMobile = typeof value === "function" ? value(openMobile) : value
  }
  const toggleSidebar = () =>
    isMobile.current ? setOpenMobile((current) => !current) : setOpen((current) => !current)

  // ⌘B or Ctrl+B toggles the sidebar.
  onMount(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", onKeydown)
    return () => window.removeEventListener("keydown", onKeydown)
  })

  setContext<SidebarContext>(SIDEBAR, {
    // `data-state="expanded"` or `"collapsed"` on the sidebar, which its parts read.
    get state() {
      return open ? "expanded" : "collapsed"
    },
    get open() {
      return open
    },
    setOpen,
    get openMobile() {
      return openMobile
    },
    setOpenMobile,
    get isMobile() {
      return isMobile.current
    },
    toggleSidebar,
  })
</script>

<div data-slot="sidebar-wrapper" {...rest} class={className} sx={sidebar.wrapper}>
  {@render children?.()}
</div>
