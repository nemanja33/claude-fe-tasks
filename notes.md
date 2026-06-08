# Learning Notes

## Task 1 - Button Component

- ButtonHTMLAttributes vs HTMLAttributes — always extend the most specific type
- forwardRef — required for any reusable component that consumers may need to control or measure
- Prop spread ordering — controlled values that must not be overridden go after {...rest}
- aria-busy vs aria-hidden — aria-busy signals "wait", aria-hidden controls visibility; they serve different purposes and aren't substitutes
- sr-only pattern — visually hide content while keeping it in the accessibility tree
- BEM naming — prevents class collisions as the codebase grows
- display: inline-flex — correct default for button internals
- type="button" default — prevents accidental form submission

---

## Task 2 — Input Component

- **useId()** — React 18's solution for stable, unique IDs per component instance; essential for label association in reusable components
- **htmlFor / id pairing** — the correct programmatic way to associate labels with inputs (vs wrapping, which is less robust)
- **aria-describedby** — how to point an element at supplementary descriptive text, and that the referenced element must be in the accessibility tree (display: none breaks it, visibility: hidden doesn't)
- **aria-invalid** — signals field error state persistently, independent of whether the error message is visible
- **role="alert"** — triggers immediate screen reader announcement when content appears in the DOM
- **Template literal pitfalls** — ${false} and ${null} produce literal strings, always use ternaries with '' as the falsy branch
- **Consumer ID override pattern** — id ?? generatedId lets consumers control IDs when needed (e.g. for testing or external label association)

---

## Task 3 — Login Form

- **useReducer vs multiple useState** — use it when state fields are interdependent or transitions need to be atomic; useState sprawl creates coordination bugs
- **Discriminated unions for actions** — TypeScript narrows the payload type per action, preventing mismatched dispatches
- **Lookup table reducer** — cleaner alternative to switch, maps action types directly to handler functions
- **Validation return values over state reads** — functions should return success/failure directly rather than dispatching into state and trying to read it back (stale closure trap)
- **Stale closures in event handlers** — e.target.value is always current; state.value captured at render time may lag
- **aria-labelledby on forms** — gives the form an accessible name via an associated heading
- **aria-live="polite" + role="status"** — announces dynamic content changes to screen readers without interrupting
- **onBlur composition pattern** — reusable components should merge consumer handlers with internal ones, not replace them

---

## Task 4 — Filterable User List

### Questions & Answers

**What is the fetch-on-render problem and does your implementation have it?**
My answer: problem with showing something while fetching. Added a loading state to show until data, or error appear.
Correction: The actual problem is waterfall fetching — Component A renders → starts fetch → data arrives → renders Component B → Component B starts its own fetch. Each child's fetch can't start until its parent finishes rendering. TanStack Query and route-level loaders solve this by starting all fetches before the render tree is built.

**What is React reconciliation and why does a stable key matter more than just "avoiding the warning"?**
My answer: this should be the process of re-rendering. the key matters, as react can map each item with the key prop to its corresponding place correctly.
Correction: Right but incomplete. With index keys, filtering [A, B, C] to [A, C] makes React think item at index 1 is now C (was B) — it mutates the wrong DOM node, causes focus loss, breaks CSS transitions, and unmounts/remounts when it didn't need to. Stable IDs let React say "C is still C, just moved" and reuse the DOM node correctly.

**React.memo prevents re-renders when props don't change — but if you define a callback inside the parent component without useCallback, what happens to React.memo's guarantee?**
My answer: all memoized variables, functions need to be all the way memoized, parent, children all. If not then they will not get memoised and practically nothing is gained.
Correction: Correct idea, imprecise framing. The specific issue is: a non-memoized callback is a new function reference every render. memo does a shallow props comparison — new reference = changed prop = re-render. useCallback makes the reference stable so memo's comparison holds.

**When does useMemo for a filter actually save work, and when is it premature optimisation?**
My answer: it is useful if I have unrelated state to this component and I don't want that to rerender.
Correction: Correct. Worth adding: for 10 users, even without memoization the filter is microseconds. useMemo has its own overhead (dep array allocation and comparison). At small scale it's premature — it earns its cost only with large lists or expensive transforms.

### Concepts Covered

- **Custom hook composition** — useFetch<T> as a generic primitive, useGetUsers as a domain-specific wrapper; each layer has a single responsibility
- **Generic hooks with TypeScript** — <T,> syntax for generic function components, letting the caller decide the shape of the response
- **Async inside useEffect** — define the async function inside the effect, call it immediately; avoids the useCallback indirection and the infinite loop footgun
- **React.memo** — prevents re-renders when props are shallowly equal; only useful when the component actually re-renders unnecessarily
- **useCallback** — stabilises function references so memo prop comparisons hold; without it, memo sees a "new" function every render and re-renders anyway
- **useMemo placement** — hooks cannot be called after early returns; memoised values must be computed unconditionally at the top of the component
- **Stable keys and reconciliation** — keys let React identify DOM nodes across renders; index keys cause React to reuse the wrong nodes when lists reorder or filter
- **Fetch-on-render waterfalls** — the real problem is sequential fetches blocked by render phases, not loading states; this is what route-level loaders and TanStack Query solve
- **aria-live on dynamic filter results** — screen readers don't announce list changes automatically; an aria-live region bridges that gap


## Task 5 — TanStack Query + User Detail

### Questions & Answers

**How does useQuery replace the useEffect + useState pattern?**
My answer: useQuery just needs the promise, and it handles the rest.
Correction: Correct at a surface level. More precisely: useFetch had useState for apiData and fetchState, plus a useEffect to trigger the fetch. useQuery eliminates all of that — it manages its own internal state (loading, error, data) and gives you those values directly. It also adds caching, background refetching, and deduplication that the custom hook didn't have.

**What is a query key and why is ['posts', userId] better than ['posts']?**
My answer: it's used for caching the data. with an id it knows which data to not fetch again exactly.
Correction: Correct. If all users shared ['posts'] as the key, fetching user 2's posts would overwrite user 1's cached posts. With ['posts', userId], each user's posts are cached independently.

**How do you tell useQuery to only run when a condition is met?**
My answer: with refetch.
Correction: Wrong. The answer is enabled: !!condition. When the condition becomes true, TanStack Query runs the query automatically. refetch bypasses the cache and is for manual re-fetching of already-fetched data.

**Where did the fetch-on-render waterfall still exist, and how does TanStack Query change that?**
My answer: still uncertain. TanStack Query prefetches everything and removes the waterfall.
Correction: TanStack Query does not automatically prefetch everything — prefetchQuery exists but must be called explicitly. The waterfall still exists here: posts only fetch after a user is clicked, after users are rendered. That's intentional. What TanStack Query prevents is the accidental waterfall: the same data being fetched multiple times by different components simultaneously (deduplication) and unnecessary re-fetches on re-mount (cache hits).

### Concepts Covered

- **useQuery vs useEffect + useState** — TanStack Query replaces manual fetch orchestration, giving data, isLoading, and error out of the box, plus caching, deduplication, and background refetching for free
- **Query keys** — the cache identity for a query; ['post', id] gives each user's posts their own cache slot, ['post'] would overwrite with every new fetch
- **enabled for dependent queries** — declarative conditional fetching; the query runs automatically when the condition becomes true, no manual refetch needed
- **as const on query keys** — gives TypeScript precise tuple types instead of (string | number)[]
- **refetch vs enabled** — refetch bypasses the cache and is for manual refresh; enabled is for conditional execution
- **Passing props selectively to memoised components** — passing a changing object to all items defeats React.memo; only pass what each item actually needs
- **CORS is server-side** — Access-Control-Allow-Origin is a response header the server sets; adding it to client requests does nothing
- **Hooks must be unconditional** — early returns before useQuery are a hooks violation; use enabled instead
- **Lifting state minimally** — state only needs to live at the lowest common ancestor of all components that need it; one level up is usually enough

---

## Task 6 — Code Splitting & Lazy Loading

### Questions & Answers

**What is the difference between import Input from './input' and const Input = React.lazy(() => import('./input'))?**
My answer: lazy returns a promise which shows the content only when it's done processing it. So the final bundle is smaller with lazy and we have another response loading afterwards.
Correction: Partially right. The total JavaScript downloaded is the same either way — lazy doesn't remove code. What changes is when it downloads. Static import = included in the main bundle, arrives on first load. Lazy = separate chunk file, downloads only when that route is first visited. The main bundle is smaller so initial parse and execute is faster, and unused routes are never downloaded if the user never visits them.

**What makes a good fallback vs a bad one?**
My answer: a good fallback would be a skeleton which shows what the UI will look like.
Correct. Bad fallbacks: a generic spinner (causes layout shift), or null (blank screen). Skeletons preserve layout and reduce perceived load time.

**What happens if a lazy import fails? How do you handle that?**
My answer: ErrorBoundary — used react-error-boundary package.
Correct. When a lazy chunk fails to load, React throws an error that an Error Boundary catches. react-error-boundary is the standard library for this.

**Network tab: what do you see on / vs /login?**
My answer: separate chunk files are loaded per route, only when navigating to that route.
Correct. Each chunk loads on first navigation to its route. If you never visit /login, that JavaScript never downloads.

### Concepts Covered

- **Static import vs dynamic import** — static puts code in the main bundle (loads immediately); dynamic splits it into a separate chunk (loads on demand); total code is the same, but when it downloads changes
- **React.lazy** — wraps a dynamic import so React can render the component once the chunk resolves
- **Suspense** — catches the loading state from lazy components and renders the fallback until the chunk is ready
- **Skeleton fallbacks** — meaningful fallbacks preserve layout and reduce perceived load time vs a spinner or blank screen
- **react-error-boundary** — lazy imports can fail (chunk 404, network error); Error Boundaries catch the thrown error and show a fallback instead of crashing the tree
- **Route-level code splitting** — the natural split boundary; each route is its own chunk, loaded on demand
- **Main bundle vs chunks** — shared UI (nav, providers) stays in the main bundle; page-level components go into chunks
- **Navigation from routes config** — single source of truth; adding a route automatically adds a nav item

---

## Task 8 — Redux Toolkit: Global State Management

### Questions & Answers

**What is a slice in Redux Toolkit and what does it replace from plain Redux?**
My answer: a slice handles just one state of the store. Haven't worked in plain Redux.
Correction: Correct on what it is. Plain Redux context: before RTK you'd write separate action type constants, action creator functions, and a reducer with a switch statement — all manually. A slice replaces all three with one createSlice call. RTK also wraps Immer so you can write state.favs.push(x) instead of returning a new array.

**What is the difference between useSelector and useDispatch?**
My answer: useSelector gives the state we need, useDispatch dispatches actions that change state.
Correct.

**Why is useAppSelector / useAppDispatch preferred over the plain hooks?**
My answer: creates a pre-typed version of them.
Correct. Specifically: plain useSelector gives you unknown state unless you cast it every time. useAppSelector knows the full RootState shape so you get autocomplete and type safety on every selector without manual casting.

**TanStack Query manages the users list, Redux manages favourites — how do you combine both?**
My answer: saved favourite users as string[]. Should I save IDs and get user data on the favourites page?
Correction: Yes — store IDs (number[]), not full objects. User data lives in TanStack Query's cache. On the favourites page: get users from TanStack Query, filter by IDs from Redux. Single source of truth for each concern, no duplication.

### Concepts Covered

- **Redux Toolkit slice** — replaces plain Redux's manual action types, action creators, and switch-case reducers with a single createSlice call; Immer is built in so you can mutate state directly
- **configureStore + combineSlices** — modern RTK store setup
- **PayloadAction<T>** — correctly types the action payload in reducers
- **Typed hooks** — useAppSelector/useAppDispatch with .withTypes<>() give full type inference without casting on every use
- **RootState / AppDispatch** — derived from the store, not manually maintained
- **createSelector** — memoised derived state; only recomputes when inputs change; the right tool for filtering/transforming Redux state
- **IDs not objects in Redux** — store minimal identifiers; let TanStack Query own the full data; combine at the component level
- **Server state vs client state** — TanStack Query owns remote data, Redux owns shared client state; they solve different problems and compose cleanly
- **Dynamic aria-label on toggle buttons** — label must reflect current state, not just the default action

---

## Task 9 — Web Vitals & Performance Profiling

### Findings

- Lighthouse performance: 99 (dev) → 100 (prod after cleanup)
- Accessibility: 98 → 100 (added `<main>` landmark and skip link)
- Slowest render in Profiler: UserItem (Memo) key="7" at 0.7ms
- Filter input rerenders are necessary — all items must update on search
- Accordion expansion caused the whole list to rerender — fixed by moving `useGetPosts` inside `UserItem` with local boolean state

### Improvements Made

- Moved `useGetPosts` inside `UserItem` — eliminates whole-list rerender when one accordion opens; users don't wait for post data to load
- Ran `knip` — removed 3 unused files, 4 unused testing dependencies, 1 unused export, 1 unused type

### Core Web Vitals

- **LCP (Largest Contentful Paint)** — time until the largest visible element finishes loading
- **CLS (Cumulative Layout Shift)** — measures unexpected layout movement after initial load; reason to always set dimensions on images
- **INP (Interaction to Next Paint)** — time from user interaction to the next visual response; replaced FID which only measured the first interaction; INP measures all interactions and takes the worst-case percentile
- **TTFB (Time to First Byte)** — time until the first byte arrives from the server; separate from Core Web Vitals but affects all of them

### Profiler Concepts

- **Commit duration** — time for React to write the reconciled changes to the real DOM, including running effects and updating refs; long commit = janky interactions
- **Paint vs Layout** — Layout calculates exact element positions; Paint converts that to pixels on screen; layout changes are more expensive because they invalidate downstream paint and composite steps

### Tree Shaking

- Process of removing unused exports from the final bundle at build time
- Only works with ES modules (`import`/`export`) — statically analysable at build time
- CommonJS (`require()`) cannot be tree-shaken — runtime call, bundler can't trace it
- `"sideEffects": false` in `package.json` signals the bundler the package is safe to tree-shake aggressively
- Import specific functions, not whole libraries: `import debounce from 'lodash/debounce'` not `import _ from 'lodash'`

### TTFB Improvements

- Mostly server-side but frontend/infrastructure decisions matter
- **CDN** — serve static assets from a node geographically close to the user; biggest win for static sites
- **HTTP caching headers** — `Cache-Control` tells browser/CDN how long to cache; browser cache hit = TTFB of zero
- **Next.js static generation (SSG)** — pre-built HTML served from CDN instantly, no server computation per request
- **HTTP/2 and HTTP/3** — multiplexing reduces connection overhead; handled automatically by modern CDNs
- React SPA: put it on Vercel/Netlify/Cloudflare Pages for near-zero TTFB on static assets
- Next.js: use static rendering by default, SSR only where per-request fresh data is needed

---

## Task 10 — Frontend Security

### Findings

- Unsanitised `<img src=x onerror="alert('XSS')">` submitted through a form executes immediately via `dangerouslySetInnerHTML` — proves any unsanitised user input rendered as HTML is an XSS vector
- After wrapping output in `SanitizeHTML` (a `DOMPurify.sanitize()` component with a configurable `ALLOWED_TAGS`/`ALLOWED_ATTR` allow-list), the same payload renders as inert text — no execution, no meaning
- `REACT_APP_PUBLIC_KEY` is visible in the production bundle — by design, since `REACT_APP_` prefixed vars are meant to be exposed to the client; anything secret must never use that prefix

### Improvements Made

- Built `SanitizeHTML` — a reusable wrapper that merges per-instance `Config` options over a sensible default allow-list (`span`, `p`, `strong`, `a` / `href`)
- `userSlice.addNote` uses an RTK `prepare` callback to generate a stable `nanoid()` id at dispatch time, so the reducer always receives a fully-formed `{ id, content }` — fixed an initial `key={idx}` regression by storing real ids instead of deriving keys from array position
- Switched `SanitizeHTML`'s wrapper element from `<span>` to `<div>` so block-level allowed tags (e.g. `<p>`) don't produce invalid nested-block-in-inline markup

### XSS & Sanitisation

- **XSS (cross-site scripting)** — injecting malicious script into a site so it executes in another user's browser with that user's privileges (cookies, session, DOM access)
- **`dangerouslySetInnerHTML`** — bypasses React's automatic escaping and injects raw HTML; safe only when the HTML is fully trusted or sanitised first
- **What `DOMPurify.sanitize()` actually does** — not a string conversion. It parses the input into a DOM tree, walks every node, strips any tag/attribute/protocol not on the allow-list (including `javascript:` URIs and event handlers like `onerror`), then serialises the cleaned tree back to a safe HTML string
- **Allow-list vs deny-list** — specify what's permitted (`ALLOWED_TAGS`/`ALLOWED_ATTR`) rather than trying to enumerate everything dangerous; far harder to bypass with obfuscation

### Auth Token Storage

- **`localStorage`** — readable by any JS running on the page; a single missed XSS vector anywhere in the app exposes the token. Sanitisation reduces XSS surface but does not eliminate it, so it's not a substitute for safe storage
- **`httpOnly` cookies** — inaccessible to JS entirely (`document.cookie` can't read them); the browser attaches them to requests automatically. This is the correct place for auth tokens regardless of how well the rest of the app sanitises input
- General storage tradeoffs: `localStorage` for low-stakes UI state (themes, open/closed panels), `sessionStorage` for transient per-tab state, `httpOnly` cookies for anything identity- or auth-related

### Environment Variables

- `REACT_APP_` prefix in Create React App is a deliberate, verbose marker — anything with that prefix gets inlined into the client bundle at build time and is publicly visible
- Anything that must stay secret (API secrets, private keys) must never use the prefix and must live server-side only