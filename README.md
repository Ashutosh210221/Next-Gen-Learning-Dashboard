# Next-Gen Learning Dashboard

This is my submission for the frontend intern challenge. It's a student dashboard that shows your courses, a daily learning streak, and an activity graph. The course data is not hardcoded — it comes from a Supabase database.

**Live site:** _add your Vercel link here_

## What I used

- Next.js 15 (App Router)
- Supabase (for the database)
- Tailwind CSS (for styling)
- Framer Motion (for the animations)
- Lucide React (for the icons)
- TypeScript

## How to run it

1. Install the packages:
   ```
   npm install
   ```

2. Make a file called `.env.local` in the main folder and put your Supabase keys in it. You can look at `.env.example` to see what goes there:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Set up the database. Open the SQL Editor in Supabase and run the code in `supabase/seed.sql`. This makes the `courses` table and adds a few demo courses.

4. Start the app:
   ```
   npm run dev
   ```
   Then open http://localhost:5500 in your browser.

## How I split the server and client parts

The main idea I followed was: **get the data on the server, do the animations on the client.**

- The pages (like the home page and the courses page) are Server Components. They get the course data from Supabase on the server side. I did it this way because it's safer (the database code never goes to the browser) and the challenge asked for Server Components.
- That data is then passed down to small client components (the files that start with `"use client"`). These handle the things that need to react to the user — the sidebar, the cards, the progress bars, and all the animations.
- I used `<Suspense>` so the page shows up straight away, and a loading skeleton appears where the courses will be until the data finishes loading.
- The sidebar is in the main layout, so it stays on screen when you move between pages and the little highlight slides over to whatever page you're on.

So in short: the server does the data, and the client does the moving parts.

## The database

There is one table called `courses`. It has these columns:

- `id` — a uuid
- `title` — the course name
- `progress` — a number from 0 to 100
- `icon_name` — which icon to show on the card
- `created_at` — the date it was added

The code to create it is in `supabase/seed.sql`. I also turned on Row Level Security and only allowed reading. That's why it's okay to use the key in the browser — people can read the courses but they can't change them.

## The animations

I used Framer Motion for all of it:

- The cards fade in one after the other when the page loads.
- When you hover a card it grows a tiny bit, using spring physics so it feels natural.
- The progress bars fill up from 0 to the real number.
- The sidebar highlight slides between the menu items using `layoutId`.

I only animated `transform` and `opacity` so the layout never jumps around while things move.

## Problems I ran into

- **It felt choppy at first.** The animations were not smooth in the beginning. I found out that some CSS was slowing it down — like the blur effect behind every card and a fancy gradient border. I removed those and used lighter effects instead, and it got a lot smoother.
- **Loading the courses with an animation.** I wanted the course cards to fade in right when they load from the database. It was a bit tricky because the data comes from the server but the animation happens on the client, so I split it into two pieces — one part fetches the data and the other part animates it.
- **The progress bar was making the page jump.** Animating the `width` caused the layout to shift, so I used `scaleX` instead, which doesn't do that.
- **Database errors.** If the database fails to load, I didn't want the whole page to break. So I show a small error message just on the courses section and the rest of the dashboard still works.

## Things I'd add if I had more time

- Real login so it shows your own data
- More live data on the other pages
- Saving the settings toggles

The theme is dark only, like the challenge asked for.
