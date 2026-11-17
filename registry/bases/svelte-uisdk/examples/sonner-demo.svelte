<script lang="ts">
  import { toast } from "svelte-sonner"
  import { Button } from "../ui/button"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Button variant="outline" onclick={
        () =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
      }>
    Show Toast
  </Button>
</div>
