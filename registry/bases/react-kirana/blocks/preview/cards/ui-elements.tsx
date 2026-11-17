"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import { ButtonGroup } from "../../../ui/button-group"
import { Card, CardContent } from "../../../ui/card"
import { Checkbox } from "../../../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Field, FieldGroup } from "../../../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../../ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../../ui/item"
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group"
import { Slider } from "../../../ui/slider"
import { Switch } from "../../../ui/switch"
import { Textarea } from "../../../ui/textarea"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { breakpoint, space } from "../../../../../core/scales"

const styles = {
  uIElementsCard: css({
    width: { "*": null, base: "100%" },
  }),
  uIElementsCardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[6] },
  }),
  uIElementsDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  uIElementsDiv2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  uIElementsItemDescription: css({
    textWrap: { "*": null, base: "pretty" },
    display: {
      [breakpoint.xl]: "none",
      [breakpoint["2xl"]]: "block",
    },
  }),
  uIElementsItemActions: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
  }),
  uIElementsSlider: css({
    flex: "1 1 0%",
  }),
  uIElementsField: css({
    flex: "1 1 0%",
  }),
  uIElementsTextarea: css({
    resize: { "*": null, base: "none" },
  }),
  uIElementsDiv3: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  uIElementsDiv4: css({
    display: "flex",
    gap: space[2],
  }),
  uIElementsRadioGroup: css({
    marginLeft: { "*": null, base: "auto" },
    display: { "*": null, base: "flex" },
    width: { "*": null, base: "fit-content" },
    gap: { "*": null, base: space[3] },
  }),
  uIElementsDiv5: css({
    display: "flex",
    gap: space[3],
  }),
  uIElementsDiv6: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  uIElementsSpan: css({
    display: {
      base: "none",
      [breakpoint.md]: "flex",
      [axes.style.sera]: { [breakpoint.md]: "none" },
    },
  }),
  uIElementsSpan2: css({
    display: {
      base: "flex",
      [breakpoint.md]: "none",
      [axes.style.sera]: { [breakpoint.md]: "flex" },
    },
  }),
  uIElementsSpan3: css({
    display: { [axes.style.sera]: "none" },
  }),
  uIElementsSpan4: css({
    display: { base: "none", [axes.style.sera]: "block" },
  }),
  uIElementsDropdownMenuContent: css({
    width: { "*": null, base: "fit-content" },
  }),
  uIElementsSwitch: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

export function UIElements() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const handleSliderValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setSliderValue([value])
      } else {
        setSliderValue([...value])
      }
    },
    []
  )

  return (
    <Card sx={styles.uIElementsCard}>
      <CardContent sx={styles.uIElementsCardContent}>
        <div sx={styles.uIElementsDiv}>
          <div sx={styles.uIElementsDiv2}>
            <Button>Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Two-factor authentication</ItemTitle>
              <ItemDescription sx={styles.uIElementsItemDescription}>
                Verify via email or phone number.
              </ItemDescription>
            </ItemContent>
            <ItemActions sx={styles.uIElementsItemActions}>
              <Button size="sm" variant="secondary">
                Enable
              </Button>
            </ItemActions>
          </Item>
        </div>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          max={1000}
          min={0}
          step={10}
          sx={styles.uIElementsSlider}
          aria-label="Slider"
        />
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <IconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field sx={styles.uIElementsField}>
            <Textarea placeholder="Message" sx={styles.uIElementsTextarea} />
          </Field>
        </FieldGroup>
        <div sx={styles.uIElementsDiv3}>
          <div sx={styles.uIElementsDiv4}>
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RadioGroup defaultValue="apple" sx={styles.uIElementsRadioGroup}>
            <RadioGroupItem value="apple" />
            <RadioGroupItem value="banana" />
          </RadioGroup>
          <div sx={styles.uIElementsDiv5}>
            <Checkbox defaultChecked />
            <Checkbox />
          </div>
        </div>
        <div sx={styles.uIElementsDiv6}>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              <span sx={styles.uIElementsSpan}>Alert Dialog</span>
              <span sx={styles.uIElementsSpan2}>Dialog</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device and your data?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ButtonGroup>
            <Button variant="outline">
              <span sx={styles.uIElementsSpan3}>Button Group</span>
              <span sx={styles.uIElementsSpan4}>Group</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="icon" />}
              >
                <IconPlaceholder
                  lucide="ChevronUpIcon"
                  tabler="IconChevronUp"
                  hugeicons="ArrowUp01Icon"
                  phosphor="CaretUpIcon"
                  remixicon="RiArrowUpSLine"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="top"
                sx={styles.uIElementsDropdownMenuContent}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                  <DropdownMenuItem>Share Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Copy Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Report Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <Switch defaultChecked sx={styles.uIElementsSwitch} />
        </div>
      </CardContent>
    </Card>
  )
}
