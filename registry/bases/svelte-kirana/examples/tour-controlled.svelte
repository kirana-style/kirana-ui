<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Button } from "../ui/button"
  import { Tour, TourContent } from "../ui/tour"
  import type { TourStep } from "../ui/tour"
  import { fontSize, lineHeight, space } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    stack: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: space[6],
    }),
    row: css({ display: "flex", alignItems: "center", gap: space[2] }),
    status: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: theme.mutedForeground,
      fontVariantNumeric: "tabular-nums",
    }),
  }

  let open = $state(false)
  let step = $state(0)
  // Each step's target, as its button reaches the page.
  let draft: HTMLElement | null = null
  let preview: HTMLElement | null = null
  let publish: HTMLElement | null = null

  const steps: TourStep[] = [
    {
      id: "draft",
      target: () => draft,
      title: "Draft",
      description: "Write the post. It saves as you type.",
    },
    {
      id: "preview",
      target: () => preview,
      title: "Preview",
      description: "See the post as readers will.",
    },
    {
      id: "publish",
      target: () => publish,
      title: "Publish",
      description: "Put it live when it is ready.",
    },
  ]
</script>

<div sx={page.example}>
  <div sx={styles.stack}>
    <div sx={styles.row}>
      <Button {@attach (element: HTMLElement) => void (draft = element)} variant="outline">Draft</Button>
      <Button {@attach (element: HTMLElement) => void (preview = element)} variant="outline">Preview</Button>
      <Button {@attach (element: HTMLElement) => void (publish = element)} variant="outline">Publish</Button>
    </div>
    <div sx={styles.row}>
      <Button
        onclick={() => {
          step = 0
          open = true
        }}
      >
        Start
      </Button>
      <Button
        variant="outline"
        onclick={() => {
          step = 2
          open = true
        }}
      >
        Go to the last step
      </Button>
    </div>
    <p sx={styles.status} aria-live="polite">
      {open ? `Showing step ${step + 1} of 3` : "Not started"}
    </p>
  </div>
  <Tour {steps} bind:open bind:step>
    <TourContent />
  </Tour>
</div>
