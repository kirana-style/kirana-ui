<script lang="ts">
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
            <a {...props()} href="#link-component">
              Home
            </a>
          {/snippet}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink>
          {#snippet asChild(props)}
            <a {...props()} href="#link-component">
              Components
            </a>
          {/snippet}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>
          Breadcrumb
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</div>
