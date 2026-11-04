<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "@ark-ui/svelte"

  import { Ark } from "@ark-ui/svelte"

  import { sidebar } from "../../../../styles/sidebar.styles"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
  import { useSidebar } from "./context"

  let {
    asChild: child,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    class: className,
    children,
    ...rest
  }: {
  
    isActive?: boolean
    /** A label shown beside the button while the sidebar is collapsed to its icons. */
    tooltip?: string | { children: string; hidden?: boolean }
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
    /** Ark UI's `asChild`: the element given takes the button's props. */
    asChild?: Snippet<[PropsFn<"button">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useSidebar()

  const label = $derived.by(() => typeof tooltip === "string" ? { children: tooltip } : tooltip
  )

  const VARIANTS = { default: null, outline: sidebar.menuButtonOutline }
  const SIZES = {
    default: sidebar.menuButtonDefault,
    sm: sidebar.menuButtonSm,
    lg: sidebar.menuButtonLg,
  }
</script>

{#if label}
  <Tooltip disabled={ctx.state !== 'collapsed' || ctx.isMobile || label.hidden}>
    <TooltipTrigger>
      {#snippet asChild(props)}
        <Ark {...props()} class={props().class} style={props().style} as="button" data-slot="sidebar-menu-button" data-sidebar="menu-button" data-size={size} data-active={isActive ? '' : undefined} {...rest} sx={[sidebar.menuButton, VARIANTS[variant], SIZES[size], className as Sx]} asChild={child}>
          {@render children?.()}
        </Ark>
      {/snippet}
    </TooltipTrigger>
    <TooltipContent side="right" align="center">
      {label.children}
    </TooltipContent>
  </Tooltip>
{:else}
  <Ark as="button" data-slot="sidebar-menu-button" data-sidebar="menu-button" data-size={size} data-active={isActive ? '' : undefined} {...rest} sx={[sidebar.menuButton, VARIANTS[variant], SIZES[size], className as Sx]} asChild={child}>
    {@render children?.()}
  </Ark>
{/if}
