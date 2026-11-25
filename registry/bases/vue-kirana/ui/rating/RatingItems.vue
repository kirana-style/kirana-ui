<script setup lang="ts">
import { Rating } from "@kirana-ui/vue/rating"
</script>

<template>
  <!-- The stars, one from 1 to `count`: draws its slot once for each place. -->
  <Rating.Items v-slot="{ place }">
    <slot :place="place" />
  </Rating.Items>
</template>
