# 🚀 NexusLearn — Next-Gen Learning Dashboard

A high-fidelity, **dark-mode-only** student dashboard built for the Frontend Intern Challenge. It pairs a hardware-accelerated, zero-layout-shift UI with **server-rendered** course data fetched live from Supabase.

**Stack:** Next.js 15 (App Router) · Supabase (`@supabase/ssr`) · Tailwind CSS · Framer Motion · lucide-react · TypeScript

---

## ✨ Highlights

- **Server Components for data** — courses are fetched on the server with `@supabase/ssr`; the anon key never gates writes (Row Level Security does), and no secret ever reaches the client bundle.
- **Streaming + Suspense** — the shell, hero, and activity tiles paint instantly while the course tiles stream in behind a `<Suspense>` boundary with **pulsing skeleton loaders** that hold their exact footprint (no layout shift on swap).
- **Bento grid** with a slim, collapsible sidebar.
- **Multi-page App Router navigation** — the sidebar links to real server-rendered routes (`/`, `/courses`, `/activity`, `/achievements`, `/settings`); the shared shell lives in the root layout so the sidebar persists and the `layoutId` highlight animates *across* navigations.
- **Framer Motion throughout** — staggered entrance, spring-physics hover, animated progress bars (via `scaleX`, not `width`), and a `layoutId` navigation highlight.
- **Zero layout shift** — every animation uses `transform`/`opacity` only.
- **Fully responsive** — full rail (desktop) → icons-only rail (tablet) → bottom nav (mobile).

---

## 🧱 Architecture & the Server/Client split

The guiding rule: **fetch on the server, animate on the client.**

```
app/
  layout.tsx            ← Server: <html> + persistent DashboardShell (sidebar)
  page.tsx              ← Server: overview grid + Suspense (force-dynamic)
  loading.tsx           ← Server: content-area skeleton
  error.tsx             ← Client: graceful error boundary + retry
  courses/page.tsx      ← Server: full course grid (force-dynamic)
  activity/page.tsx     ← Server: stats + contribution graph
  achievements/page.tsx ← Server: badge grid
  settings/page.tsx     ← Server: preferences + profile

components/dashboard/
  DashboardShell.tsx    ← Client: sidebar collapse state + MotionConfig
  Sidebar.tsx           ← Client: next/link nav, usePathname, layoutId highlight
  MainArea.tsx          ← Server: shared <main> + page header
  BentoGrid.tsx         ← Client: CSS grid + stagger orchestrator
  CourseSection.tsx     ← Server (async): awaits Supabase, catches errors
  CourseList.tsx        ← Client: stagger container (display: contents)
  CourseTile.tsx        ← Client: icon + progress + gradient mesh
  HeroTile.tsx          ← Client: greeting + streak
  ActivityTile.tsx      ← Client: contribution graph
  ActivityBoard.tsx     ← Client: activity stats + graph
  AchievementsGrid.tsx  ← Client: badge tiles
  SettingsPanel.tsx     ← Client: toggles + profile
  StatTile.tsx          ← Client: KPI tile with count-up
  ProgressBar.tsx       ← Client: scaleX fill + count-up
  BentoTile.tsx         ← Client: shared <article> shell (hover + entrance)
  skeletons.tsx         ← Server: skeleton loaders

lib/
  supabase/server.ts    ← request-scoped server client (cookies)
  data/courses.ts       ← server-only data access (getCourses)
  types.ts              ← Course + Database TypeScript interfaces
  icons.ts              ← tree-shakeable lucide icon registry
```

**Why these boundaries?**

- `app/page.tsx` is a **Server Component**. It renders the static structure and drops the data-dependent area inside `<Suspense fallback={<CourseTilesSkeleton/>}>`.
- `CourseSection` is an **async Server Component** — it `await`s `getCourses()` (Supabase) on the server and passes a **typed** `Course[]` down as props.
- Anything that needs interactivity or animation (`"use client"`) — sidebar, tiles, progress bars — lives at the **leaves** of the tree, receiving already-fetched data as props. Client components never import the Supabase client.
- The shell uses the **children-as-prop** pattern: `DashboardShell` (client) wraps `{children}` (the server-rendered `<main>`), so making the shell interactive doesn't force the data fetch onto the client.

### Animation strategy (and how layout shift is avoided)

| Interaction | Technique | Why it's shift-free |
|---|---|---|
| Tile entrance | `opacity` + `y` (transform) with `staggerChildren` | transform/opacity only — composited |
| Tile hover | `whileHover={{ scale: 1.02 }}`, `spring(300/20)` | `scale` is a transform; border-tint + glow are color/opacity (no mask repaints) |
| Progress bar | `scaleX` 0→target, `transform-origin: left` | never animates `width` (no layout) |
| Sidebar highlight | `layoutId` shared element | FLIP-based, GPU transforms |
| Skeletons | `opacity` keyframe pulse | identical box model to real tiles |

`MotionConfig reducedMotion="user"` makes all of the above respect the OS "reduce motion" setting.

---

## 🗄️ Database

`courses` table:

| column | type | notes |
|---|---|---|
| `id` | `uuid` | primary key, `gen_random_uuid()` |
| `title` | `text` | e.g. "Advanced React Patterns" |
| `progress` | `integer` | 0–100 (checked) |
| `icon_name` | `text` | a lucide icon name, e.g. "Atom" |
| `created_at` | `timestamptz` | default `now()` |

Run [`supabase/seed.sql`](./supabase/seed.sql) in the Supabase **SQL Editor**. It creates the table, enables **Row Level Security with public read-only access** (this is what makes shipping the anon key safe), and seeds 4 courses.

---

## ⚙️ Getting started

```bash
# 1. Install
npm install

# 2. Configure env (never commit the real file)
cp .env.example .env.local
#   → fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
#     from Supabase → Project Settings → API

# 3. Seed the database
#   → paste supabase/seed.sql into the Supabase SQL Editor and run it

# 4. Run
npm run dev        # http://localhost:5500
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Public anon key (safe to expose under RLS) |

Both are `NEXT_PUBLIC_*` because the anon key is designed to be public and is protected by RLS. The **`service_role` key is never used** in this project — keep it out of the repo.

---

## ☁️ Deploying to Vercel

1. Push to a public GitHub repo.
2. Import the repo in Vercel.
3. Add the two environment variables (same names as above) in **Project → Settings → Environment Variables**.
4. Deploy. The dashboard route is `force-dynamic`, so it renders per request with fresh Supabase data.

---

## 🧗 Challenges & decisions

- **Streaming a server fetch *into* a client stagger.** Course tiles need (a) server-side Supabase fetching and (b) a Framer stagger that fires the moment data arrives. Solved by fetching in `CourseSection` (server) and handing the data to `CourseList` (client), which uses `display: contents` so its `<article>`s become **direct Bento-grid children** while it still orchestrates their stagger.
- **No layout shift on the progress bar.** Animating `width` repaints/relayouts. Switched to `scaleX` with a left transform-origin so the fill is purely composited, with the percentage counting up in lockstep via a `MotionValue`.
- **Hydration-safe mock data.** The contribution graph's intensities come from a deterministic 32-bit integer hash (no `Math.random`/`Date`) so server and client markup match exactly.
- **Graceful errors at two levels.** `CourseSection` catches DB failures and renders an inline error tile (the rest of the dashboard stays alive); `app/error.tsx` backstops anything unexpected with a retry.
- **Responsive sidebar without layout thrash.** The rail is in-flow and animates its own `width`; `DashboardShell` syncs collapse state to a `matchMedia` query so tablets get icons-only and mobile swaps to a bottom nav.
- **Chasing a *buttery* 60fps.** The first pass looked great but felt choppy. Profiling surfaced three repaint hotspots: `backdrop-blur` on every tile (re-blurred each hover/scroll frame), a `mask-composite` gradient border (a CPU repaint whose cost scaled with tile size — worst on the large activity tile), and `background-attachment: fixed` (full-page repaint on scroll). Fixes: solid tile backgrounds, a hover **border-color tint + opacity glow** in place of the mask, and the ambient glow moved to a single fixed, GPU-composited `body::before` layer. The 98-cell activity graph also dropped its per-cell entrance springs in favour of one tile-level reveal. Net result: only `transform`/`opacity` animate, and nothing forces synchronous layout or paint.

---

## ✅ Requirement checklist

- [x] Next.js App Router + **Server Components** for data
- [x] Supabase via `@supabase/ssr`, env vars handled securely (`.env.example`, no secrets committed)
- [x] `loading.tsx` **and** `<Suspense>` skeletons with pulse animation
- [x] Graceful DB error handling
- [x] Bento grid, slim collapsible sidebar, hero/course/activity tiles
- [x] Semantic HTML (`nav`, `main`, `article`, `section`, `header`, `footer`) — no div soup
- [x] Framer Motion: staggered load, spring hover (`stiffness: 300, damping: 20`), `layoutId` highlight
- [x] Dynamic lucide icon from `icon_name`, animated 0→value progress bar, gradient-mesh card background
- [x] Zero layout shift (transform/opacity only)
- [x] TypeScript interfaces for Supabase payloads
- [x] Responsive: desktop / tablet (icons) / mobile (bottom nav)
