<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { sidebar } from "../../../../styles/sidebar.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "../sheet"
  import { useSidebar } from "./context"

  let {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    dir,
    class: className,
    children,
    ...rest
  }: {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
    dir?: "ltr" | "rtl"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useSidebar()
</script>

{#if collapsible === 'none'}
  <div data-slot="sidebar" {...rest} sx={[sidebar.static, className as Sx]}>
    {@render children?.()}
  </div>
{:else if ctx.isMobile}
  <Sheet open={ctx.openMobile} {...rest} onOpenChange={(details: { open: boolean }) => ctx.setOpenMobile(details.open)}>
    <SheetContent dir={dir} data-sidebar="sidebar" data-slot="sidebar" data-mobile="true" sx={sidebar.mobile} side={side} showCloseButton={false}>
      <SheetHeader sx={visuallyHidden}>
        <SheetTitle>
          Sidebar
        </SheetTitle>
        <SheetDescription>
          Displays the mobile sidebar.
        </SheetDescription>
      </SheetHeader>
      <div sx={sidebar.mobileInner}>
        {@render children?.()}
      </div>
    </SheetContent>
  </Sheet>
{:else}
  <div data-state={ctx.state} data-collapsible={ctx.state === 'collapsed' ? collapsible : ''} data-variant={variant} data-side={side} data-slot="sidebar" sx={sidebar.root}>
    <!-- Holds the room the fixed panel takes on the page. -->
    <div data-slot="sidebar-gap" sx={[
        sidebar.gap,
        (variant === 'floating' || variant === 'inset') && sidebar.gapPadded,
      ]}></div>
    <div data-slot="sidebar-container" data-side={side} dir={dir} {...rest} sx={[sidebar.container, (variant === 'floating' || variant === 'inset') &&
          sidebar.containerPadded, className as Sx]}>
      <div data-sidebar="sidebar" data-slot="sidebar-inner" sx={sidebar.inner}>
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
