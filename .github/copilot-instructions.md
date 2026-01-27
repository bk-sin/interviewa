# InterviewA - AI Coding Agent Instructions

## Project Overview

**InterviewA** is a technical interview practice mobile app built with React Native, Expo Router v6, and TypeScript. Users can practice interviews with AI, get feedback, track progress, and improve their technical skills with a modern dark UI.

## Architecture & Stack

- **Framework**: Expo SDK 54 with React Native 0.81.5, React 19.1.0
- **Navigation**: Expo Router v6 (file-based routing) with typed routes enabled, centralized in `src/lib/navigation/`
- **State Management**: TanStack Query (@tanstack/react-query) for server state, Zustand for client state
- **Authentication**: Clerk (@clerk/clerk-expo) for user auth with 2FA support
- **Storage**: expo-secure-store for sensitive data persistence
- **Styling**: StyleSheet API (no styled-components) with centralized theme tokens
- **Icons**: @expo/vector-icons for all icons
- **Forms**: react-hook-form + zod for validation
- **Voice**: expo-speech-recognition for voice-based interviews

## 🎯 Architecture Philosophy: Vertical Slicing (Screaming Architecture)

**CRITICAL: This project uses VERTICAL SLICING by feature, NOT horizontal layering.**

### Core Principle: Features Are Self-Contained

Each feature in `src/features/<feature-name>/` should be:

- ✅ **Self-contained**: Everything the feature needs lives inside its folder
- ✅ **Screaming**: The folder name tells you what the feature does (interview, auth, profile)
- ✅ **Cohesive**: Related code is co-located (screens, hooks, components, types, services)
- ✅ **Minimal shared**: Only move to `src/shared/` when truly reused across 3+ features

### ❌ WRONG (Horizontal Layering):

```
src/
  ├─ screens/          # ❌ All screens mixed together
  ├─ components/       # ❌ All components mixed together
  ├─ hooks/            # ❌ All hooks mixed together
  └─ types/            # ❌ All types mixed together
```

### ✅ CORRECT (Vertical Slicing):

```
src/features/
  ├─ interview/        # ✅ Everything for interview feature
  │   ├─ screens/
  │   ├─ components/
  │   ├─ hooks/
  │   ├─ types/
  │   ├─ services/
  │   └─ __mocks__/
  ├─ auth/             # ✅ Everything for auth feature
  │   ├─ screens/
  │   ├─ components/
  │   └─ hooks/
  └─ profile/          # ✅ Everything for profile feature
      └─ screens/
```

### Decision Tree: Where Does This Code Go?

**When creating ANY new code, ask yourself:**

1. **Is it used by only ONE feature?**
   → ✅ Put it in `src/features/<feature>/`

2. **Is it a base UI primitive (Button, Input, Badge)?**
   → ✅ Put it in `src/shared/ui/`

3. **Is it used by 3+ features?**
   → ✅ Put it in `src/shared/components/` or `src/shared/` (rare)

4. **Is it a cross-cutting concern (navigation, theme, config)?**
   → ✅ Put it in `src/lib/` or `src/config/`

**Default answer: Put it in the feature folder.** Move to shared only when proven necessary.

## File Structure Patterns

**REMEMBER: Features first, shared second. Vertical slicing over horizontal layering.**

- **Routing**: `app/` directory uses Expo Router conventions
  - `app/_layout.tsx` - Root provider setup (QueryClientProvider, ClerkProvider, fonts, splash screen)
  - `app/(tabs)/` - Bottom tab navigator with index/practices/history/profile
  - `app/(auth)/` - Auth flow screens (sign-in, sign-up, verify-email, verify-2fa)
  - `app/interview/` - Interview session screens (config, session, feedback, report)
  - **Each route file re-exports from its feature**: `export { default } from "@/src/features/interview"`

- **Features** (PRIMARY LOCATION FOR NEW CODE): `src/features/<feature-name>/`
  - **VERTICAL SLICES**: Each feature is self-contained with ALL its code
  - Feature structure: `screens/`, `components/`, `hooks/`, `types/`, `services/`, `utils/`, `config/`, `__mocks__/`
  - **Navigation helpers go in `utils/navigation.ts`** inside each feature
  - **Feature configs go in `config/`** inside each feature
  - **Only create subfolders you actually need** - no empty placeholders
  - Examples:
    - `src/features/interview/` - Everything for interview flow (navigation, config, hooks, routes)
    - `src/features/auth/` - Everything for authentication (navigation, config, hooks, routes)
    - `src/features/profile/` - Everything for user profile
    - `src/features/history/` - Everything for interview history
- **Shared Components** (ONLY when used by 3+ features): `src/shared/`
  - `ui/` - Base UI primitives (Button, TextInput, Badge, ProgressBar, FormInput)
  - `components/` - Domain components (ThemedText, ThemedView, ParallaxScrollView)
  - `utils/` - Generic utilities (useNavigation for tabs/back navigation)
  - **Rule**: Move here only when component is proven to be reused across multiple features
- **Libraries & Utilities**: `src/lib/`
  - `navigation/` - **ONLY shared route constants (TAB_ROUTES, ONBOARDING_ROUTE)** - Feature routes live in features
  - `api/` - API client configuration
  - `assets/` - Asset loader utilities
- **Configuration**: `src/config/`
  - **ONLY cross-feature configs** (onboarding.config, reactotron.config)
  - Feature configs live in features: `src/features/<feature>/config/`
- **State Management**:
  - `src/queries/` - **ONLY** TanStack Query client configuration
  - Query hooks live in features: `src/features/<feature>/hooks/use-*.query.ts`
  - `src/store/` - Zustand stores for client state (UI state, preferences)
- **Data Layer**: `src/data/` with Repository pattern
  - `repositories/` - Data interfaces (interview.repository, auth.repository)
  - `providers/` - Implementations (mock.provider, firebase.provider, api.provider)
- **Theme**: `src/theme/` exports colors, spacing, typography, shadows, layout
  - All styling MUST reference theme tokens, never hardcoded values
- **Path Alias**: Use `@/*` for all root-level imports (configured in tsconfig.json)

## Critical Conventions

### 🎯 Vertical Slicing: Where Does My Code Go?

**BEFORE creating ANY file, use this decision tree:**

```
New code needed?
├─ Is it specific to ONE feature? (e.g., InterviewCard, useInterviewLogic)
│  └─ ✅ PUT IN: src/features/<feature>/<type>/
│      Examples:
│      - src/features/interview/components/question-card.tsx
│      - src/features/interview/hooks/use-session-logic.ts
│      - src/features/interview/types/index.ts
│      - src/features/interview/services/interview.service.ts
│
├─ Is it a BASE UI primitive? (Button, Input, Badge, etc.)
│  └─ ✅ PUT IN: src/shared/ui/
│      Examples:
│      - src/shared/ui/button.tsx
│      - src/shared/ui/text-input.tsx
│
├─ Is it used by 3+ features? (proven reuse, not speculation)
│  └─ ✅ PUT IN: src/shared/components/
│      Examples:
│      - src/shared/components/themed-text.tsx (used everywhere)
│      - src/shared/components/loading-spinner.tsx (used in many features)
│
├─ Is it cross-cutting? (navigation, theme, config)
│  └─ ✅ PUT IN: src/lib/ or src/config/
│      Examples:
│      - src/lib/navigation/routes.ts (only TAB_ROUTES, ONBOARDING_ROUTE)
│      - src/config/onboarding.config.ts (cross-feature onboarding)
│      - Feature-specific: src/features/interview/config/interview.config.ts
│      - Feature-specific: src/features/auth/config/auth.config.ts
│
└─ ❌ WHEN IN DOUBT: Put it in the feature folder. Move later if needed.
```

### Typings: Feature-local first, shared second

- **Feature-specific types go in `src/features/<feature>/types/`** (DEFAULT)
  - Example: `src/features/interview/types/session.types.ts`
  - Export from feature barrel: `export * from "./types"`
- **Cross-feature/shared types go in `src/types/`** (ONLY if truly shared across 3+ features)
  - Example: `src/types/common.types.ts` for User, ApiResponse, etc.
- ❌ **NEVER** define exported domain types inline inside screens/components
- ✅ **ALWAYS** import types from `@/src/features/<feature>/types` or `@/src/types`

**Example (CORRECT):**

```typescript
// src/features/interview/types/index.ts
export interface InterviewSession {
  id: string;
  questions: Question[];
}

// src/features/interview/hooks/use-session-logic.ts
import { InterviewSession } from "../types"; // ✅ Feature-local type
```

### Mock data: Feature-local first, shared second

- **Feature-specific mocks go in `src/features/<feature>/__mocks__/`** (DEFAULT)
  - Example: `src/features/interview/__mocks__/sessions.mock.ts`
  - Used only by that feature's components/tests
- **Shared mocks go in `__mocks__/`** at root (ONLY if truly shared)
  - Example: `__mocks__/data.mock.ts` for cross-feature test data
- ❌ **NEVER** embed large mock arrays/objects inline inside screens/components
- ✅ **ALWAYS** import from `__mocks__/` directories
- ⚠️ **NOTE**: App runtime code should use data layer (repositories/providers), not mocks directly

**Example (CORRECT):**

```typescript
// src/features/interview/__mocks__/questions.mock.ts
export const mockQuestions = [
  { id: "1", text: "Tell me about yourself" },
  // ...
];

// src/features/interview/screens/session-screen.tsx
// In development/tests only:
import { mockQuestions } from "../__mocks__/questions.mock";
```

### Styling Requirements

1. **Theme tokens only**: Always import from `@/src/theme` and use colors/spacing/borderRadius/typography constants
2. **StyleSheet API**: Use `StyleSheet.create()` at bottom of files, no inline styles for static values
3. **Dark-first design**: Background is dark green (`#10221c`), cards are `#1a2f28`, primary is `#13eca4`
4. **Inter font**: Typography component handles font families automatically via typography system

### Component Patterns

```tsx
// Button with icon - uses Material Icons from @expo/vector-icons
<Button
  variant="primary"
  leftIcon="arrow-back"
  onPress={handlePress}
>
  Back
</Button>

// Form Input - react-hook-form wrapper with validation
<FormInput
  control={control}
  name="email"
  label="Email"
  placeholder="you@example.com"
  keyboardType="email-address"
/>

// TanStack Query - Fetching data
import { useUser } from '@/src/features/auth';

const { data: user, isLoading } = useUser();

// TanStack Query - Mutations
import { useUpdateProfile } from '@/src/features/auth';

const { mutate: updateProfile } = useUpdateProfile();

// ThemedText - theme-aware text component
<ThemedText variant="title">Welcome to InterviewA</ThemedText>

// ThemedView - theme-aware view container
<ThemedView style={styles.container}>
  <ThemedText>Content</ThemedText>
</ThemedView>

// Navigation - Feature-specific navigation hooks
import { useInterviewNavigation } from '@/src/features/interview';
import { useNavigation } from '@/src/shared';
import { ROUTES } from '@/src/lib/navigation';

// Use feature navigation hook (PREFERRED)
const { startQuickInterview, goBack } = useInterviewNavigation();
startQuickInterview();

// Use generic navigation for tabs/back
const { goToProfile, goBack } = useNavigation();
goToProfile();

// Direct route constants (when needed)
router.push(ROUTES.INTERVIEW.SESSION);
```

### Typography Usage

Use ThemedText component with semantic variants:

- `title` - Page headers
- `body` - Body text
- `caption` - Subtitles, hints
- `error` - Error messages

Color props are handled via theme (dark mode aware).

## ⚠️ Critical Rules: What NOT to Do

**ALWAYS follow vertical slicing:**

- ❌ **NEVER** create `src/components/` folder with all components mixed
- ❌ **NEVER** create `src/hooks/` folder for feature-specific hooks
- ❌ **NEVER** create `src/screens/` folder with all screens mixed
- ❌ **NEVER** put feature code in `src/shared/` unless used by 3+ features
- ✅ **ALWAYS** put feature code in `src/features/<feature>/` first

**Navigation:**

- ❌ **NEVER** hardcode route strings: `router.push("/interview/session")`
- ❌ **NEVER** create centralized navigation helpers in `src/lib/`
- ✅ **ALWAYS** use feature navigation hooks: `useInterviewNavigation()` from feature
- ✅ **ALWAYS** keep navigation logic in `src/features/<feature>/utils/navigation.ts`
- ✅ **OR** use route constants: `router.push(ROUTES.INTERVIEW.SESSION)`

**Styling:**

- ❌ **NEVER** use inline styles for static values
- ❌ **NEVER** hardcode colors: `backgroundColor: "#fff"`
- ✅ **ALWAYS** use StyleSheet.create() and theme tokens

**Documentation:**

- ❌ **NEVER** create markdown documentation files (TESTING.md, MIGRATION.md, etc.)
- ✅ Let the developer create these manually when needed

## Development Workflow

### Running the App

```bash
npx expo start -c      # Start with cache clear
npx expo start --ios   # iOS simulator
npx expo start --android # Android emulator
```

### Code Generation

This project uses Plop for code generation:

```bash
npm run plop          # Interactive mode
npm run plop feature  # Create new feature slice
npm run plop component # Create component with tests
npm run plop route     # Create new route in app/
```

See [PLOP.md](../PLOP.md) for details.

### Project Setup

- New Expo v6 architecture enabled (`newArchEnabled: true`)
- TypeScript strict mode enforced
- Font loading handled in `_layout.tsx` with splash screen prevention
- TanStack Query configured with QueryClientProvider in root layout
- Zustand stores for UI state (optional, prefer React state when possible)

### Common Patterns to Preserve

1. **Server state**: Use TanStack Query with repository pattern
2. **Client state**: Use Zustand stores or React state (useState, useReducer)
3. **Form state**: Use react-hook-form with zod validation
4. **Icon imports**: Import from `@expo/vector-icons/MaterialIcons` (or other icon sets)
5. **StatusBar**: Set once in `(tabs)/_layout.tsx`
6. **Data fetching**: Always go through repositories, never call providers directly

## Key Files Reference

- `app/_layout.tsx` - ClerkProvider, QueryClientProvider, fonts, splash screen
- `app/(tabs)/_layout.tsx` - Tab bar styling, StatusBar config
- `src/theme/colors.ts` - Complete color palette with primary greens
- `src/theme/index.ts` - Theme system export (colors, spacing, typography, shadows, layout)
- `src/queries/` - TanStack Query hooks and configuration
- `src/store/` - Zustand stores for client state (if needed)
- `src/data/repositories/` - Repository interfaces for data layer
- `src/shared/ui/` - Base UI primitives (Button, TextInput, FormInput, Badge, ProgressBar)
- `src/shared/components/` - Domain components (ThemedText, ThemedView, ParallaxScrollView)

## What to Avoid

- ❌ Direct color values (use `colors` from theme)
- ❌ Inline styles for spacing - use `spacing` constants
- ❌ Importing `Text` from `react-native` - use ThemedText/ThemedTextInter components
- ❌ Creating components without barrel exports - add to `index.ts`
- ❌ Mixing icon libraries - only @expo/vector-icons
- ❌ Breaking strict TypeScript - all props must be typed
- ❌ Using lucide-react-native - use @expo/vector-icons instead
- ❌ **NEVER create documentation files** (TESTING.md, STORYBOOK.md, etc.) - These must be created manually by the developer when needed

## Snapshot Testing Guidelines

**✅ What to test with snapshots:**

- **Button** - All variants (primary, secondary, social, link) and states (loading, disabled)
- **Badge** - Base UI primitive with variants
- **FormInput** - react-hook-form wrapper component
- **ThemedText** - Text component with theme awareness
- **Base UI components** - TextInput, ProgressBar, IconBox, and other reusable primitives

**❌ What NOT to test with snapshots:**

- **Complete screens with state** - Too much dynamic data, snapshots become brittle
- **Animations** - react-native-reanimated values change constantly
- **Dates / dynamic data** - Timestamps, random IDs, user-generated content
- **Feature screens** - Test individual components instead of full screen compositions

**Testing strategy:** Focus on **UI primitives and shared components** that have stable, predictable output. Avoid testing anything with state management, real-time data, or complex interactions.

**Test file structure (IMPORTANT):**

Tests ONLY go in `src/shared/`:

```
src/shared/
  ├─ ui/
  │   ├─ __tests__/
  │   │   ├─ button.test.tsx
  │   │   ├─ badge.test.tsx
  │   │   └─ form-input.test.tsx
  │   └─ button.tsx
  └─ components/
      └─ __tests__/
          └─ themed-text.test.tsx
```

**NEVER create tests in:**

- ❌ `features/` - Feature components are not tested with snapshots
- ❌ `app/` - App routes/screens are not tested with snapshots

## Feature vertical slices and component placement

When adding new screens or small feature areas, prefer a vertical-slice layout under `src/features/<feature-name>/`.

- Put screen-level UI, small domain-specific components, local styles, and feature-specific hooks/services together inside the feature folder. Example:
  - `src/features/home/`:
    - `screens/home-screen.tsx` (screen composition)
    - `components/hero-card.tsx` (card used only by this screen)
    - `components/stats-card.tsx` (stats component used by the screen)
    - `index.ts` (barrel that re-exports default screen and named components)

- Keep `src/shared/` for truly reusable UI primitives (Button, TextInput, Badge, ProgressBar, FormInput) and domain components (ThemedText, ThemedView, ParallaxScrollView). If a component is used across multiple features, move it to `shared` and export through `src/shared/ui/index.ts` or `src/shared/components/index.ts`.

- This makes features self-contained and easier to test, mock, and refactor. Feature barrels should re-export a default screen and any small named exports the app router or other features may import.

Example barrel for a feature (`src/features/home/index.ts`):

```ts
export { default } from "./screens/home-screen";
export * from "./components";
export * from "./hooks";
export * from "./services";
```

When in doubt: if a UI piece is only needed by one screen, keep it inside the feature slice.

### Feature slice internal structure

Prefer each feature slice to include a small, local folder structure for files that belong only to that feature. **IMPORTANT: Only create the subfolders and files you actually need**. Do not create empty placeholder files or folders "for future use".

Minimal feature slice layout (example for `home`):

```
src/features/home/
  ├─ screens/               # screen-level files (one or more screens for the feature)
  │   └─ home-screen.tsx    # screen composition (default export)
  ├─ index.ts              # barrel: export default screen + named components
  ├─ components/           # small presentational components used only by this feature
  │   ├─ hero-card.tsx
  │   ├─ stats-card.tsx
  │   └─ index.ts
  ├─ hooks/                # feature-specific hooks (useHome, useStats) - only if needed
  │   ├─ use-home-logic.ts
  │   └─ index.ts
  ├─ services/             # small local services or API adapters - only if needed
  │   ├─ home.service.ts
  │   └─ index.ts
  ├─ types/                # feature-specific types/interfaces - only if needed
  │   └─ index.ts
  └─ utils/                # small utilities used by this feature - only if needed
      └─ format-stats.ts
```

Guidelines:

- Keep truly reusable primitives in `src/shared/ui/` and move to `shared` only when used by multiple features.
- Feature-local hooks/services/types keep the surface area small and make testing and refactoring simpler.
- Barrels inside the feature should re-export the default screen and any named components/hooks you expect other parts of the app to import.
- **Do NOT create empty folders or files with only `export {}`.** Add subfolders (hooks/, services/, types/, utils/) only when you have actual code to put in them.

Cleanup rule when refactoring

- If you refactor a component out of a file into a new file, delete the original file to avoid duplication, stale code, and confusing imports. Always run a project-wide typecheck after such refactors to catch leftover imports or broken references.

## Architecture Enforcement (Future)

The project currently uses basic `eslint-config-expo` configuration. Advanced architecture enforcement rules (eslint-plugin-boundaries, eslint-plugin-import, etc.) are not yet configured but can be added as the project scales.

**Current ESLint setup:**

- Base Expo ESLint config for TypeScript and React Native
- Flat config system (eslint.config.js)
- Ignores: dist/

**Recommended future enhancements:**

- `eslint-plugin-boundaries` - Enforce feature slice isolation
- `eslint-plugin-import` - Consistent import ordering and barrel exports
- `eslint-plugin-react-native` - React Native anti-patterns detection
- `no-restricted-imports` - Enforce theme usage, Typography vs Text
- `eslint-plugin-unused-imports` - Auto-remove unused imports

## Import Organization

Until import order rules are configured, follow these conventions manually:

```typescript
// 1. React/React Native
import React from "react";
import { View, StyleSheet } from "react-native";

// 2. Third-party
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

// 3. Internal aliases (@/*)
import { Button, TextInput } from "@/src/shared/ui";
import { useAppSelector } from "@/src/store";
import { theme, colors, spacing } from "@/src/theme";

// 4. Relative imports
import { HeroCard } from "./components/hero-card";
import { formatDate } from "./utils";
```

Group imports logically and maintain consistent ordering across the codebase.

## React Native Best Practices

Follow these React Native conventions to maintain code quality:

**Styling rules:**

- ✅ Use `StyleSheet.create()` for all styles
- ✅ Import colors from `@/src/theme/colors` - never hardcode hex values
- ✅ Use `spacing` constants from theme for consistent layout
- ❌ NO inline styles (except dynamic computed values)
- ❌ NO color literals like `#fff` or `black` in styles

**What this prevents:**

```tsx
// ❌ PROHIBIDO - inline style
<View style={{ marginLeft: 'auto' }} />

// ❌ PROHIBIDO - color literal
<View style={{ backgroundColor: '#fff' }} />

// ✅ CORRECTO - StyleSheet + theme token
const styles = StyleSheet.create({
  container: { marginLeft: 'auto' },
  background: { backgroundColor: colors.background.light },
});
```

**Component rules:**

- ✅ Use `ThemedText` or `ThemedTextInter` instead of `Text` from react-native
- ✅ Import icons from `@expo/vector-icons`
- ❌ NO lucide-react-native (this project uses @expo/vector-icons)
- ❌ NO direct `Text` imports from react-native

## React Hooks Rules

The project follows standard React Hooks rules (enforced by `eslint-plugin-react-hooks` included in `eslint-config-expo`).

**Key rules:**

- ✅ Call hooks only at the top level (not inside loops, conditions, or nested functions)
- ✅ Include all dependencies in useEffect/useCallback/useMemo arrays
- ✅ Use TanStack Query for server state (data fetching, mutations, caching)
- ✅ Use Zustand for global client state (UI preferences, temporary state)

**What this prevents:**

```tsx
// ❌ PROHIBIDO - hook dentro de condicional
if (condition) {
  const [state, setState] = useState(0);
}

// ❌ PROHIBIDO - dependencia faltante
useEffect(() => {
  console.log(userId);
}, []); // Missing 'userId' in deps

// ✅ CORRECTO
const [state, setState] = useState(0);
useEffect(() => {
  console.log(userId);
}, [userId]);
```

## Notes

- App is in early development - features/ hooks/ context/ folders are currently empty
- Focus on UI consistency over premature abstractions
- This is a personal project with Spanish comments in color definitions

## ⚠️ GitHub Skills vs Project Instructions

**IMPORTANT**: This project has GitHub Skills in `.github/skills/` that provide general Expo/React Native guidance. However, **these copilot-instructions.md take precedence** for project-specific conventions.

### Key Differences to Note:

1. **Icons** 🎨
   - ❌ Skills recommend: `expo-symbols`
   - ✅ **This project uses**: `@expo/vector-icons` (MaterialIcons, Ionicons, etc.)
   - **Reason**: `expo-symbols` is iOS-only (SF Symbols), we need cross-platform icons

2. **State Management** 🗄️
   - ✅ Skills recommend: React Query (TanStack Query) for data fetching
   - ✅ **This project uses**: TanStack Query + Repository pattern
   - **Agreement**: Both use TanStack Query, but this project adds a Repository layer for clean architecture

3. **Styling** 🎨
   - ❌ Skills recommend: Inline styles preferred
   - ✅ **This project uses**: `StyleSheet.create()` at file bottom
   - **Reason**: Performance and consistency across large codebase

4. **Data Layer** 📊
   - ❌ Skills show: Direct fetch/axios with React Query
   - ✅ **This project uses**: Repository pattern with mock/firebase/api providers
   - **Reason**: Clean architecture with swappable data sources

### When to Use Skills

GitHub Skills are still useful for:

- ✅ Expo Router conventions (routes, navigation, dynamic routes)
- ✅ Native features (camera, location, notifications)
- ✅ Performance optimization (React Native best practices)
- ✅ Animations (react-native-reanimated)
- ✅ Build/deployment processes
- ✅ TanStack Query patterns (the data-fetching skill is now aligned!)

**Rule of thumb**: If there's a conflict between skills and these instructions, **always follow these copilot-instructions.md**.
