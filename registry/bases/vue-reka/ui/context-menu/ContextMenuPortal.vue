<script setup lang="ts">
// Upstream's portal around the content. The content here teleports itself to `<body>`, so this only
// passes its children through, for markup written for both.
</script>

<template>
  <slot />
</template>
