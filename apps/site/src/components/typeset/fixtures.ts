/**
 * What the typeset preview shows: rendered markdown of the kinds typeset is for. The article, the
 * changelog, the notes and the docs' math are shadcn/ui's typeset fixtures (MIT,
 * `app/(app)/(typeset)/lib/fixtures`), the article's images without Tailwind's classes; the docs
 * and the chat are this site's, on its own subjects, in the same shapes (prose, lists, code,
 * notes, a reference table, rules, math; a short answer with a table and code).
 */

/** The question the chat answers, drawn outside the typeset container, as a message bubble. */
export const CHAT_QUESTION =
  "My Vite dev server takes ages to show the first page. How do I find out what's slow?"

export const CHAT_HTML = `
<p>A slow first page in Vite usually comes down to one of three things: dependencies being pre-bundled, a large module graph requested on the first visit, or a plugin doing heavy work on every file. Here's how to narrow it down.</p>
<h3>1. Watch what happens on start</h3>
<p>Start the server with Vite's debug output for the optimizer and the transforms:</p>
<pre><code>DEBUG="vite:deps,vite:transform" npx vite</code></pre>
<ul>
<li><strong>Pre-bundling</strong>: the dependencies Vite bundles with esbuild before serving. It is cached, so it should only be slow the first time, or after a lockfile change.</li>
<li><strong>Transforms</strong>: each module the browser asks for, and how long each plugin took on it.</li>
</ul>
<h3>2. Check the usual suspects</h3>
<table>
<thead>
<tr><th>Symptom</th><th>Likely cause</th></tr>
</thead>
<tbody>
<tr><td>Slow every start</td><td>A dependency discovered late, so the optimizer runs again and the page reloads</td></tr>
<tr><td>Slow first page only</td><td>A barrel file pulling a whole icon or UI library into the graph</td></tr>
<tr><td>Slow on every save</td><td>A plugin doing type checking or linting inside the transform</td></tr>
</tbody>
</table>
<p>The late discovery is the classic. Name those dependencies up front so they are bundled with the rest:</p>
<pre><code>// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    include: ["lucide-react", "@acme/ui"],
  },
})</code></pre>
<h3>3. Measure, don't guess</h3>
<p>If neither stands out, take a CPU profile of the server and open it in your browser's dev tools:</p>
<pre><code>npx vite --profile
# open the page, then press p and Enter in the terminal</code></pre>
<blockquote><p>Compare against a fresh <code>npm create vite</code> app on the same machine first. If that is slow too, look at the machine, or at an antivirus scanning <code>node_modules</code>, not at your app.</p></blockquote>
<p>Want to paste the slowest lines of the transform log? I can point at the plugin that's taking the time.</p>
`

export const DOCS_HTML = `
<h1>Writing a Style</h1>
<p>A style in Kirana is an object you write next to your component. The compiler turns every declaration into one class, shared by every module that writes the same declaration, and puts them all in one stylesheet at build time. Nothing about it runs in the browser.</p>
<p>To summarize, a style gives you the following:</p>
<ul>
<li><strong>Typed values</strong>: properties and values are checked as you write them, and the design's tokens are values like any other.</li>
<li><strong>Conditions inside the value</strong>: a hover, a breakpoint or a state is written where the value it changes is.</li>
<li><strong>One stylesheet</strong>: the build writes each declaration once, however many components use it.</li>
</ul>
<p>In this guide, you will write a card's styles, give them a state and a breakpoint, and merge a caller's styles with the card's own.</p>
<h2>Example</h2>
<p>A style goes from your file to the page like this:</p>
<ol>
<li>You call <code>css()</code> with an object, and apply it with <code>sx</code> on an element.</li>
<li>The compiler replaces the call with the classes of its declarations, and adds them to the stylesheet.</li>
<li>The element gets those classes, merged with any of its own.</li>
</ol>
<pre><code>import { css } from "@kirana-style/core"

const card = css({
  display: "grid",
  gap: "1rem",
  padding: "1.5rem",
  borderRadius: "0.75rem",
})

export function Card({ children }) {
  return &lt;div sx={card}&gt;{children}&lt;/div&gt;
}</code></pre>
<h3>Conditions</h3>
<p>A condition is a key inside the value it changes. The base value is <code>base</code>:</p>
<pre><code>const link = css({
  color: { base: "gray", ":hover": "black" },
  padding: { base: "0.5rem", "@media (width >= 48rem)": "1rem" },
})</code></pre>
<blockquote><p><strong>Note</strong>: a condition the compiler cannot place, or two that can match the same element at once with no order between them, is reported where you wrote it, before the build runs.</p></blockquote>
<h3>Merging</h3>
<p>Styles combine as an array. A later one wins, property by property and condition by condition, so a caller's style overrides only what it names:</p>
<pre><code>&lt;Card sx={[card, wide]} /&gt;</code></pre>
<blockquote><p><strong>Note</strong>: a component that takes <code>sx</code> passes it on last to its root, so the caller's styles win over its own.</p></blockquote>
<hr>
<h2>API reference</h2>
<h3>css(style)</h3>
<p>Declares a style. Every value is known at build time; a value only known at runtime is set through a custom property instead.</p>
<table>
  <thead>
    <tr><th>Key</th><th>Value</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>color</code></td><td><code>string</code></td><td>Any CSS property, by its JavaScript name</td></tr>
    <tr><td><code>base</code></td><td><code>value</code></td><td>The value when no condition holds</td></tr>
    <tr><td><code>":hover"</code></td><td><code>value</code></td><td>A pseudo-class of the element</td></tr>
    <tr><td><code>"@media (…)"</code></td><td><code>value</code></td><td>A media or container query</td></tr>
    <tr><td><code>"--name"</code></td><td><code>string</code></td><td>A custom property, for a value read elsewhere</td></tr>
  </tbody>
</table>
<h2>Tokens</h2>
<p>The design's values live in tokens, which every style reads by name:</p>
<ul>
<li><code>theme</code>: the colours, each a pair for light and dark.</li>
<li><code>radius</code>: the corners, from one base value.</li>
<li><code>space</code>: the spacing scale.</li>
</ul>
<p>Changing a token changes every style that reads it, with no other style recompiled.</p>
<pre><code>const panel = css({
  backgroundColor: theme.card,
  borderRadius: radius.lg,
  padding: space[6],
})</code></pre>
<hr>
<h2>Math</h2>
<p>Display math sits in the flow rhythm and scrolls when it runs long. Inline math like <math><msup><mi>e</mi><mrow><mi>i</mi><mi>π</mi></mrow></msup><mo>+</mo><mn>1</mn><mo>=</mo><mn>0</mn></math> rides the line without stretching it.</p>
<h3>Display</h3>
<p>The quadratic formula, as a block:</p>
<math display="block">
  <mi>x</mi><mo>=</mo>
  <mfrac>
    <mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow>
    <mrow><mn>2</mn><mi>a</mi></mrow>
  </mfrac>
</math>
<p>Prose continues after the block at the normal distance, so equations read as part of the argument, not decoration.</p>
<h3>Overflow</h3>
<p>A long expansion scrolls inside its own box instead of breaking the column:</p>
<math display="block">
  <msup><mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow><mn>4</mn></msup><mo>=</mo>
  <msup><mi>a</mi><mn>4</mn></msup><mo>+</mo>
  <mn>4</mn><msup><mi>a</mi><mn>3</mn></msup><mi>b</mi><mo>+</mo>
  <mn>6</mn><msup><mi>a</mi><mn>2</mn></msup><msup><mi>b</mi><mn>2</mn></msup><mo>+</mo>
  <mn>4</mn><mi>a</mi><msup><mi>b</mi><mn>3</mn></msup><mo>+</mo>
  <msup><mi>b</mi><mn>4</mn></msup>
</math>
`

export const ARTICLE_HTML = `
<h1>A Morning at the Letterpress Museum</h1>
<p>The first thing you notice is the smell: machine oil, paper dust, and a century of ink that never fully dries. The second thing is the sound. A working letterpress shop is not quiet, and the museum on Greer Street keeps three presses working, because, as the docent told me within a minute of my arrival, <em>a silent press is just furniture</em>.</p>
<p>I went because I write software that arranges text on screens, and I had started to suspect that everything hard about my job had been solved a hundred years ago by people with steel tools and no undo. I left four hours later with ink on my sleeve and a notebook full of confirmations.</p>
<figure>
  <img src="https://images.unsplash.com/photo-1629968417841-d87296c4205b?q=80&amp;w=1200&amp;h=675&amp;fit=crop" alt="Textured surface, worn by use." width="1200" height="675">
  <figcaption>Ink before it becomes language.</figcaption>
</figure>
<h2>The composing room</h2>
<p>Type lives in shallow wooden drawers called cases, and the layout of a case is itself a piece of interface design: the letters you reach for most sit nearest your hand, in the biggest compartments. Nobody alphabetized them. The arrangement was settled by frequency, argued over for a generation, and then never changed again, which is roughly the story of every good default I have ever shipped.</p>
<p>A compositor working at full speed sets about two thousand characters an hour, reading the manuscript with one eye while the other confirms each pick. The docent, a retired compositor named <strong>Ruth Okafor</strong>, demonstrated without looking down once. When I asked how long that took to learn she said, "The hands take a year. Knowing when a line is wrong takes ten."</p>
<blockquote>
  <p>Every em of space in this room is a physical object. You want more air between two lines, you go get the lead and you carry it back. It keeps your opinions about spacing very honest.</p>
</blockquote>
<p>That line rearranged something in my head. The strips of lead that printers wedged between lines of type are why we still say <a href="#">leading</a>. On my screen, spacing is a number I can change in a keystroke, and so I change it constantly, carelessly. Ruth's shop had exactly four widths of lead, and the whole trade agreed on them, and a hundred years of books came out beautiful anyway. Constraint was not the obstacle to the craft. It was the craft.</p>
<h2>What the metal knows</h2>
<figure>
  <img src="https://images.unsplash.com/photo-1637325258040-d2f09636ecf6?q=80&amp;w=900&amp;h=1200&amp;fit=crop" alt="Recycled paper, up close." width="900" height="1200">
  <figcaption>Space is material.</figcaption>
</figure>
<p>Three things the metal insists on, which screens let us forget:</p>
<ul>
  <li><strong>Space is material.</strong> Word spaces, line leads, and margins are objects with widths. Nothing is "auto." Someone chose everything.</li>
  <li><strong>Hierarchy is expensive.</strong> Changing size means walking to a different case. Printers built emphasis from weight and space first because size was the costly move, and their pages read better for it.</li>
  <li><strong>The page is finished before it is printed.</strong> A locked-up chase either holds together or it doesn't. There is a satisfying finality to it that no deploy has ever given me.</li>
</ul>
<p>None of this is nostalgia, or not only. The constraints were real costs, and digital type was right to remove them. But removal has a second-order effect: when nothing is expensive, nothing forces a decision, and unforced decisions drift. The printers' defaults survived because changing them was work. Ours have to survive on discipline, which is a weaker material.</p>
<hr>
<h2>Field notes</h2>
<p>Practical things I wrote down, in the order I wrote them:</p>
<ol>
  <li>Ruth sets solid (no leading) only for lines shorter than the alphabet. Anything longer gets air. Our line-length rules agree, which pleased me more than it should have.</li>
  <li>The shop's "house style" fits on an index card taped inside a cabinet door. Four leads, two faces, three sizes. An entire design system, physically enumerable.</li>
  <li>Apprentices learn distribution (putting type away) before composition. You learn a system by returning things to it.</li>
</ol>
<p>The museum runs open studio on the first Saturday of every month, and they will let you set your own name if you ask. Mine came out crooked. Ruth looked at it for a moment and said it was a common beginner's error: I had been so careful choosing the letters that I forgot to check the spaces. I have been thinking about that all week.</p>
<p><em>The Greer Street Press Museum is open Thursday through Sunday. If you go, bring a jacket; the composing room is kept cold for the metal.</em></p>
`

export const CHANGELOG_HTML = `
<h1>Changelog</h1>
<h2>v2.4.0</h2>
<p><em>June 18, 2026</em></p>
<ul>
  <li><strong>Added:</strong> <code>store.batch(fn)</code> groups multiple writes into a single notification. Listeners observe only the final state.</li>
  <li><strong>Added:</strong> a <code>name</code> option for devtools traces; anonymous stores now display as <code>store#3</code> instead of <code>undefined</code>.</li>
  <li><strong>Changed:</strong> selectors are memoized per subscriber, cutting re-render counts roughly in half on wide stores.</li>
  <li><strong>Fixed:</strong> subscribing during a notification no longer skips the next update.</li>
  <li><strong>Fixed:</strong> <code>equals</code> is respected for the initial <code>useStore</code> read, matching the documented behavior.</li>
</ul>
<h3>Breaking changes</h3>
<p>The deprecated <code>store.update()</code> alias is removed. Replace it with <code>store.set()</code>; the signature is identical:</p>
<pre><code>- store.update((s) =&gt; ({ count: s.count + 1 }))
+ store.set((s) =&gt; ({ count: s.count + 1 }))</code></pre>
<h2>v2.3.1</h2>
<p><em>May 30, 2026</em></p>
<ul>
  <li><strong>Fixed:</strong> a race where two synchronous writes in the same tick could notify in reverse order under React’s concurrent rendering.</li>
  <li><strong>Docs:</strong> clarified that stores must be hoisted out of components, with a lint rule to catch it.</li>
</ul>
<h2>v2.3.0</h2>
<p><em>May 12, 2026</em></p>
<ul>
  <li><strong>Added:</strong> React Native support; <code>useStore</code> no longer touches <code>window</code>.</li>
  <li><strong>Deprecated:</strong> <code>store.update()</code>, removed in v2.4.0. A console warning links to the migration note.</li>
  <li><strong>Performance:</strong> subscription bookkeeping moved from an array to a Set; unsubscribe is now O(1).</li>
</ul>
`

export const NOTES_HTML = `
<h1>Platform sync: week 27</h1>
<p><em>July 3, 2026 · 25 min · recording available</em></p>
<h2>Decisions</h2>
<ul>
  <li>Ship the streaming endpoint behind a flag on Tuesday; full rollout gated on the p95 latency holding under 800ms for 48 hours.</li>
  <li>Adopt cursor pagination for the activity feed. Offset stays on the admin tables only, capped at page 500.</li>
  <li>Postpone the queue migration to Q3. Nobody could name a current failure it fixes.</li>
</ul>
<h2>Action items</h2>
<ul class="contains-task-list">
  <li class="task-list-item"><input type="checkbox" checked disabled> <strong>Mia:</strong> flag config + kill switch for the streaming endpoint</li>
  <li class="task-list-item"><input type="checkbox" disabled> <strong>Devon:</strong> latency dashboard with the 800ms line drawn on it</li>
  <li class="task-list-item"><input type="checkbox" disabled> <strong>Sam:</strong> write the cursor encoding RFC, one page max</li>
  <li class="task-list-item"><input type="checkbox" disabled> <strong>Priya:</strong> close out the three stale runbook pages before Friday</li>
</ul>
<h2>Discussion</h2>
<ul>
  <li>Streaming rollout
    <ul>
      <li>Retry behavior on disconnect is still client-defined; server sends <code>retry-after</code> but nobody reads it.</li>
      <li>Agreement: the SDK should honor it, apps that hand-roll fetch are on their own.
        <ul>
          <li>Devon volunteered to add it to the SDK changelog as a “behavior change” callout.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>On-call load
    <ul>
      <li>Pages are down 40% since the alert dedup work. Two of the remaining alerts are known-noisy and owned by nobody.</li>
      <li>Priya takes both; if they can’t be fixed in an hour each, they get deleted.</li>
    </ul>
  </li>
</ul>
<blockquote>
  <p>“If an alert has fired twelve times and been actioned zero times, it isn’t an alert, it’s a screensaver.”</p>
</blockquote>
`

export const FIXTURES = {
  docs: DOCS_HTML,
  chat: CHAT_HTML,
  article: ARTICLE_HTML,
  changelog: CHANGELOG_HTML,
  notes: NOTES_HTML,
} as const
