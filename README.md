# Portfolio, AI and Full-Stack Engineer

Single-page portfolio built with **Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Motion**.

One locked dark theme. The design reads as instrumentation: a cool near-black
surface, hairlines and alignment instead of cards and shadows, a single azure
accent, tabular numerals everywhere, and a 4px radius on everything. A light
variant would be a different site rather than a variant of this one, so there is
no theme toggle.

## Make it yours

Everything visible comes from **`lib/data.ts`**: profile, availability, about
copy, facts, projects, stack, experience, and the contact heading. Edit that one
file.

Anything still reading `TODO` in there is waiting on you and is meant to be
obvious rather than shipped. Two things to know:

- **`projects`** contains four real projects and, below a marked comment block,
  three invented ones written to fill the page. Build one and keep the entry, or
  delete them. An interviewer will ask about anything left there.
- **`experience`** has real companies and roles with placeholder dates and
  achievements.

Then replace `public/hassan-ali-resume.pdf`, set `profile.socials.github` to a
real URL, and point `profile.socials.website` at your domain, which feeds the SEO
metadata and JSON-LD.

To add a portrait, drop the file in `/public` and set `about.photo`. While it is
`null` the About section renders an initials plate, so the layout is complete
either way.

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (static prerender)
npm run start    # serve the production build
npm run lint
```

## The contact form

The form is real. It posts to a server action, validates on the server, and sends
through [Resend](https://resend.com)'s REST API. There is no SDK dependency: the
action calls the HTTP endpoint directly.

Copy `.env.example` to `.env.local` and set:

| Variable | Required | What it is |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | From <https://resend.com/api-keys> |
| `CONTACT_FROM_EMAIL` | yes | Sender, on a domain verified with Resend. A personal Gmail will not work. |
| `CONTACT_TO_EMAIL` | no | Where messages land. Defaults to `profile.email`. |

**Until both required values are set, the form does not pretend to send.** It
validates, then tells the visitor the service is not connected and offers the
direct email address. A contact surface that silently drops messages is worse
than no form, so there is no path through this code that shows success for a
message that went nowhere.

Also in place:

- Server-side validation, with the typed values echoed back so a rejected
  submission loses nothing.
- A `display:none` honeypot field. Anything in it is automated and gets a plain
  success response. There is deliberately **no** submission-speed check, because a
  fast human would trip it and discarding a real message is the one failure this
  form is not allowed to have.
- `reply_to` set to the sender's address, so replying from your inbox answers
  them rather than the verified sending domain.
- Rate limiting at 5 messages per hour per address. It is an in-process `Map`, so
  it does not survive a cold start and serverless runs more than one instance.
  Move it to Upstash Redis or Vercel KV if the form attracts real traffic.

## Structure

```
app/
  layout.tsx           Fonts, SEO metadata, JSON-LD, skip link, nav and footer
  page.tsx             Section composition
  globals.css          Design tokens, typography, surfaces, motion, layout
  actions/contact.ts   Server action: validate, rate limit, send
components/
  layout/              Nav, Footer
  providers/           Lenis smooth scroll
  sections/            Hero, Facts, About, Work, Stack, Experience, Contact
  ui/                  Button, BrandChip, Reveal, Counter, ContactForm,
                       CodeCompare, ProjectCover, Sparkline
  tech-icons.tsx       Brand mark and label registry, keyed by data slug
lib/
  data.ts              All content
  contact.ts           Shared contact types, limits, and validator
```

Seven sections, seven layout families: split hero, facts strip, portrait plus
prose, featured case with a card grid, tile grid, rail timeline, and a closing
header over a form.

## Design notes

- **Contrast is solved, not eyeballed.** The token comments in `globals.css`
  record the measured ratios. `--muted` carries small text and clears 4.5:1 on the
  lightest surface it sits on. `--faint` is for non-text UI only, where the 1.4.11
  threshold is 3:1, which is why form field borders use it: a 0.07 alpha hairline
  measures about 1.3:1 against a panel and would fail on a control.
- **No invented metrics.** There are no percentages on this site. The facts strip
  carries counts and durations only, and every one is checkable.
- **Ambient motion.** Three loops, all pure CSS on fixed or absolute
  `pointer-events-none` layers, all transform and opacity only, so no frame costs
  layout or paint. `components/ui/ambient.tsx` holds two accent blooms drifting on
  mismatched 41s and 53s periods, which light every section from the layout level
  rather than each section carrying its own glow. The hero adds a rule grid
  creeping up exactly one 72px tile, so the loop is seamless, and one line
  measuring down the plane. All of it stops under `prefers-reduced-motion`, and
  the scan line is removed rather than frozen, since held still it is just a
  stray rule.
- **Accessibility**: semantic landmarks, a skip link, labels above inputs and
  errors below them, `aria-invalid` and `aria-describedby` wired on every field,
  visible focus rings, and `prefers-reduced-motion` honored in every animation.
- **Performance**: static prerender, `next/font`, no per-frame scroll listeners,
  animation limited to `transform` and `opacity`.
- **Icons**: [Phosphor](https://phosphoricons.com) for UI,
  [Simple Icons](https://simpleicons.org) via `react-icons` for brand marks. Some
  entries have no mark, including BullMQ, RAG, and agents, and render as
  label-only chips rather than being dropped from the list.
