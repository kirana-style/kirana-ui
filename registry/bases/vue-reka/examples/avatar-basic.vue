<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  avatarDemoAvatarImage: css({
    filter: "grayscale(100%)",
  }),
}
</script>

<template>
  <div :sx="page.example">
    <Avatar>
      <AvatarImage
        :src="'/avatars/kirana.png'"
        alt="@kirana"
        :sx="styles.avatarDemoAvatarImage"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>
