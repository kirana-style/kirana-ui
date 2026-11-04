<script lang="ts">
  import { Button } from "../ui/button"
  import { toast } from "../ui/toast"
  import { page } from "../../../styles/page.styles"

  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        },
      },
    })
  }
</script>

<div sx={page.example}>
  <Button variant="outline" onclick={showToast}>
    Show Toast
  </Button>
</div>
