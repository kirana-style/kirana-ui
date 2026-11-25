<script setup lang="ts">
import { elementOf } from "@kirana-ui/vue/runtime"
import { css } from "@kirana-style/core"
import { ref, useTemplateRef } from "vue"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
  toolbar: css({ display: "flex", alignItems: "center", gap: space[2] }),
}

const open = ref(false)
const search = useTemplateRef("search")
const share = useTemplateRef("share")
const settings = useTemplateRef("settings")

const steps: TourStep[] = [
  {
    id: "search",
    target: () => elementOf(search.value),
    title: "Search",
    description: "Find any file in the project by its name.",
  },
  {
    id: "share",
    target: () => elementOf(share.value),
    title: "Share",
    description: "Invite people to edit with you.",
  },
  {
    id: "settings",
    target: () => elementOf(settings.value),
    title: "Settings",
    description: "Change the theme, your shortcuts and your account.",
  },
]
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.stack">
      <div :sx="styles.toolbar">
        <Button ref="search" variant="outline">
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
          Search
        </Button>
        <Button ref="share" variant="outline">Share</Button>
        <Button
          ref="settings"
          variant="outline"
          size="icon"
          aria-label="Settings"
        >
          <IconPlaceholder
            lucide="SettingsIcon"
            tabler="IconSettings"
            hugeicons="SettingsIcon"
            phosphor="GearIcon"
            remixicon="RiSettingsLine"
          />
        </Button>
      </div>
      <Button @click="open = true">Start the tour</Button>
    </div>
    <Tour v-model:open="open" :steps="steps">
      <TourContent />
    </Tour>
  </div>
</template>
