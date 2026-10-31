import { IconPlaceholder } from "@workspace/registry/icons/icon-placeholder"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/registry/bases/react-base/ui/breadcrumb"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/registry/bases/react-base/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/react-base/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/registry/bases/react-base/ui/item"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import { space } from "@workspace/registry/core/scales"

const styles = {
  cardHeader: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
  span: css({
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
  div: css({
    width: "100%",
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  div2: css({
    width: "100%",
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  div3: css({
    width: "100%",
  }),
  iconPlaceholder3: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
}

export function Payments() {
  return (
    <Card>
      <CardHeader sx={styles.cardHeader}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Account options"
                    />
                  }
                >
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  />
                  <span sx={styles.span}>Account options</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <div role="listitem" sx={styles.div}>
            <Item variant="muted" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <IconPlaceholder
                  lucide="GaugeIcon"
                  tabler="IconGauge"
                  hugeicons="Settings01Icon"
                  phosphor="GaugeIcon"
                  remixicon="RiDashboardLine"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Change transfer limit</ItemTitle>
                <ItemDescription>
                  Adjust how much you can send from your balance.
                </ItemDescription>
              </ItemContent>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder)}
              />
            </Item>
          </div>
          <div role="listitem" sx={styles.div2}>
            <Item variant="muted" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="Calendar03Icon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Scheduled transfers</ItemTitle>
                <ItemDescription>
                  Set up a transfer to send at a later date.
                </ItemDescription>
              </ItemContent>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder2)}
              />
            </Item>
          </div>
          <div role="listitem" sx={styles.div3}>
            <Item variant="muted" render={<a href="#" />}>
              <ItemMedia variant="icon">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RefreshIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Recurring card payments</ItemTitle>
                <ItemDescription>
                  Manage your repeated card transactions.
                </ItemDescription>
              </ItemContent>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder3)}
              />
            </Item>
          </div>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
