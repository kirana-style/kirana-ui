<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[1] },
  }),
  iconPlaceholder: css({
    width: space["3.5"],
    height: space["3.5"],
  }),
}
</script>

<template>
  <div :sx="page.example">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <a href="/"> Home </a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconPlaceholder
            lucide="DotIcon"
            tabler="IconPoint"
            hugeicons="DotIcon"
            phosphor="DotIcon"
            remixicon="RiCheckboxBlankCircleFill"
          />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <button :sx="styles.button">
                Components
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  data-icon="inline-end"
                  :sx="styles.iconPlaceholder"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconPlaceholder
            lucide="DotIcon"
            tabler="IconPoint"
            hugeicons="DotIcon"
            phosphor="DotIcon"
            remixicon="RiCheckboxBlankCircleFill"
          />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>
