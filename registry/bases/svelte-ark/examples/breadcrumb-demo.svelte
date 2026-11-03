<script lang="ts">
  import { page } from "../../../styles/page.styles"
  import { visuallyHidden } from "../../../styles/visually-hidden.styles"
  import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "../ui/breadcrumb"
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
</script>

<div sx={page.example}>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink>
          {#snippet asChild(props)}
            <a {...props()} href="#">
              Home
            </a>
          {/snippet}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {#snippet asChild(props)}
              <Button {...props()} size="icon-sm" variant="ghost">
                <BreadcrumbEllipsis />
                <span sx={visuallyHidden}>
                  Toggle menu
                </span>
              </Button>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem>
                Themes
              </DropdownMenuItem>
              <DropdownMenuItem>
                GitHub
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink>
          {#snippet asChild(props)}
            <a {...props()} href="#">
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
