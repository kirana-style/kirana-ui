"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../../ui/breadcrumb"
import { Button } from "../../../ui/button"
import { Card, CardContent, CardHeader } from "../../../ui/card"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

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
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  iconPlaceholder3: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  iconPlaceholder4: css({
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
            <BreadcrumbItem>
              <DropdownMenuTrigger>
                <Button size="icon-sm" variant="ghost">
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeIcon"
                    remixicon="RiMoreLine"
                  />
                  <span sx={styles.span}>Account options</span>
                </Button>
                <DropdownMenu placement="bottom start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenu>
              </DropdownMenuTrigger>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item variant="muted" href="#">
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
          <Item variant="muted" href="#">
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
          <Item variant="muted" href="#">
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="RepeatIcon"
                tabler="IconRepeat"
                hugeicons="RepeatIcon"
                phosphor="RepeatIcon"
                remixicon="RiRepeatLine"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Direct Debits</ItemTitle>
              <ItemDescription>
                Set up and manage regular payments.
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
          <Item variant="muted" href="#">
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="RefreshCwIcon"
                tabler="IconRefresh"
                hugeicons="RepeatIcon"
                phosphor="ArrowsClockwiseIcon"
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
              {...styleProps(styles.iconPlaceholder4)}
            />
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
