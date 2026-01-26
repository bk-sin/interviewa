# InterviewA - AI Coding Agent Instructions

## Project Overview

**InterviewA** is a technical interview practice mobile app built with React Native, Expo Router v6, and TypeScript. Users can practice interviews with AI, get feedback, track progress, and improve their technical skills with a modern dark UI.

## Architecture & Stack

- **Framework**: Expo SDK 54 with React Native 0.81.5, React 19.1.0
- **Navigation**: Expo Router v6 (file-based routing) with typed routes enabled
- **State Management**: TanStack Query (@tanstack/react-query) for server state, Zustand for client state
- **Authentication**: Clerk (@clerk/clerk-expo) for user auth with 2FA support
- **Storage**: expo-secure-store for sensitive data persistence
- **Styling**: StyleSheet API (no styled-components) with centralized theme tokens
- **Icons**: @expo/vector-icons for all icons
- **Forms**: react-hook-form + zod for validation
- **Voice**: expo-speech-recognition for voice-based interviews

## File Structure Patterns

- **Routing**: `app/` directory uses Expo Router conventions
  - `app/_layout.tsx` - Root provider setup (ClerkProvider, Zustand store, fonts, splash screen)
  - `app/(tabs)/` - Bottom tab navigator with index/practices/history/profile
  - `app/(auth)/` - Auth flow screens (sign-in, sign-up, verify-email, verify-2fa)
  - `app/interview/` - Interview session screens (config, session, feedback, report)
- **Features**: `src/features/<feature-name>/` for vertical slices (screens, types, components, hooks, services, utils)
  - Each feature is self-contained with its own types, components, hooks, services, and utils
  - Example: `src/features/interview/` contains screens/, types/, components/, hooks/, services/
- **Shared Components**: `src/shared/` with barrel exports via `index.ts`
  - `ui/` subfolder for base UI primitives (Button, TextInput, Badge, ProgressBar, FormInput)
  - `components/` subfolder for domain components (ThemedText, ThemedView, ParallaxScrollView)
- **State Management**:
  - `src/queries/` - TanStack Query hooks and configuration (server state)
  - `src/store/` - Zustand stores for client state (UI state, preferences)
- **Data Layer**: `src/data/` with Repository pattern
  - `repositories/` - Data interfaces (interview.repository, auth.repository)
  - `providers/` - Implementations (mock.provider, firebase.provider, api.provider)
- **Theme**: `src/theme/` exports colors, spacing, typography, shadows, layout
  - All styling MUST reference theme tokens, never hardcoded values
- **Path Alias**: Use `@/*` for all root-level imports (configured in tsconfig.json)

## Critical Conventions

### Typings live in `src/types/` or feature-local `types/`

- **Feature-specific types go in `src/features/<feature>/types/`** (preferred for vertical slices).
- **Cross-feature/shared types go in `src/types/`** (only if truly shared across multiple features).
- Avoid defining exported domain types inline inside screens/components.
- Prefer importing types from `@/src/features/<feature>/types` or `@/src/types` to keep the app consistent and reduce circular deps.

### Mock data lives in `__mocks__/`

- **Feature-specific mocks go in `src/features/<feature>/__mocks__/`** (preferred for vertical slices).
- **Shared mocks go in `__mocks__/`** at the root level (only if truly shared).
- Avoid embedding large mock arrays/objects inline inside screens/components.
- Tests and development can import from `__mocks__/`; app runtime code should use the data layer (repositories/providers).

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
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => userRepository.getById(userId),
});

// TanStack Query - Mutations
const mutation = useMutation({
  mutationFn: (data: CreateUserData) => userRepository.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

// ThemedText - theme-aware text component
<ThemedText variant="title">Welcome to InterviewA</ThemedText>

// ThemedView - theme-aware view container
<ThemedView style={styles.container}>
  <ThemedText>Content</ThemedText>
</ThemedView>
```

### Typography Usage

Use ThemedText component with semantic variants:

- `title` - Page headers
- `body` - Body text
- `caption` - Subtitles, hints
- `error` - Error messages

Color props are handled via theme (dark mode aware).

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
