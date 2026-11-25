import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
} from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { timeline } from "../../../styles/timeline.styles"

type TimelineMarkerVariants = NonNullable<Parameters<typeof timeline.marker>[0]>

/** An ordered list of events down a line: `<ol kuiTimeline>`, its `orientation` and `align`. */
@Directive({
  selector: "[kuiTimeline]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline",
    "[attr.data-orientation]": "orientation()",
    "[attr.data-align]": "align()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Timeline {
  readonly orientation = input<"vertical" | "horizontal">("vertical")
  readonly align = input<"start" | "alternate">("start")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(timeline.root, this.sx()))
}

/** The line to the next event: `<div kuiTimelineConnector>`. `TimelineItem` draws one already. */
@Directive({
  selector: "[kuiTimelineConnector]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-connector",
    "aria-hidden": "true",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimelineConnector {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(timeline.connector, this.sx())
  )
}

/**
 * An event: `<li kuiTimelineItem>`, its marker and content, then the line to the next event (unless
 * `connector` is false), which the last one hides.
 */
@Component({
  selector: "[kuiTimelineItem]",
  imports: [TimelineConnector],
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />
    @if (connector()) {
      <div kuiTimelineConnector></div>
    }`,
})
class TimelineItem {
  readonly connector = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(timeline.item, this.sx()))
}

/** The mark on the line: `<span kuiTimelineMarker>`, a dot, or around an icon or an avatar. */
@Directive({
  selector: "[kuiTimelineMarker]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-marker",
    "[attr.data-variant]": "variant()",
    "aria-hidden": "true",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimelineMarker {
  readonly variant = input<TimelineMarkerVariants["variant"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(timeline.marker({ variant: this.variant() }), this.sx())
  )
}

/** An event's title, time and description: `<div kuiTimelineContent>`. */
@Directive({
  selector: "[kuiTimelineContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimelineContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(timeline.content, this.sx()))
}

/** An event's title: `<div kuiTimelineTitle>`. */
@Directive({
  selector: "[kuiTimelineTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimelineTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(timeline.title, this.sx()))
}

/** A line of muted text about an event: `<p kuiTimelineDescription>`. */
@Directive({
  selector: "[kuiTimelineDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimelineDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(timeline.description, this.sx())
  )
}

/** When an event happened: `<time kuiTimelineTime datetime="…">`. */
@Directive({
  selector: "[kuiTimelineTime]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "timeline-time",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimelineTime {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(timeline.time, this.sx()))
}

export {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
}
