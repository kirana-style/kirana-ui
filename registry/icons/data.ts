/**
 * The icons components name through `IconPlaceholder`, as each library's framework-neutral data, so
 * one map serves every framework's placeholder. A component names an icon once for every library
 * (`lucide="ChevronDownIcon" hugeicons="ArrowDown01Icon" …`, shadcn/ui's convention); the site draws
 * the library the design system chose, and the installer resolves the placeholder in a project.
 *
 * Lucide is here, from its package, for the icons the registry's components use: it is the default
 * design's library, so every page draws it at once. The others are a file each, loaded the first
 * time a design draws that library: Hugeicons from its package (`hugeicons.ts`, listed by hand as
 * Lucide is), Tabler, Phosphor and Remix Icon as `scripts/icon-data.ts` writes them from every
 * placeholder in the sources (`tabler.ts`, `phosphor.ts`, `remixicon.ts`). Until a library arrives
 * a placeholder draws Lucide's icon, then every placeholder draws again (`subscribeIconData`).
 */
import {
  // Renamed: it would hide the global `Map`.,
  Activity,
  AppWindow,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  AudioLines,
  AudioWaveform,
  BadgeCheck,
  Bell,
  Bluetooth,
  Bold,
  BookOpen,
  BookOpenCheck,
  Bookmark,
  Bot,
  Building2,
  Calculator,
  Calendar,
  CalendarPlus,
  ChartBar,
  ChartLine,
  ChartPie,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  CircleAlert,
  CircleArrowLeft,
  CircleCheck,
  CircleDashed,
  CircleFadingPlus,
  CircleUser,
  ClipboardPaste,
  Clock,
  Cloud,
  Code,
  Copy,
  CornerDownLeft,
  CreditCard,
  Ellipsis,
  ExternalLink,
  EyeOff,
  Pipette,
  FaceSlightlySmiling,
  File,
  FileCode,
  FileText,
  Folder,
  FolderCode,
  FolderPlus,
  Frame,
  GalleryVerticalEnd,
  GitBranch,
  Globe,
  Heart,
  HelpCircle,
  House,
  Image,
  Inbox,
  Info,
  Italic,
  Layout,
  LayoutGrid,
  Link,
  List,
  ListFilter,
  Loader,
  LoaderCircle,
  LogOut,
  Mail,
  MailCheck,
  Map as MapShape,
  MessageSquare,
  Mic,
  Minus,
  PanelLeft,
  Pencil,
  Plus,
  PlusCircle,
  Radio,
  RefreshCcw,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Save,
  Scissors,
  Search,
  Settings,
  Settings2,
  Share,
  ShieldAlert,
  Sparkles,
  SquareCenterlineDashedHorizontal,
  SquareCenterlineDashedVertical,
  SquareTerminal,
  Star,
  Table,
  Tag,
  Terminal,
  Trash,
  Trash2,
  TrendingUp,
  TriangleAlert,
  Underline,
  User,
  UserRoundX,
  Users,
  VolumeOff,
  VolumeX,
  Wallet,
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  Clock2,
  OctagonX,
  Brain,
  Circle,
  Download,
  FileArchive,
  FilePen,
  FilePlus,
  FileSearch,
  FileWarning,
  FolderSearch,
  GitCommitHorizontal,
  Presentation,
  ThumbsDown,
  ThumbsUp,
  WrapText,
  ArrowLeftRight,
  Camera,
  Car,
  CircleHelp,
  CirclePlus,
  Coffee,
  Container,
  FileBarChart,
  Gauge,
  LayoutDashboard,
  Lock,
  LockKeyhole,
  Monitor,
  Paintbrush,
  Repeat,
  Server,
  Shield,
  ShoppingCart,
  Sun,
  Target,
  Thermometer,
  Timer,
  Tv,
  UploadCloud,
  Volume2,
  Zap,
  CircleFadingArrowUp,
  Dot,
  Eye,
  FolderOpen,
  Keyboard,
  Languages,
  Maximize,
  Minimize,
  Moon,
  Palette,
  GitFork,
  ArrowUpDown,
  Forward,
  TrendingDown,
  ArrowDownFromLine,
  ArrowUpFromLine,
  Footprints,
  Waves,
  MessageCircleDashed,
  Paperclip,
  Telescope,
  ArchiveX,
  Blocks,
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  Columns3,
  Command,
  CornerUpLeft,
  CornerUpRight,
  Database,
  EllipsisVertical,
  FileChartColumn,
  GripVertical,
  LifeBuoy,
  Menu,
  MessageCircle,
  MessageCircleQuestion,
  Send,
  StarOff,
  Video,
  CircleDot,
  CircleX,
  FlaskConical,
  Layers,
  ListChecks,
  ListTodo,
  Route,
  Captions,
  MoreVertical,
  ShoppingBag,
  StopCircle,
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

/** A library's data as `scripts/icon-data.ts` writes it. */
export type IconLibraryData = {
  svg: Readonly<Record<string, string | number>>
  icons: Readonly<
    Record<
      string,
      readonly (readonly [string, Readonly<Record<string, string>>])[]
    >
  >
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
      SmileIcon: FaceSlightlySmiling,
      CalculatorIcon: Calculator,
      CalendarIcon: Calendar,
      CircleCheckIcon: CircleCheck,
      FolderPlusIcon: FolderPlus,
      GlobeIcon: Globe,
      ImageIcon: Image,
      LayoutGridIcon: LayoutGrid,
      LinkIcon: Link,
      ListIcon: List,
      TableIcon: Table,
      ZoomInIcon: ZoomIn,
      ZoomOutIcon: ZoomOut,
      BluetoothIcon: Bluetooth,
      CircleFadingPlusIcon: CircleFadingPlus,
      AlertCircleIcon: CircleAlert,
      AlertTriangleIcon: TriangleAlert,
      BookOpenCheckIcon: BookOpenCheck,
      CalendarPlusIcon: CalendarPlus,
      CheckCircle2Icon: CircleCheck,
      FlipHorizontalIcon: SquareCenterlineDashedHorizontal,
      FlipVerticalIcon: SquareCenterlineDashedVertical,
      FolderCodeIcon: FolderCode,
      ListFilterIcon: ListFilter,
      MailCheckIcon: MailCheck,
      RotateCcwIcon: RotateCcw,
      ShieldAlertIcon: ShieldAlert,
      TagIcon: Tag,
      ArrowUpRightIcon: ArrowUpRight,
      BadgeCheck: BadgeCheck,
      CircleAlertIcon: CircleAlert,
      CircleUserIcon: CircleUser,
      ClockIcon: Clock,
      CloudIcon: Cloud,
      FileIcon: File,
      FileTextIcon: FileText,
      GitBranchIcon: GitBranch,
      InboxIcon: Inbox,
      RotateCwIcon: RotateCw,
      UserRoundXIcon: UserRoundX,
      VolumeOffIcon: VolumeOff,
      VolumeX: VolumeX,
      ArrowLeftIcon: ArrowLeft,
      BoldIcon: Bold,
      BookmarkIcon: Bookmark,
      CircleDashedIcon: CircleDashed,
      CornerDownLeftIcon: CornerDownLeft,
      ExternalLinkIcon: ExternalLink,
      EyeOffIcon: EyeOff,
      PipetteIcon: Pipette,
      FileCodeIcon: FileCode,
      HeartIcon: Heart,
      InfoIcon: Info,
      ItalicIcon: Italic,
      Loader2Icon: LoaderCircle,
      LoaderIcon: Loader,
      MicIcon: Mic,
      MinusIcon: Minus,
      RadioIcon: Radio,
      RefreshCcwIcon: RefreshCcw,
      RefreshCwIcon: RefreshCw,
      SaveIcon: Save,
      StarIcon: Star,
      UnderlineIcon: Underline,
      // Upstream's name, from Lucide's older one for `CircleArrowLeft`.
      ArrowLeftCircleIcon: CircleArrowLeft,
      AppWindowIcon: AppWindow,
      CodeIcon: Code,
      // Upstream's names, from Lucide's older ones for `House` and `Ellipsis`.
      HomeIcon: House,
      MoreHorizontalIcon: Ellipsis,
      SearchIcon: Search,
      TrendingUpIcon: TrendingUp,
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
      // sidebar-07's. Upstream's names, from Lucide's older ones for `SquareTerminal` and `ChartPie`.
      AudioLinesIcon: AudioLines,
      AudioWaveformIcon: AudioWaveform,
      BookOpenIcon: BookOpen,
      BotIcon: Bot,
      FolderIcon: Folder,
      FrameIcon: Frame,
      GalleryVerticalEndIcon: GalleryVerticalEnd,
      MapIcon: MapShape,
      PieChartIcon: ChartPie,
      PlusIcon: Plus,
      Settings2Icon: Settings2,
      SparklesIcon: Sparkles,
      TerminalIcon: Terminal,
      TerminalSquareIcon: SquareTerminal,
      Trash2Icon: Trash2,
      ChevronLeftIcon: ChevronLeft,
      Clock2Icon: Clock2,
      OctagonXIcon: OctagonX,
      TriangleAlertIcon: TriangleAlert,
      BrainIcon: Brain,
      CircleIcon: Circle,
      DownloadIcon: Download,
      FileArchiveIcon: FileArchive,
      FilePenIcon: FilePen,
      FilePlusIcon: FilePlus,
      FileSearchIcon: FileSearch,
      FileWarningIcon: FileWarning,
      FolderSearchIcon: FolderSearch,
      GitCommitHorizontalIcon: GitCommitHorizontal,
      LoaderCircleIcon: LoaderCircle,
      PresentationIcon: Presentation,
      ThumbsDownIcon: ThumbsDown,
      ThumbsUpIcon: ThumbsUp,
      WrapTextIcon: WrapText,
      ArrowLeftRightIcon: ArrowLeftRight,
      CameraIcon: Camera,
      CarIcon: Car,
      CircleHelpIcon: CircleHelp,
      CirclePlusIcon: CirclePlus,
      CoffeeIcon: Coffee,
      ContainerIcon: Container,
      FileBarChartIcon: FileBarChart,
      GaugeIcon: Gauge,
      LayoutDashboardIcon: LayoutDashboard,
      LockIcon: Lock,
      LockKeyholeIcon: LockKeyhole,
      MonitorIcon: Monitor,
      PaintbrushIcon: Paintbrush,
      RepeatIcon: Repeat,
      ServerIcon: Server,
      ShieldIcon: Shield,
      ShoppingCartIcon: ShoppingCart,
      SunIcon: Sun,
      TargetIcon: Target,
      ThermometerIcon: Thermometer,
      TimerIcon: Timer,
      TvIcon: Tv,
      UploadCloudIcon: UploadCloud,
      Volume2Icon: Volume2,
      ZapIcon: Zap,
      CircleFadingArrowUpIcon: CircleFadingArrowUp,
      DotIcon: Dot,
      EyeIcon: Eye,
      FolderOpenIcon: FolderOpen,
      KeyboardIcon: Keyboard,
      LanguagesIcon: Languages,
      MaximizeIcon: Maximize,
      MinimizeIcon: Minimize,
      MoonIcon: Moon,
      PaletteIcon: Palette,
      GitForkIcon: GitFork,
      ArrowUpDownIcon: ArrowUpDown,
      ForwardIcon: Forward,
      TrendingDownIcon: TrendingDown,
      ArrowDownFromLineIcon: ArrowDownFromLine,
      ArrowUpFromLineIcon: ArrowUpFromLine,
      FootprintsIcon: Footprints,
      WavesIcon: Waves,
      MessageCircleDashedIcon: MessageCircleDashed,
      PaperclipIcon: Paperclip,
      TelescopeIcon: Telescope,
      ArchiveXIcon: ArchiveX,
      BlocksIcon: Blocks,
      ChevronsLeftIcon: ChevronsLeft,
      ChevronsRightIcon: ChevronsRight,
      CircleUserRoundIcon: CircleUserRound,
      Columns3Icon: Columns3,
      CommandIcon: Command,
      CornerUpLeftIcon: CornerUpLeft,
      CornerUpRightIcon: CornerUpRight,
      DatabaseIcon: Database,
      EllipsisVerticalIcon: EllipsisVertical,
      FileChartColumnIcon: FileChartColumn,
      GripVerticalIcon: GripVertical,
      LifeBuoyIcon: LifeBuoy,
      MenuIcon: Menu,
      MessageCircleIcon: MessageCircle,
      MessageCircleQuestionIcon: MessageCircleQuestion,
      SendIcon: Send,
      StarOffIcon: StarOff,
      VideoIcon: Video,
      CircleDotIcon: CircleDot,
      CircleXIcon: CircleX,
      FlaskConicalIcon: FlaskConical,
      LayersIcon: Layers,
      ListChecksIcon: ListChecks,
      ListTodoIcon: ListTodo,
      RouteIcon: Route,
      BookOpen,
      CaptionsIcon: Captions,
      LifeBuoy,
      MoreVerticalIcon: MoreVertical,
      Send,
      ShoppingBagIcon: ShoppingBag,
      StopCircleIcon: StopCircle,
    },
  },
}

/** The libraries whose data is a file of its own, loaded when a design first draws them. */
const LOADERS: Partial<
  Record<IconLibrary, () => Promise<{ default: IconLibraryData }>>
> = {
  // Typed loosely: its shapes are the package's own, with React's attribute names.
  hugeicons: () =>
    import("./hugeicons") as unknown as Promise<{ default: IconLibraryData }>,
  tabler: () => import("./tabler"),
  phosphor: () => import("./phosphor"),
  remixicon: () => import("./remixicon"),
}

const loading = new Set<IconLibrary>()
const listeners = new Set<() => void>()
let version = 0

/**
 * Loads a library's data once, in the browser, then tells every placeholder to draw again. A
 * library already here, or one with no file, is left as it is.
 */
export function loadIconLibrary(library: IconLibrary) {
  const load = LOADERS[library]
  if (LIBRARIES[library] || !load || loading.has(library)) return
  if (typeof window === "undefined") return
  loading.add(library)
  void load().then(({ default: data }) => {
    LIBRARIES[library] = data as unknown as Library
    version += 1
    for (const listener of listeners) listener()
  })
}

/** Calls `listener` when a library's data arrives; returns the function that stops it. */
export function subscribeIconData(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** How many libraries have arrived: what a placeholder compares to know it should draw again. */
export const iconDataVersion = () => version

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
  if (!LIBRARIES[library]) loadIconLibrary(library)
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
