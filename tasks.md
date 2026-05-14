# Frontend Learning Tasks

---

## Task 1 — Reusable Button Component

Build a reusable `Button` component in React + TypeScript.

**Requirements:**
- `variant` prop: `"primary"` | `"secondary"` | `"ghost"`
- `size` prop: `"sm"` | `"md"` | `"lg"`
- `isLoading` boolean — shows loading indicator, prevents interaction
- Forwards native `<button>` HTML attributes
- Disabled state visually distinct

**Accessibility:**
- Fully keyboard navigable
- Loading state communicated to screen readers
- WCAG AA contrast on disabled state

**TypeScript:**
- Strictly typed, no `any`
- Extend native button props without redeclaring them

**Concepts covered:**
`ButtonHTMLAttributes`, `forwardRef`, `aria-busy`, `aria-hidden`, `sr-only` pattern, BEM naming, `display: inline-flex`, `type="button"` default, prop spread ordering

---

## Task 2 — Input Field Component

Build a reusable `Input` component in React + TypeScript.

**Requirements:**
- `label` prop — required, programmatically associated with the input
- `error` prop — optional error message shown below input
- `hint` prop — optional helper text shown on focus/hover
- Forwards all native `<input>` attributes
- Supports controlled and uncontrolled usage

**Accessibility:**
- Label programmatically associated with input
- Error announced by screen readers via `aria-describedby`
- Error indicated beyond color alone (WCAG 1.4.1)

**TypeScript:**
- `label` required, `error` and `hint` optional
- No `any`

**Concepts covered:**
`InputHTMLAttributes`, `useId`, `htmlFor`/`id` pairing, `aria-describedby`, `aria-invalid`, `role="alert"`, `visibility: hidden` vs `display: none`, template literal pitfalls, consumer `id` override pattern, `onBlur` composition

---

## Task 3 — Login Form

Build a login form using the `Button` and `Input` components.

**Requirements:**
- Fields: email and password
- Validate on blur and on submit
- Show field-level errors
- Submit button shows loading state during submission
- Show success message after submit
- Simulate async submit with 1.5s delay
- Manage all form state with a single `useReducer`

**Accessibility:**
- Form has a descriptive heading associated via `aria-labelledby`
- On failed validation, focus moves to the first invalid field

**TypeScript:**
- Discriminated union for actions
- `FormStatus` union type instead of booleans: `'idle' | 'loading' | 'success'`
- No `any`

**Concepts covered:**
`useReducer` vs multiple `useState`, discriminated unions, lookup table reducer, validation return values over state reads, stale closures in event handlers, `aria-labelledby`, `aria-live="polite"` + `role="status"`, atomic state transitions, union types over boolean flags

---

## Task 4 — Filterable User List

Build a component that fetches and displays a list of users with client-side filtering.

**Data source:** `https://jsonplaceholder.typicode.com/users`

**Requirements:**
- Fetch users on mount with `useEffect` + native `fetch`
- Display name, email, company name per user
- Text input filters list by name in real time
- Handle loading and error states
- Use existing `Input` component for the filter

**Performance:**
- Each user card wrapped in `React.memo`
- Filter function wrapped in `useMemo`
- Filter input callback wrapped in `useCallback`
- Stable, meaningful `key` — not array index

**TypeScript:**
- API response strictly typed
- Loading/error/data modelled as a status union

**Concepts covered:**
Custom hook composition, generic hooks with TypeScript, async inside `useEffect`, `React.memo`, `useCallback`, `useMemo` placement (before early returns), stable keys and reconciliation, fetch-on-render waterfalls, `aria-live` on dynamic results

---

## Task 5 — TanStack Query Refactor + User Detail

Refactor data fetching to TanStack Query and add a user detail panel.

**Part 1 — Refactor:**
- Install `@tanstack/react-query`
- Set up `QueryClient` and `QueryClientProvider` at app root
- Rewrite `useGetUsers` using `useQuery`
- Remove the custom `useFetch` hook
- Set `staleTime` of 60 seconds

**Part 2 — User detail:**
- Click a user name → fetch their posts from `https://jsonplaceholder.typicode.com/posts?userId={id}`
- Display post titles in a detail panel
- Posts query only runs after a user is selected (`enabled: !!selectedUserId`)
- Clicking the same user twice must not trigger a second network request (cache hit)
- Show loading state while posts are fetching

**TypeScript:**
- `Post` type strictly defined
- Query keys as `const` tuples

**Concepts covered:**
`useQuery`, `QueryClient`, `QueryClientProvider`, `staleTime`, query keys and cache identity, dependent queries with `enabled`, TanStack Query cache hits, `refetch` vs `enabled` distinction, CORS headers (server-side only), declarative vs imperative data fetching

---

## Task 6 — Code Splitting & Lazy Loading

Add routing and implement route-level code splitting.

**Setup:**
- Install React Router
- Create two routes: `/` (user list) and `/login` (login form)

**Requirements:**
- Both page-level components lazily loaded with `React.lazy` and dynamic `import()`
- Wrap lazy routes in `Suspense` with a meaningful skeleton fallback
- Simple nav with links between routes
- Nav and shared UI in the main bundle — not lazy

**TypeScript:**
- Route definitions typed
- No `any`

**Concepts covered:**
Static import vs dynamic import, `React.lazy`, `Suspense`, skeleton fallbacks, `react-error-boundary` for failed chunk loads, route-level code splitting, main bundle vs chunks, navigation derived from routes config
