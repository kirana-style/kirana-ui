<script setup lang="ts">
import IconPlaceholder from "@workspace/registry/icons/IconPlaceholder.vue"
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
} from "@workspace/registry/bases/vue-ark/ui/alert-dialog"
import { Badge } from "@workspace/registry/bases/vue-ark/ui/badge"
import { Button } from "@workspace/registry/bases/vue-ark/ui/button"
import { ButtonGroup } from "@workspace/registry/bases/vue-ark/ui/button-group"
import { Card, CardContent } from "@workspace/registry/bases/vue-ark/ui/card"
import { Checkbox } from "@workspace/registry/bases/vue-ark/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/vue-ark/ui/dropdown-menu"
import { Field, FieldGroup } from "@workspace/registry/bases/vue-ark/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/registry/bases/vue-ark/ui/input-group"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/registry/bases/vue-ark/ui/radio-group"
import { Switch } from "@workspace/registry/bases/vue-ark/ui/switch"
import { Textarea } from "@workspace/registry/bases/vue-ark/ui/textarea"
import { axes } from "@workspace/registry/core/axes"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "@workspace/registry/core/scales"

const WIDE = "@media (width >= 2000px)"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[6] },
  }),
  // Upstream's home draws one design, whose row fits; here a reader's design can be wider (Sera's
  // capitals), so the buttons and badges wrap rather than leave the card.
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  field: css({
    flex: "1 1 0%",
  }),
  textarea: css({
    resize: { "*": null, base: "none" },
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  badge: css({
    display: { "*": null, base: "none", [WIDE]: "flex" },
  }),
  radioGroup: css({
    marginLeft: { "*": null, base: "auto" },
    display: { "*": null, base: "flex" },
    width: { "*": null, base: "fit-content" },
    gap: { "*": null, base: space[3] },
  }),
  div4: css({
    display: "flex",
    gap: space[3],
  }),
  checkbox: css({
    display: { "*": null, base: "none", [WIDE]: "flex" },
  }),
  switch: css({
    display: { "*": null, base: "flex", [WIDE]: "none" },
  }),
  div5: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  span: css({
    display: {
      base: "none",
      [breakpoint.md]: "flex",
      [axes.style.sera]: { [breakpoint.md]: "none" },
    },
  }),
  span2: css({
    display: {
      base: "flex",
      [breakpoint.md]: "none",
      [axes.style.sera]: { [breakpoint.md]: "flex" },
    },
  }),
  buttonGroup: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  span3: css({
    display: { [axes.style.sera]: "none" },
  }),
  span4: css({
    display: { base: "none", [axes.style.sera]: "block" },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[40] },
  }),
  switch2: css({
    display: { "*": null, base: "none", [WIDE]: "flex" },
  }),
}
</script>

<template>
  <Card :sx="styles.card">
    <CardContent :sx="styles.cardContent">
      <div :sx="styles.div">
        <Button>
          Button{{ " " }}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="secondary"> Secondary </Button>
        <Button variant="outline"> Outline </Button>
      </div>
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
        <Field :sx="styles.field">
          <Textarea placeholder="Message" :sx="styles.textarea" />
        </Field>
      </FieldGroup>
      <div :sx="styles.div2">
        <div :sx="styles.div3">
          <Badge> Badge </Badge>
          <Badge variant="secondary"> Secondary </Badge>
          <Badge variant="outline" :sx="styles.badge"> Outline </Badge>
        </div>
        <RadioGroup
          default-value="apple"
          :sx="styles.radioGroup"
          aria-label="Fruit preference"
        >
          <RadioGroupItem value="apple" aria-label="Apple" />
          <RadioGroupItem value="banana" aria-label="Banana" />
        </RadioGroup>
        <div :sx="styles.div4">
          <Checkbox default-checked aria-label="Enable email alerts" />
          <Checkbox :sx="styles.checkbox" aria-label="Enable push alerts" />
        </div>
        <Switch
          default-checked
          :sx="styles.switch"
          aria-label="Enable compact notifications"
        />
      </div>
      <div :sx="styles.div5">
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="outline">
              <span :sx="styles.span"> Alert Dialog </span>
              <span :sx="styles.span2"> Dialog </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle> Allow accessory to connect? </AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to allow the USB accessory to connect to this device
                and your data?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel> Don&apos;t allow </AlertDialogCancel>
              <AlertDialogAction> Allow </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ButtonGroup :sx="styles.buttonGroup">
          <Button variant="outline">
            <span :sx="styles.span3"> Button Group </span>
            <span :sx="styles.span4"> Group </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open quick actions"
              >
                <IconPlaceholder
                  lucide="ChevronUpIcon"
                  tabler="IconChevronUp"
                  hugeicons="ArrowUp01Icon"
                  phosphor="CaretUpIcon"
                  remixicon="RiArrowUpSLine"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              :sx="styles.dropdownMenuContent"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel> Quick Actions </DropdownMenuLabel>
                <DropdownMenuItem> Mute Conversation </DropdownMenuItem>
                <DropdownMenuItem> Mark as Read </DropdownMenuItem>
                <DropdownMenuItem> Block User </DropdownMenuItem>
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
        <Switch
          default-checked
          :sx="styles.switch2"
          aria-label="Enable advanced setting"
        />
      </div>
    </CardContent>
  </Card>
</template>
