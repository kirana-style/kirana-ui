import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function BreadcrumbDropdown() {
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

  return (
    <div sx={page.example}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild={(props) => (
                <a {...props()} href="/">
                  Home
                </a>
              )}
            />
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
              <DropdownMenuTrigger
                asChild={(props) => (
                  <button
                    {...props()}
                    {...styleProps(props().class, styles.button)}
                  >
                    Components{" "}
                    <IconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDown01Icon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      data-icon="inline-end"
                      {...styleProps(styles.iconPlaceholder)}
                    />
                  </button>
                )}
              />
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
  )
}
