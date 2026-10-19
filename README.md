# Hassan Sarfraz: cinematic client-hunting portfolio

Next.js 16 + Tailwind 3. Motion stack: **GSAP + ScrollTrigger** (pinned horizontal reel, scrubbed text, marquee),
**Three.js** (scroll-reactive 3D sculpture + dust), **anime.js** (preloader counter, service cards, icon drawing, stat counters),
**Lenis** (smooth scroll).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit your content (one file)

Everything a client reads lives in `src/lib/site.ts`: contact details, services, process, FAQ, stats, and the client work list.
The FAQ there also feeds the FAQ structured data for Google.

## Turn on lead capture (important)

The enquiry form works out of the box by opening the visitor's email app with the details pre-filled. For a smoother experience:

1. Create a free form at https://formspree.io and copy its endpoint URL.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORM_ENDPOINT`.
3. Redeploy. Enquiries now land straight in your inbox. (`formspree.io` is already allowed in the CSP in `next.config.ts`.)

Add your WhatsApp number in `site.ts` (`whatsapp: "923001234567"`) to show a WhatsApp button in the contact section.

## Project structure

- `src/components/cinema/`: all new sections and effects (`CinemaApp.tsx` composes them)
- `src/components/cinema/WebGLScene.tsx`: the Three.js scene; `KEYS` controls where the sculpture sits per section
- `src/lib/site.ts`: content and config
- `src/lib/motion.ts`: shared scroll-velocity / pointer state

Accessibility and performance: honours `prefers-reduced-motion` (no smooth scroll, no pin, static 3D frame), falls back
to a stacked layout on screens under 900px, caps pixel ratio and lowers it automatically on slow GPUs, pauses rendering
when the tab is hidden.

## Legacy code

`src/components/sections`, `src/components/layout` and `src/components/ui` are from the previous design and are no longer used.
They are left in place so nothing breaks; you can delete them once you're happy with the new site.
The old Mux video player (`hls.js`) and `@react-three/*` packages were removed because the new site uses plain Three.js.
The old Mux video player (`hls.js`) and `@react-three/*` packages were removed: the new site uses plain Three.js, and `@react-three/fiber` blocked upgrading React past 19.2.
