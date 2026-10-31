import { Example, ExampleWrapper } from "../components/example"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"

const styles = {
  breadcrumbBasicExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  breadcrumbWithDropdownExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  breadcrumbWithDropdownSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  breadcrumbWithLinkExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
}

export default function BreadcrumbExample() {
  return (
    <ExampleWrapper>
      <BreadcrumbBasic />
      <BreadcrumbWithDropdown />
      <BreadcrumbWithLink />
    </ExampleWrapper>
  )
}

function BreadcrumbBasic() {
  return (
    <Example title="Basic" sx={styles.breadcrumbBasicExample}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Example>
  )
}

function BreadcrumbWithDropdown() {
  return (
    <Example title="With Dropdown" sx={styles.breadcrumbWithDropdownExample}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <DropdownMenuTrigger>
              <Button size="icon-sm" variant="ghost">
                <BreadcrumbEllipsis />
                <span sx={styles.breadcrumbWithDropdownSpan}>Toggle menu</span>
              </Button>
              <DropdownMenu placement="bottom start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Example>
  )
}

function BreadcrumbWithLink() {
  return (
    <Example title="With Link" sx={styles.breadcrumbWithLinkExample}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              render={(props) =>
                "href" in props ? <a {...props} /> : <span {...props} />
              }
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              render={(props) =>
                "href" in props ? <a {...props} /> : <span {...props} />
              }
            >
              Components
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Example>
  )
}
