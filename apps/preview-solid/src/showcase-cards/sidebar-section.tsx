import type { Sx } from "@kirana-style/core"
import type { JSX } from "solid-js"
import { Card } from "@workspace/registry/bases/solid-ark/ui/card.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
} from "@workspace/registry/bases/solid-ark/ui/sidebar.tsx"
import { css } from "@kirana-style/core"
import { space } from "@workspace/registry/core/scales"
import { radius } from "@workspace/registry/core/tokens"

export default function SidebarSection(props: {
  label: string
  children?: JSX.Element
  sx?: Sx
}) {
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

  return (
    <Card sx={[styles.sidebarSectionCard, props.sx]}>
      <SidebarProvider sx={styles.sidebarSectionSidebarProvider}>
        <Sidebar collapsible="none" sx={styles.sidebarSectionSidebar}>
          <SidebarContent sx={styles.sidebarSectionSidebarContent}>
            <SidebarGroup>
              <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu sx={styles.sidebarSectionSidebarMenu}>
                  {props.children}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
  )
}
