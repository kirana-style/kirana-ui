<script lang="ts">
  import { css } from "@kirana-style/core"

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
  }

  let open = $state(false)
  // The steps' target, as its button reaches the page.
  let target: HTMLElement | null = null

  const steps: TourStep[] = (["top", "right", "bottom", "left"] as const).map((side) => ({
    id: side,
    target: () => target,
    side,
    title: `On the ${side}`,
    description: `This step's popup is on the ${side} of its target.`,
  }))
</script>

<div sx={page.example}>
  <div sx={styles.stack}>
    <Button {@attach (element: HTMLElement) => void (target = element)} variant="outline">Target</Button>
    <Button onclick={() => (open = true)}>Show each side</Button>
  </div>
  <Tour {steps} bind:open>
    <TourContent />
  </Tour>
</div>
