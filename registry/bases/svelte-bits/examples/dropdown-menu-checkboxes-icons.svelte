<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    dropdownMenuContent: css({
      width: { "*": null, base: space[48] },
    }),
  }

  const notifications = $state({
    email: true,
    sms: false,
    push: true,
  })
</script>

<div sx={page.example}>
  <DropdownMenu>
    <DropdownMenuTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Notifications
        </Button>
      {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent sx={styles.dropdownMenuContent}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          Notification Preferences
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={notifications.email} onCheckedChange={(details: { checked: typeof notifications.email }) => (notifications.email = details.checked)}>
          <IconPlaceholder lucide="MailIcon" tabler="IconMail" hugeicons="Mail01Icon" phosphor="EnvelopeIcon" remixicon="RiMailLine" />
          Email notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={notifications.sms} onCheckedChange={(details: { checked: typeof notifications.sms }) => (notifications.sms = details.checked)}>
          <IconPlaceholder lucide="MessageSquareIcon" tabler="IconMessage" hugeicons="Message01Icon" phosphor="ChatIcon" remixicon="RiChat1Line" />
          SMS notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={notifications.push} onCheckedChange={(details: { checked: typeof notifications.push }) => (notifications.push = details.checked)}>
          <IconPlaceholder lucide="BellIcon" tabler="IconBell" hugeicons="NotificationIcon" phosphor="BellIcon" remixicon="RiNotificationLine" />
          Push notifications
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
