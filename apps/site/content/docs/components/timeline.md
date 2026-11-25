---
title: Timeline
description: An ordered list of events along a line, each with its marker, its title, its time and a description.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [timeline, history, activity, feed, events, changelog, component, kirana]
---

# Timeline

<!-- ::preview item="timeline-demo" height="420" combinations="react/kirana,vue/kirana,svelte/kirana,solid/kirana,angular/kirana" -->

Timeline is plain markup and styles, with no behaviour: an ordered list (`ol`) whose items each draw a marker on a line, the line to the next item, and the event's title, time and description beside it. It lays out down the page or across it, and its text, colours and corners follow the design you choose.

## Installation

<!-- ::installation name="timeline" combinations="react/kirana,vue/kirana,svelte/kirana,solid/kirana,angular/kirana" -->

## Usage

<!-- ::start:only react/kirana,solid/kirana -->

```tsx
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"
```

```tsx
<Timeline>
  <TimelineItem>
    <TimelineMarker variant="primary" />
    <TimelineContent>
      <TimelineTitle>Order placed</TimelineTitle>
      <TimelineTime dateTime="2026-11-18T09:12">18 Nov, 09:12</TimelineTime>
      <TimelineDescription>Your order was confirmed.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineMarker variant="muted" />
    <TimelineContent>
      <TimelineTitle>Delivered</TimelineTitle>
      <TimelineTime dateTime="2026-11-21">21 Nov</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

<!-- ::end:only -->

<!-- ::start:only solid/kirana -->

In Solid, the time's attribute is written `datetime`.

<!-- ::end:only -->

<!-- ::start:only vue/kirana -->

```vue
<script setup lang="ts">
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"
</script>

<template>
  <Timeline>
    <TimelineItem>
      <TimelineMarker variant="primary" />
      <TimelineContent>
        <TimelineTitle>Order placed</TimelineTitle>
        <TimelineTime datetime="2026-11-18T09:12">18 Nov, 09:12</TimelineTime>
        <TimelineDescription>Your order was confirmed.</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineMarker variant="muted" />
      <TimelineContent>
        <TimelineTitle>Delivered</TimelineTitle>
        <TimelineTime datetime="2026-11-21">21 Nov</TimelineTime>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/kirana -->

```svelte
<script lang="ts">
  import {
    Timeline,
    TimelineContent,
    TimelineDescription,
    TimelineItem,
    TimelineMarker,
    TimelineTime,
    TimelineTitle,
  } from "@/components/ui/timeline"
</script>

<Timeline>
  <TimelineItem>
    <TimelineMarker variant="primary" />
    <TimelineContent>
      <TimelineTitle>Order placed</TimelineTitle>
      <TimelineTime datetime="2026-11-18T09:12">18 Nov, 09:12</TimelineTime>
      <TimelineDescription>Your order was confirmed.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineMarker variant="muted" />
    <TimelineContent>
      <TimelineTitle>Delivered</TimelineTitle>
      <TimelineTime datetime="2026-11-21">21 Nov</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

<!-- ::end:only -->

<!-- ::start:only angular/kirana -->

```ts
import { Component } from "@angular/core"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

@Component({
  selector: "app-example",
  imports: [
    Timeline,
    TimelineContent,
    TimelineDescription,
    TimelineItem,
    TimelineMarker,
    TimelineTime,
    TimelineTitle,
  ],
  template: `
    <ol kuiTimeline>
      <li kuiTimelineItem>
        <span kuiTimelineMarker variant="primary"></span>
        <div kuiTimelineContent>
          <div kuiTimelineTitle>Order placed</div>
          <time kuiTimelineTime datetime="2026-11-18T09:12">18 Nov, 09:12</time>
          <p kuiTimelineDescription>Your order was confirmed.</p>
        </div>
      </li>
      <li kuiTimelineItem>
        <span kuiTimelineMarker variant="muted"></span>
        <div kuiTimelineContent>
          <div kuiTimelineTitle>Delivered</div>
          <time kuiTimelineTime datetime="2026-11-21">21 Nov</time>
        </div>
      </li>
    </ol>
  `,
})
export class Example {}
```

<!-- ::end:only -->

Each item draws the line to the next item itself, and the last item hides it. A marker with no children is a small dot, centred on a line of the title's text.

## Composition

```text
Timeline
└── TimelineItem
    ├── TimelineMarker
    ├── TimelineContent
    │   ├── TimelineTitle
    │   ├── TimelineTime
    │   └── TimelineDescription
    └── TimelineConnector (drawn by the item)
```

## Examples

### Icons

Give `TimelineMarker` an icon to draw it in a round mark the size of an avatar. The content moves down so that its title sits on the mark's centre.

<!-- ::preview item="timeline-icons" height="480" combinations="react/kirana,vue/kirana,svelte/kirana,solid/kirana,angular/kirana" -->

### Alternate

Use `align="alternate"` to put every other item on the other side of the line, its text aligned towards it. The list does so once it is at least 32rem wide, and lays out as `start` when narrower.

<!-- ::preview item="timeline-alternate" height="420" combinations="react/kirana,vue/kirana,svelte/kirana,solid/kirana,angular/kirana" -->

### Horizontal

Use `orientation="horizontal"` to lay the items out across the page, each item's content under its marker. With `align="alternate"` too, every other item's content goes above the line.

<!-- ::preview item="timeline-horizontal" height="300" combinations="react/kirana,vue/kirana,svelte/kirana,solid/kirana,angular/kirana" -->

### Activity

Give `TimelineMarker` an [Avatar](/docs/components/avatar) to show who did what, for an activity feed. The avatar is drawn alone, with no ring around it.

<!-- ::preview item="timeline-activity" height="480" combinations="react/kirana,vue/kirana,svelte/kirana,solid/kirana,angular/kirana" -->

## API Reference

Every part takes the props of the element it draws and Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

### Timeline

The list of events. It draws an `ol`; give it an `aria-label`.

| Prop          | Type                         | Default      |
| ------------- | ---------------------------- | ------------ |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` |
| `align`       | `"start" \| "alternate"`     | `"start"`    |

### TimelineItem

One event. It draws an `li`, then the line to the next item.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `connector` | `boolean` | `true`  |

`connector={false}` leaves out the line, for a caller who places a `TimelineConnector` itself.

### TimelineMarker

The mark on the line. It draws a `span`, hidden from assistive technology: say in the content what the mark shows. With no children it is a small dot; with an icon, a round mark around it; with an `Avatar`, the avatar alone.

| Prop      | Type                                | Default     |
| --------- | ----------------------------------- | ----------- |
| `variant` | `"default" \| "primary" \| "muted"` | `"default"` |

`default` is a ring in the primary colour (an outline, around an icon), `primary` is filled in the primary colour, for an event that has happened, and `muted` is grey, for one to come.

### TimelineConnector

The line from an item to the next. It draws a `div`, hidden from assistive technology. `TimelineItem` draws one already.

### TimelineContent

The event's title, time and description, beside the marker. It draws a `div`.

### TimelineTitle

The event's title. It draws a `div`.

### TimelineTime

When the event happened, in small muted text. It draws a `time`: give it `dateTime` (`datetime` in Vue, Svelte, Solid and Angular) in a form a machine can read.

### TimelineDescription

A line of muted text about the event. It draws a `p`.
