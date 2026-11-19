import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
import { buttonVariants, Button } from "../ui/button"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"

const styles = {
  row: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  examples: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[4],
  }),
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
}

@Component({
  selector: "button-example",
  imports: [Button, Example, ExampleWrapper, IconPlaceholder, SxDirective],
  template: `
    <div kuiExampleWrapper [sx]="example.oneColumn">
      <!-- ButtonVariantsAndSizes -->
      <div kuiExample title="Variants & Sizes">
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="xs">Default</button>
          <button kuiButton size="xs" variant="secondary">Secondary</button>
          <button kuiButton size="xs" variant="outline">Outline</button>
          <button kuiButton size="xs" variant="ghost">Ghost</button>
          <button kuiButton size="xs" variant="destructive">Destructive</button>
          <button kuiButton size="xs" variant="link">Link</button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="sm">Default</button>
          <button kuiButton size="sm" variant="secondary">Secondary</button>
          <button kuiButton size="sm" variant="outline">Outline</button>
          <button kuiButton size="sm" variant="ghost">Ghost</button>
          <button kuiButton size="sm" variant="destructive">Destructive</button>
          <button kuiButton size="sm" variant="link">Link</button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton>Default</button>
          <button kuiButton variant="secondary">Secondary</button>
          <button kuiButton variant="outline">Outline</button>
          <button kuiButton variant="ghost">Ghost</button>
          <button kuiButton variant="destructive">Destructive</button>
          <button kuiButton variant="link">Link</button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="lg">Default</button>
          <button kuiButton size="lg" variant="secondary">Secondary</button>
          <button kuiButton size="lg" variant="outline">Outline</button>
          <button kuiButton size="lg" variant="ghost">Ghost</button>
          <button kuiButton size="lg" variant="destructive">Destructive</button>
          <button kuiButton size="lg" variant="link">Link</button>
        </div>
      </div>
      <!-- ButtonIconRight -->
      <div kuiExample title="Icon Right">
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="xs">
            Default
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="xs" variant="secondary">
            Secondary
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="xs" variant="outline">
            Outline
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="xs" variant="ghost">
            Ghost
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="xs" variant="destructive">
            Destructive
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="xs" variant="link">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="sm">
            Default
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="sm" variant="secondary">
            Secondary
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="sm" variant="outline">
            Outline
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="sm" variant="ghost">
            Ghost
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="sm" variant="destructive">
            Destructive
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="sm" variant="link">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton>
            Default
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="secondary">
            Secondary
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="outline">
            Outline
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="ghost">
            Ghost
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="destructive">
            Destructive
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="link">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="lg">
            Default
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="lg" variant="secondary">
            Secondary
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="lg" variant="outline">
            Outline
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="lg" variant="ghost">
            Ghost
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="lg" variant="destructive">
            Destructive
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton size="lg" variant="link">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ButtonIconLeft -->
      <div kuiExample title="Icon Left">
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="xs">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Default
          </button>
          <button kuiButton size="xs" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Secondary
          </button>
          <button kuiButton size="xs" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Outline
          </button>
          <button kuiButton size="xs" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Ghost
          </button>
          <button kuiButton size="xs" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Destructive
          </button>
          <button kuiButton size="xs" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Link
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="sm">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Default
          </button>
          <button kuiButton size="sm" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Secondary
          </button>
          <button kuiButton size="sm" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Outline
          </button>
          <button kuiButton size="sm" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Ghost
          </button>
          <button kuiButton size="sm" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Destructive
          </button>
          <button kuiButton size="sm" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Link
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton>
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Default
          </button>
          <button kuiButton variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Secondary
          </button>
          <button kuiButton variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Outline
          </button>
          <button kuiButton variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Ghost
          </button>
          <button kuiButton variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Destructive
          </button>
          <button kuiButton variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Link
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="lg">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Default
          </button>
          <button kuiButton size="lg" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Secondary
          </button>
          <button kuiButton size="lg" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Outline
          </button>
          <button kuiButton size="lg" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Ghost
          </button>
          <button kuiButton size="lg" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Destructive
          </button>
          <button kuiButton size="lg" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowLeftCircleIcon"
              hugeicons="CircleArrowLeft02Icon"
              tabler="IconCircleArrowLeft"
              phosphor="ArrowCircleLeftIcon"
              remixicon="RiArrowLeftCircleLine"
              data-icon="inline-start"
            ></svg>
            Link
          </button>
        </div>
      </div>
      <!-- ButtonIconOnly -->
      <div kuiExample title="Icon Only">
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="icon-xs">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-xs" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-xs" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-xs" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-xs" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-xs" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="icon-sm">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-sm" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-sm" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-sm" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-sm" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-sm" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="icon">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="icon-lg">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-lg" variant="secondary">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-lg" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-lg" variant="ghost">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-lg" variant="destructive">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
          <button kuiButton size="icon-lg" variant="link">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ButtonInvalidStates -->
      <div kuiExample title="Invalid States">
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="xs" aria-invalid="true">Default</button>
          <button kuiButton size="xs" variant="secondary" aria-invalid="true">
            Secondary
          </button>
          <button kuiButton size="xs" variant="outline" aria-invalid="true">
            Outline
          </button>
          <button kuiButton size="xs" variant="ghost" aria-invalid="true">
            Ghost
          </button>
          <button kuiButton size="xs" variant="destructive" aria-invalid="true">
            Destructive
          </button>
          <button kuiButton size="xs" variant="link" aria-invalid="true">
            Link
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="sm" aria-invalid="true">Default</button>
          <button kuiButton size="sm" variant="secondary" aria-invalid="true">
            Secondary
          </button>
          <button kuiButton size="sm" variant="outline" aria-invalid="true">
            Outline
          </button>
          <button kuiButton size="sm" variant="ghost" aria-invalid="true">
            Ghost
          </button>
          <button kuiButton size="sm" variant="destructive" aria-invalid="true">
            Destructive
          </button>
          <button kuiButton size="sm" variant="link" aria-invalid="true">
            Link
          </button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton aria-invalid="true">Default</button>
          <button kuiButton variant="secondary" aria-invalid="true">
            Secondary
          </button>
          <button kuiButton variant="outline" aria-invalid="true">
            Outline
          </button>
          <button kuiButton variant="ghost" aria-invalid="true">Ghost</button>
          <button kuiButton variant="destructive" aria-invalid="true">
            Destructive
          </button>
          <button kuiButton variant="link" aria-invalid="true">Link</button>
        </div>
        <div [sx]="[styles.row, example.row]">
          <button kuiButton size="lg" aria-invalid="true">Default</button>
          <button kuiButton size="lg" variant="secondary" aria-invalid="true">
            Secondary
          </button>
          <button kuiButton size="lg" variant="outline" aria-invalid="true">
            Outline
          </button>
          <button kuiButton size="lg" variant="ghost" aria-invalid="true">
            Ghost
          </button>
          <button kuiButton size="lg" variant="destructive" aria-invalid="true">
            Destructive
          </button>
          <button kuiButton size="lg" variant="link" aria-invalid="true">
            Link
          </button>
        </div>
      </div>
      <!-- ButtonExamples -->
      <div kuiExample title="Examples">
        <div [sx]="[styles.examples, example.row]">
          <div [sx]="styles.pair">
            <button kuiButton variant="outline">Cancel</button>
            <button kuiButton>
              Submit
              <svg
                iconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight02Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
                data-icon="inline-end"
              ></svg>
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton variant="destructive">Delete</button>
            <button kuiButton size="icon">
              <svg
                iconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight02Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
                data-icon="inline-end"
              ></svg>
            </button>
          </div>
          <a href="#" [sx]="buttonVariants({})">Link</a>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonExample {
  protected readonly styles = styles
  protected readonly example = example
  protected readonly buttonVariants = buttonVariants
}
