<script lang="ts">
  import { css } from "@kirana-style/core"
  import { toast } from "svelte-sonner"
  import { Button } from "../ui/button"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    flexFlexWrapJustifyCente: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: { "*": null, base: space[2] },
    }),
  }
</script>

<div sx={page.example}>
  <div sx={styles.flexFlexWrapJustifyCente}>
    <Button variant="outline" onclick={() => toast('Event has been created', { position: 'top-left' })}>
      Top Left
    </Button>
    <Button variant="outline" onclick={
          () => toast('Event has been created', { position: 'top-center' })
        }>
      Top Center
    </Button>
    <Button variant="outline" onclick={
          () => toast('Event has been created', { position: 'top-right' })
        }>
      Top Right
    </Button>
    <Button variant="outline" onclick={
          () => toast('Event has been created', { position: 'bottom-left' })
        }>
      Bottom Left
    </Button>
    <Button variant="outline" onclick={
          () => toast('Event has been created', { position: 'bottom-center' })
        }>
      Bottom Center
    </Button>
    <Button variant="outline" onclick={
          () => toast('Event has been created', { position: 'bottom-right' })
        }>
      Bottom Right
    </Button>
  </div>
</div>
