<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "../ui/breadcrumb"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink>
          {#snippet asChild(props)}
            <a {...props()} href="/">
              Home
            </a>
          {/snippet}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <IconPlaceholder lucide="DotIcon" tabler="IconPoint" hugeicons="DotIcon" phosphor="DotIcon" remixicon="RiCheckboxBlankCircleFill" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink>
          {#snippet asChild(props)}
            <a {...props()} href="/components">
              Components
            </a>
          {/snippet}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <IconPlaceholder lucide="DotIcon" tabler="IconPoint" hugeicons="DotIcon" phosphor="DotIcon" remixicon="RiCheckboxBlankCircleFill" />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>
          Breadcrumb
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</div>
