<div align="center">

# RONIN Design System

**The taste-aware widget library for RONIN — a macOS AI orchestration app.**

14 dark-themed, animated widgets built with React, Tailwind CSS v4, and the native Web Animations API.

`#07182C` · `#0DEEF3` · SF Pro · 60fps · Zero runtime dependencies

---

</div>

## Overview

RONIN Design System is a self-contained React component library that powers the RONIN AI orchestration interface. Every widget is designed around a dark navy aesthetic with teal accent lighting, 1px ghost borders, and fluid entrance animations — all without external animation libraries.

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `teal` | `#0DEEF3` | Primary accent, active states, progress fills |
| `green` | `#34D399` | Success states, completion indicators |
| `mono` | `ui-monospace, SFMono-Regular` | Code, data values, labels |
| `sfPro` | `-apple-system, BlinkMacSystemFont, "SF Pro Text"` | Body text, headers |
| Background | `#07182C` | Widget card background |
| Canvas | `#030B15` | Page/app background |
| Border | `rgba(255,255,255,0.08)` | Subtle 1px card borders |
| Radius | `10px` | Card border-radius |
| Spacing | `8px` scale | Consistent gap/padding unit |

---

## Quick Start

```bash
git clone https://github.com/Gaurav2693/ronin-design-system.git
cd ronin-design-system
npm install
npm run dev
```

Open `http://localhost:5173` to see the full widget showcase with all states and animations.

---

## Project Structure

```
src/
├── App.tsx                    # Main showcase with all 14 widget sections
├── main.tsx                   # React entry point
├── index.css                  # Tailwind import + base styles
└── components/
    ├── anim.ts                # Web Animations API utilities
    ├── WidgetCard.tsx         # Foundation: card, icon set, tokens, helpers
    ├── Helmet.tsx             # RONIN helmet SVG component
    ├── svg-paths.ts           # Helmet vector path data
    ├── AgentHQCard.tsx        # 01 — Agent HQ
    ├── SeatBadge.tsx          # 02 — Seat Badge
    ├── MemoryBar.tsx          # 03 — Memory Bar
    ├── CostWidget.tsx         # 04 — Cost Widget
    ├── JobsWidget.tsx         # 05 — Jobs Widget
    ├── BuildTree.tsx          # 06 — Build Tree
    ├── BriefCard.tsx          # 07 — Brief Card
    ├── DiffCard.tsx           # 08 — Diff Card
    ├── ConnectorsStrip.tsx    # 09 — Connectors Strip
    ├── TasteLog.tsx           # 10 — Taste Log
    ├── CodeBlock.tsx          # 11 — Code Block
    ├── InputBar.tsx           # 12 — Input Bar
    ├── QuickActionChips.tsx   # 13 — Quick Action Chips
    └── TerminalCard.tsx       # 14 — Terminal Card
```

---

## Animation System (`anim.ts`)

All animations use the native **Web Animations API** — zero-dependency, 60fps, hardware-accelerated.

| Utility | Description | Signature |
|---------|-------------|----------|
| `animateIn` | Fade + translate entrance for any element | `(el, { delay?, duration?, from?, to? })` |
| `staggerIn` | Sequentially animate children of a parent | `(parent, { stagger?, duration?, from?, selector? })` |
| `scaleIn` | Spring-scale entrance (overshoot easing) | `(el, delay?)` |
| `pulseLoop` | Infinite opacity pulse | `(el) => Animation` |
| `tickUp` | Infinite vertical tick for live counters | `(el) => Animation` |
| `cursorBlink` | Step-function blink for terminal cursors | `(el) => Animation` |
| `scrollReveal` | IntersectionObserver-triggered fade-in | `(el)` |

### Usage

```tsx
import { animateIn, staggerIn, pulseLoop } from "./components/anim";

// Animate a single element on mount
useEffect(() => {
  animateIn(ref.current, {
    delay: 200,
    from: { opacity: 0, transform: "translateY(12px)" },
  });
}, []);

// Stagger-animate all children
useEffect(() => {
  staggerIn(listRef.current, { stagger: 40 });
}, []);

// Start an infinite pulse (returns Animation for cleanup)
useEffect(() => {
  const anim = pulseLoop(dotRef.current);
  return () => anim?.cancel();
}, []);
```

---

## Foundation Components (`WidgetCard.tsx`)

### `<WidgetCard>`

The base container for every widget. Dark navy background, ghost border, animated entrance.

```tsx
import { WidgetCard } from "./components/WidgetCard";

<WidgetCard style={{ width: 320 }} delay={0.1}>
  {/* your widget content */}
</WidgetCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Widget content |
| `style` | `CSSProperties` | — | Override styles (typically `width`) |
| `delay` | `number` | `0` | Entrance animation delay in seconds |
| `className` | `string` | — | Additional CSS classes |

### `<WidgetHeader>`

Standard header bar with SVG icon, title, and optional controls.

```tsx
import { WidgetHeader } from "./components/WidgetCard";

<WidgetHeader
  icon="settings"       // Icon name from built-in set
  title="AGENT HQ"      // Uppercase label
  iconColor="#0DEEF3"   // Teal by default
  showControls          // Adds collapse/close buttons
  right={<StatusDot />} // Optional right-side element
/>
```

### `<Icon>`

25+ clean, minimal SVG icons with consistent 1px stroke style. No external icon library needed.

```tsx
import { Icon } from "./components/WidgetCard";

<Icon name="terminal" size={14} color="#0DEEF3" strokeWidth={1.5} />
```

**Available icons:** `settings`, `users`, `brain`, `dollar`, `zap`, `gitBranch`, `fileText`, `gitCompare`, `link`, `fingerprint`, `code`, `terminal`, `chevronUp`, `x`, `paperclip`, `externalLink`, `figma`, `image`, `globe`, `flask`, `cpu`, `pen`, `send`, `plus`, `activity`

### `<StateLabel>`

Small mono-spaced label used above widgets to indicate state.

```tsx
<StateLabel label="STREAMING" active />
```

### `<StatusDot>`

Animated status indicator with optional pulse and glow.

```tsx
<StatusDot color="#0DEEF3" pulsing glow />
```

---

## Widget Reference

### 01 — Agent HQ

**File:** `AgentHQCard.tsx` · **Export:** `AgentHQShowcase` (default)

The flagship widget. Displays a list of RONIN agents (with Helmet SVG avatars), a segmented progress bar, and an expandable detail panel. Serves as the baseline for the entire design system's visual language.

**States:** `idle` · `streaming` · `complete`

```tsx
import AgentHQShowcase from "./components/AgentHQCard";
<AgentHQShowcase />
```

**Key features:**
- Helmet SVG avatars with per-agent accent colors
- Selectable agent rows with highlight border
- 6-segment progress bar with teal fill + glow
- Pulsing status dot during streaming state
- Detail panel with scale-in animation on selection

---

### 02 — Seat Badge

**File:** `SeatBadge.tsx` · **Export:** `SeatBadgeWidget`

Circular badge indicators for operator seats using the Helmet SVG component.

**States:** `default` · `active` · `offline`

```tsx
import { SeatBadgeWidget } from "./components/SeatBadge";
<SeatBadgeWidget />
```

**Key features:**
- Helmet icons inside circular badges
- Active state: accent glow + color border
- Offline state: reduced opacity
- Spring-scale entrance animation per badge

---

### 03 — Memory Bar

**File:** `MemoryBar.tsx` · **Export:** `MemoryBarWidget`

Horizontal progress bars showing memory dimensions (Craft, Density) with animated fills.

**States:** `empty` · `filling` · `full`

```tsx
import { MemoryBarWidget } from "./components/MemoryBar";
<MemoryBarWidget />
```

**Key features:**
- Gradient teal fill with smooth width animation
- Pulsing dot at fill edge during `filling` state
- Score values appear in `full` state
- Staggered bar entrance delays

---

### 04 — Cost Widget

**File:** `CostWidget.tsx` · **Export:** `CostWidgetSection`

Compact cost counter with tabular numeric display and live tick animation.

**States:** `zero` · `ticking` · `final` · `warning`

```tsx
import { CostWidgetSection } from "./components/CostWidget";
<CostWidgetSection />
```

**Key features:**
- Large mono-spaced dollar amount with slide-up entrance
- Infinite tick-up arrow animation during `ticking`
- Warning state turns value + dot amber (`#F5C200`)
- Contextual sub-labels ("session complete", "approaching limit")

---

### 05 — Jobs Widget

**File:** `JobsWidget.tsx` · **Export:** `JobsWidgetSection`

Minimal job status indicator with running/complete counts.

**States:** `idle` · `running` · `complete`

```tsx
import { JobsWidgetSection } from "./components/JobsWidget";
<JobsWidgetSection />
```

**Key features:**
- Slide-in content animation per state
- Pulsing teal dot during `running`
- Active job name shown below status
- Completion count with failure tally

---

### 06 — Build Tree

**File:** `BuildTree.tsx` · **Export:** `BuildTreeSection`

Hierarchical build step visualization with status icons, indentation, and per-step costs.

**States:** `progress` · `complete` · `error`

```tsx
import { BuildTreeSection } from "./components/BuildTree";
<BuildTreeSection />
```

**Key features:**
- 11 build steps with `done`/`active`/`pending`/`error` status icons
- Indented sub-steps for nested operations
- Active border highlight on current step
- Per-step cost in mono teal
- Total cost footer on completion
- Error state with dimmed post-error items + red footer message
- Staggered row entrance (35ms per row)

---

### 07 — Brief Card

**File:** `BriefCard.tsx` · **Export:** `BriefCardSection`

Project brief with status pill and left border indicator.

**States:** `draft` · `locked`

```tsx
import { BriefCardSection } from "./components/BriefCard";
<BriefCardSection />
```

**Key features:**
- Dashed amber border for `draft`, solid teal for `locked`
- Animated status pill with scale-in entrance
- Date label on locked state
- Slide-in content animation

---

### 08 — Diff Card

**File:** `DiffCard.tsx` · **Export:** `DiffCardSection`

Git-style diff summary showing modified/added files with line counts.

**States:** `collapsed` · `expanded`

```tsx
import { DiffCardSection } from "./components/DiffCard";
<DiffCardSection />
```

**Key features:**
- Collapsed: total +/- summary in header
- Expanded: per-file breakdown with status letter (M/A/D)
- Color-coded: amber for modified, green for added, red for deleted
- Staggered file row entrance

---

### 09 — Connectors Strip

**File:** `ConnectorsStrip.tsx` · **Export:** `ConnectorsStripSection`

Horizontal strip of connected service indicators (Figma, Blender, Gmail, Cal, Notion).

**States:** `disconnected` · `connected` · `active`

```tsx
import { ConnectorsStripSection } from "./components/ConnectorsStrip";
<ConnectorsStripSection />
```

**Key features:**
- Per-service brand colors on status dots
- Disconnected: muted dots + dimmed labels
- Active: pulsing glow on active connector
- Staggered entrance with vertical slide

---

### 10 — Taste Log

**File:** `TasteLog.tsx` · **Export:** `TasteLogSection`

Multi-dimensional taste pattern tracker with confidence dots and fingerprint visualization.

**States:** `day1` · `day30` · `day90`

```tsx
import { TasteLogSection } from "./components/TasteLog";
<TasteLogSection />
```

**Key features:**
- Pattern dimensions: spacing, naming, components, colors, layout, borders
- 5-dot confidence indicator with spring-scale animation
- Day 90: 5x5 "taste fingerprint" grid visualization
- Staggered row entrance
- Numeric confidence score per dimension

---

### 11 — Code Block

**File:** `CodeBlock.tsx` · **Export:** `CodeBlockSection`

Syntax-highlighted code viewer showing RONIN's personalization evolution.

**States:** `generic` · `transitioning` · `personalized`

```tsx
import { CodeBlockSection } from "./components/CodeBlock";
<CodeBlockSection />
```

**Key features:**
- Token-level syntax coloring (teal keywords, green strings, purple components)
- Line numbers with muted styling
- File name header with language pill
- Staggered line entrance (30ms per line)
- Shows progression from generic to RONIN-personalized code

---

### 12 — Input Bar

**File:** `InputBar.tsx` · **Export:** `InputBarSection`

Chat-style input field with toolbar, attachment chips, and animated send button.

**States:** `empty` · `typing` · `chips`

```tsx
import { InputBarSection } from "./components/InputBar";
<InputBarSection />
```

**Key features:**
- Tool strip: Attach, Link, Figma frame, Screenshot
- Attachment chips with brand colors (blue for files, purple for Figma)
- Send button transitions from muted to teal glow when text is present
- Model indicator (`sonnet-4-6`)
- Hover interactions on tool icons

---

### 13 — Quick Action Chips

**File:** `QuickActionChips.tsx` · **Export:** `QuickActionChipsSection`

Pill-shaped action buttons with interactive hover/press states.

**States:** `default` · `hover` · `active` · `interactive`

```tsx
import { QuickActionChipsSection } from "./components/QuickActionChips";
<QuickActionChipsSection />
```

**Key features:**
- 4 actions: Open workspace, Review last commit, Run local model, Open Figma
- Hover: lighter background + stronger border
- Active: teal-tinted background + teal border
- Spring-scale click feedback animation
- Fade-up entrance animation

---

### 14 — Terminal Card

**File:** `TerminalCard.tsx` · **Export:** `TerminalCardSection`

Terminal emulator widget with real-time output and blinking cursor.

**States:** `collapsed` · `idle` · `streaming`

```tsx
import { TerminalCardSection } from "./components/TerminalCard";
<TerminalCardSection />
```

**Key features:**
- Dark sub-background (`#0D1117`) for terminal area
- Green checkmark indicators for completed steps
- Blinking cursor animation (step-function easing) in `idle`
- Streaming build output with staggered line entrance
- `ronin $` prompt with teal coloring
- Collapse/expand header controls

---

## Helmet Component

The RONIN Helmet is the brand mark used across Agent HQ and Seat Badge widgets.

```tsx
import { Helmet } from "./components/Helmet";

<Helmet
  size={32}            // px
  accentColor="#0DEEF3" // Visor + wing color
  glowColor="#0DEEF3"   // Drop-shadow glow (optional)
  pulsing               // CSS pulse animation (optional)
/>
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Styling | Tailwind CSS v4 |
| Build | Vite 6 |
| Animations | Web Animations API (native) |
| Icons | Custom SVG icon set (25+ icons) |
| Type Safety | TypeScript 5 |
| Font | SF Pro (system) |

**Zero external animation dependencies.** No GSAP, no Framer Motion, no Spring libraries. Every animation runs through the browser's native `Element.animate()` API for maximum performance.

---

## Design Principles

1. **Dark-first** — Every color choice assumes a `#030B15` canvas
2. **Ghost borders** — `rgba(255,255,255,0.08)` borders that whisper, not shout
3. **Teal signal** — `#0DEEF3` is used sparingly for active states and data values
4. **Mono data** — All numeric/code values use monospace for alignment
5. **Fluid entrances** — Every element animates in; nothing pops
6. **State-driven** — Each widget renders deterministically from a state enum
7. **8px rhythm** — Spacing follows an 8px base scale throughout

---

## License

MIT

---

<div align="center">

**Built for RONIN** by [Gaurav Mishra](https://gauravmishra.design)

</div>
