import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "react-aria-components"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css, props as styleProps } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
  }),
  iconPlaceholder: css({
    width: space["3.5"],
    height: space["3.5"],
  }),
}

export default function BreadcrumbDropdown() {
  return (
    <div sx={page.example}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              render={(props) =>
                "href" in props ? <a {...props} /> : <span {...props} />
              }
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <DropdownMenuTrigger>
              <Button {...styleProps(styles.button)}>
                Components
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  data-icon="inline-end"
                  {...styleProps(styles.iconPlaceholder)}
                />
              </Button>
              <DropdownMenu placement="bottom start">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Themes</DropdownMenuItem>
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
