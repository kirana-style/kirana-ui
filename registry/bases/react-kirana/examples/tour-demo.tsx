"use client"

import * as React from "react"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

export default function TourDemo() {
  const [open, setOpen] = React.useState(false)
  const search = React.useRef<HTMLButtonElement>(null)
  const share = React.useRef<HTMLButtonElement>(null)
  const settings = React.useRef<HTMLButtonElement>(null)

  const steps: TourStep[] = [
    {
      id: "search",
      target: () => search.current,
      title: "Search",
      description: "Find any file in the project by its name.",
    },
    {
      id: "share",
      target: () => share.current,
      title: "Share",
      description: "Invite people to edit with you.",
    },
    {
      id: "settings",
      target: () => settings.current,
      title: "Settings",
      description: "Change the theme, your shortcuts and your account.",
    },
  ]

  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <div sx={styles.toolbar}>
          <Button ref={search} variant="outline">
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
            Search
          </Button>
          <Button ref={share} variant="outline">
            Share
          </Button>
          <Button
            ref={settings}
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
        <Button onClick={() => setOpen(true)}>Start the tour</Button>
      </div>
      <Tour steps={steps} open={open} onOpenChange={setOpen}>
        <TourContent />
      </Tour>
    </div>
  )
}
