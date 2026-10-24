/**
 * The icons components name through `IconPlaceholder`, as each library's framework-neutral data, so
 * one map serves every framework's placeholder. A component names an icon once for every library
 * (`lucide="ChevronDownIcon" hugeicons="ArrowDown01Icon" …`, shadcn/ui's convention); the site draws
 * the library the design system chose, and the installer resolves the placeholder in a project.
 *
 * Only Lucide and Hugeicons have data here yet, and only the icons the registry's components use:
 * the builder will generate this map from every placeholder in the sources. Until Tabler, Phosphor
 * and Remix Icon have theirs, a design that chooses one of them draws Lucide's icon.
 */
import {
  ActivityIcon,
  AddCircleIcon,
  Archive02Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  BankIcon,
  Cancel01Icon,
  Chart03Icon,
  CheckmarkBadgeIcon,
  CircleArrowLeft02Icon,
  ClipboardIcon,
  CopyIcon,
  CreditCardIcon,
  DeleteIcon,
  EditIcon,
  HelpCircleIcon,
  LayoutIcon,
  LayoutLeftIcon,
  LogoutIcon,
  MailIcon,
  MessageIcon,
  NotificationIcon,
  ScissorIcon,
  SettingsIcon,
  ShareIcon,
  Tick02Icon,
  UnfoldMoreIcon,
  UserGroupIcon,
  UserIcon,
  WalletIcon,
} from "@hugeicons/core-free-icons"
import {
  Activity,
  Archive,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Bell,
  Building2,
  ChartBar,
  ChartLine,
  ChartPie,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  CircleArrowLeft,
  ClipboardPaste,
  Copy,
  CreditCard,
  HelpCircle,
  Layout,
  LogOut,
  Mail,
  MessageSquare,
  PanelLeft,
  Pencil,
  PlusCircle,
  Scissors,
  Settings,
  Share,
  Trash,
  User,
  Users,
  Wallet,
  X,
} from "lucide"

import type { IconLibrary } from "../core/config"

/** An icon's shapes: each an SVG element's name and attributes. */
export type IconNode = readonly (readonly [
  tag: string,
  attributes: Readonly<Record<string, string | number | undefined>>,
])[]

/** What a placeholder draws: the `<svg>`'s attributes and its shapes, attribute names as in SVG. */
export type ResolvedIcon = {
  svg: Readonly<Record<string, string | number>>
  nodes: readonly (readonly [
    tag: string,
    attributes: Readonly<Record<string, string | number>>,
  ])[]
}

/** The name a placeholder gives each library. */
export type IconNames = Readonly<Record<IconLibrary, string>>

type Library = {
  svg: Readonly<Record<string, string | number>>
  /** Attributes every shape takes, over its own. */
  shape?: Readonly<Record<string, string | number>>
  icons: Readonly<Record<string, IconNode>>
}

const LIBRARIES: Partial<Record<IconLibrary, Library>> = {
  lucide: {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    },
    icons: {
      // Upstream's name, from Lucide's older one for `CircleArrowLeft`.
      ArrowLeftCircleIcon: CircleArrowLeft,
      ActivityIcon: Activity,
      ArchiveIcon: Archive,
      ArrowDownIcon: ArrowDown,
      ArrowRightIcon: ArrowRight,
      ArrowUpIcon: ArrowUp,
      BadgeCheckIcon: BadgeCheck,
      BellIcon: Bell,
      Building2Icon: Building2,
      ChartBarIcon: ChartBar,
      ChartLineIcon: ChartLine,
      ChartPieIcon: ChartPie,
      CheckIcon: Check,
      ChevronDownIcon: ChevronDown,
      ChevronRightIcon: ChevronRight,
      ChevronsUpDownIcon: ChevronsUpDown,
      ChevronUpIcon: ChevronUp,
      ClipboardPasteIcon: ClipboardPaste,
      CopyIcon: Copy,
      CreditCardIcon: CreditCard,
      HelpCircleIcon: HelpCircle,
      LayoutIcon: Layout,
      LogOutIcon: LogOut,
      MailIcon: Mail,
      MessageSquareIcon: MessageSquare,
      PanelLeftIcon: PanelLeft,
      PencilIcon: Pencil,
      PlusCircleIcon: PlusCircle,
      ScissorsIcon: Scissors,
      SettingsIcon: Settings,
      ShareIcon: Share,
      TrashIcon: Trash,
      UserIcon: User,
      UsersIcon: Users,
      WalletIcon: Wallet,
      XIcon: X,
    },
  },
  hugeicons: {
    svg: { viewBox: "0 0 24 24", fill: "none" },
    // Drawn at 2, not the data's 1.5: shadcn/ui's icons are drawn at Lucide's stroke.
    shape: { "stroke-width": 2 },
    icons: {
      ActivityIcon,
      AddCircleIcon,
      Archive02Icon,
      ArrowDown01Icon,
      ArrowRight01Icon,
      ArrowRight02Icon,
      ArrowUp01Icon,
      BankIcon,
      Cancel01Icon,
      Chart03Icon,
      CheckmarkBadgeIcon,
      CircleArrowLeft02Icon,
      ClipboardIcon,
      CopyIcon,
      CreditCardIcon,
      DeleteIcon,
      EditIcon,
      HelpCircleIcon,
      LayoutIcon,
      LayoutLeftIcon,
      LogoutIcon,
      MailIcon,
      MessageIcon,
      NotificationIcon,
      ScissorIcon,
      SettingsIcon,
      ShareIcon,
      Tick02Icon,
      UnfoldMoreIcon,
      UserGroupIcon,
      UserIcon,
      WalletIcon,
    },
  },
}

/** `strokeLinecap` → `stroke-linecap`: Hugeicons writes React's names. */
const svgName = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

/**
 * The icon to draw for `library`, by the name the placeholder gives it; `null` when the placeholder
 * names none or the data lacks it, which the builder will report before it ships.
 */
export function resolveIcon(
  library: IconLibrary,
  names: Partial<IconNames>
): ResolvedIcon | null {
  const drawn = LIBRARIES[library] ? library : "lucide"
  const data = LIBRARIES[drawn]
  const name = names[drawn]
  const nodes = data && name ? data.icons[name] : undefined
  if (!data || !nodes) return null
  return {
    svg: data.svg,
    nodes: nodes.map(([tag, attributes]) => {
      const shape: Record<string, string | number> = {}
      for (const [key, value] of Object.entries(attributes)) {
        if (key !== "key" && value !== undefined) shape[svgName(key)] = value
      }
      return [tag, { ...shape, ...data.shape }] as const
    }),
  }
}
