<script setup lang="ts">
import { reactive } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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

const notifications = reactive({
  email: true,
  sms: false,
  push: true,
})
</script>

<template>
  <div :sx="page.example">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Notifications </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :sx="styles.dropdownMenuContent">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem v-model:checked="notifications.email">
            <IconPlaceholder
              lucide="MailIcon"
              tabler="IconMail"
              hugeicons="Mail01Icon"
              phosphor="EnvelopeIcon"
              remixicon="RiMailLine"
            />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem v-model:checked="notifications.sms">
            <IconPlaceholder
              lucide="MessageSquareIcon"
              tabler="IconMessage"
              hugeicons="Message01Icon"
              phosphor="ChatIcon"
              remixicon="RiChat1Line"
            />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem v-model:checked="notifications.push">
            <IconPlaceholder
              lucide="BellIcon"
              tabler="IconBell"
              hugeicons="NotificationIcon"
              phosphor="BellIcon"
              remixicon="RiNotificationLine"
            />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
