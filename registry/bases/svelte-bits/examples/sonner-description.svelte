<script lang="ts">
  import { css } from "@kirana-style/core"
  import { toast } from "svelte-sonner"
  import { Button } from "../ui/button"
  import { page } from "../../../styles/page.styles"

  const styles = {
    fit: css({ width: "fit-content" }),
  }
</script>

<div sx={page.example}>
  <Button onclick={
        () =>
          toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm',
          })
      } variant="outline" sx={styles.fit}>
    Show Toast
  </Button>
</div>
