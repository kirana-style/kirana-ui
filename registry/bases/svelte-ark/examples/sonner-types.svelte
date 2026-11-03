<script lang="ts">
  import { css } from "@kirana-style/core"
  import { toast } from "svelte-sonner"
  import { Button } from "../ui/button"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    flexFlexWrapGap2: css({
      display: "flex",
      flexWrap: "wrap",
      gap: { "*": null, base: space[2] },
    }),
  }

  const showPromise = () =>
    toast.promise<{ name: string }>(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Event" }), 2000)
        ),
      {
        loading: "Loading...",
        success: (data: { name: string }) => `${data.name} has been created`,
        error: "Error",
      }
    )
</script>

<div sx={page.example}>
  <div sx={styles.flexFlexWrapGap2}>
    <Button variant="outline" onclick={() => toast('Event has been created')}>
      Default
    </Button>
    <Button variant="outline" onclick={() => toast.success('Event has been created')}>
      Success
    </Button>
    <Button variant="outline" onclick={
          () => toast.info('Be at the area 10 minutes before the event time')
        }>
      Info
    </Button>
    <Button variant="outline" onclick={
          () => toast.warning('Event start time cannot be earlier than 8am')
        }>
      Warning
    </Button>
    <Button variant="outline" onclick={() => toast.error('Event has not been created')}>
      Error
    </Button>
    <Button variant="outline" onclick={showPromise}>
      Promise
    </Button>
  </div>
</div>
