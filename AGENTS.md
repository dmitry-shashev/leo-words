# AGENTS.md

Codex should use this file as the repo-specific working guide for `leo-words`.

## About

A Next.js 14 app for fast repetition of vocabulary from Lingualeo. Words are fetched from the Lingualeo API and stored locally in `auto-generated/words.json`. The UI presents flashcard-style word cards and several focused practice routes.

## Package Manager

- Use `pnpm` only.
- Required versions:
- `node >= 24.12.0`
- `pnpm >= 10.26.2`

## Common Commands

- `pnpm dev` — start the dev server on `localhost:3000`
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm tsc` — TypeScript type-check without emit
- `pnpm test` — Vitest in watch mode
- `pnpm test:ci` — Vitest once
- `pnpm test:update` — update snapshots
- `pnpm e2e` — Playwright UI mode
- `pnpm e2e:ci` — headless Playwright
- `pnpm prettier-format` — format all files
- `pnpm generate-words` — fetch Lingualeo words into `auto-generated/words.json`
- `pnpm sync` — generate words and extra images

## Important Routes

- `/` — main word card view
- `/last/20` — last 20 words
- `/last/1w` — words from the last week
- `/offsetlimit/0/2000` — offset/limit slice
- `/all` — all words list
- `/irregular` — irregular verbs practice
- `/verbs-to-ing` — gerund practice
- `/useful` — useful content page
- `/debug` — debug view

## Architecture Notes

1. `auto-generated/words.json` is the source of truth for generated word data.
2. `components/complex/App/App.tsx` loads words, applies route-based slicing, and dispatches them into Redux.
3. Redux state is persisted with `redux-persist` into `localStorage`.
4. `app/StoreProvider.tsx` handles cache busting when the app version or URL changes.

## Store Layout

- `store/wordsSlice` manages flashcard flow, wrong answers, and retry cycling.
- `store/settingsSlice` manages language direction, speed mode, and sound settings.
- `store/irregularWordsSlice` manages irregular verb practice state.

## Conventions

- Use the `@/` path alias from the project root.
- Match the repo formatting style: single quotes, no semicolons, 2-space indent, trailing commas where applicable.
- Tests use Vitest, Testing Library, and jsdom.
- Scripts are run with `tsx`.

## Pre-commit Behavior

`.husky/pre-commit` will:

1. bump the patch version in `package.json`
2. run `lint-staged`
3. stage changes
4. run `tsc`

Be careful with automatic version bumps when preparing commits.

## Working Preference For Codex

- Prefer minimal, targeted changes that preserve existing app behavior.
- Run focused verification for the area you changed, then broaden if needed.
- Do not switch package managers.
- Do not regenerate `auto-generated/words.json` unless the task requires fresh word data and credentials are available.
