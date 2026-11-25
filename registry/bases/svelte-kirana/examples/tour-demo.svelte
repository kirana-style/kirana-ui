<script lang="ts">
  import { css } from "@kirana-style/core"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import { Tour, TourContent } from "../ui/tour"
  import type { TourStep } from "../ui/tour"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    stack: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: space[6],
    }),
    toolbar: css({ display: "flex", alignItems: "center", gap: space[2] }),
  }

  let open = $state(false)
  // Each step's target, as its button reaches the page.
  let search: HTMLElement | null = null
  let share: HTMLElement | null = null
  let settings: HTMLElement | null = null

  const steps: TourStep[] = [
    {
      id: "search",
      target: () => search,
      title: "Search",
      description: "Find any file in the project by its name.",
    },
    {
      id: "share",
      target: () => share,
      title: "Share",
      description: "Invite people to edit with you.",
    },
    {
      id: "settings",
      target: () => settings,
      title: "Settings",
      description: "Change the theme, your shortcuts and your account.",
    },
  ]
</script>

<div sx={page.example}>
  <div sx={styles.stack}>
    <div sx={styles.toolbar}>
      <Button {@attach (element: HTMLElement) => void (search = element)} variant="outline">
        <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" />
        Search
      </Button>
      <Button {@attach (element: HTMLElement) => void (share = element)} variant="outline">Share</Button>
      <Button {@attach (element: HTMLElement) => void (settings = element)} variant="outline" size="icon" aria-label="Settings">
        <IconPlaceholder lucide="SettingsIcon" tabler="IconSettings" hugeicons="SettingsIcon" phosphor="GearIcon" remixicon="RiSettingsLine" />
      </Button>
    </div>
    <Button onclick={() => (open = true)}>Start the tour</Button>
  </div>
  <Tour {steps} bind:open>
    <TourContent />
  </Tour>
</div>
