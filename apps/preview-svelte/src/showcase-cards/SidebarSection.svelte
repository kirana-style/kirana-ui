<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { Snippet } from "svelte"
  import type { ClassValue, HTMLAttributes } from "svelte/elements"

  import { Card } from "@workspace/registry/bases/svelte-ark/ui/card/index.ts"
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarProvider,
  } from "@workspace/registry/bases/svelte-ark/ui/sidebar/index.ts"
  import { css } from "@kirana-style/core"
  import { space } from "@workspace/registry/core/scales"
  import { radius } from "@workspace/registry/core/tokens"

  let {
    label,
    children,
    class: className,
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    label: string
    children?: Snippet
    // The caller's `sx`, which Kirana hands a component as `class`, as the registry's parts take it.
    class?: ClassValue | null
  } = $props()

  const styles = {
    sidebarSectionCard: css({
      width: { "*": null, base: "100%" },
      overflow: { "*": null, base: "hidden" },
      borderRadius: { "*": null, base: radius["3xl"] },
      // Longhands: Card sets `paddingTop` and `paddingBottom`, which a `paddingBlock` loses to
      // (KF-083; Kirana reports it since 0.3.7).
      paddingTop: { "*": null, base: space["0"] },
      paddingBottom: { "*": null, base: space["0"] },
    }),
    sidebarSectionSidebarProvider: css({
      minHeight: { "*": null, base: space["0"] },
    }),
    sidebarSectionSidebar: css({
      width: { "*": null, base: "100%" },
      backgroundColor: "transparent",
    }),
    sidebarSectionSidebarContent: css({
      gap: { "*": null, base: space["0"] },
      overflow: { "*": null, base: "hidden" },
    }),
    sidebarSectionSidebarMenu: css({
      gap: { "*": null, base: space[1] },
    }),
  }
</script>

<Card sx={[styles.sidebarSectionCard, className as Sx]}>
  <SidebarProvider sx={styles.sidebarSectionSidebarProvider}>
    <Sidebar collapsible="none" sx={styles.sidebarSectionSidebar}>
      <SidebarContent sx={styles.sidebarSectionSidebarContent}>
        <SidebarGroup>
          <SidebarGroupLabel>
            {label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu sx={styles.sidebarSectionSidebarMenu}>
              {@render children?.()}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</Card>
