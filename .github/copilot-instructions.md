# AI Coding Agent Instructions - InterviewA

## 📋 Project Overview

**InterviewA** is a React Native mobile app (Expo) that provides AI-powered interview practice. Uses feature-based architecture for scalability, with Clerk for auth, Redux Toolkit for state, and a repository pattern for data abstraction.

**Tech Stack:** React Native 0.81, Expo SDK 54, TypeScript 5.9, Expo Router (file-based), Clerk Auth, Redux Toolkit, Jest + Testing Library

## 🏗️ Architecture Principles

### Feature-Based Structure

All code is organized by business domain in `src/features/`. Each feature is **self-contained** with its own components, hooks, screens, services, and utils.

```
src/features/
├── auth/          # Authentication & OAuth flows
├── home/          # Dashboard, stats, quick actions
├── interview/     # Core interview experience
├── history/       # Past sessions
└── profile/       # User settings
```

**Rule:** If code is used in 2+ features → move to `src/shared/`. Feature code stays isolated.

### Data Flow Pattern

```
Screen Component → Custom Hook (use*Logic) → Service Class → Repository Interface → Data Provider
```

**Example:** `SignInScreen` → `useSignInLogic` → `AuthService` → `AuthRepository` → `MockProvider`

- **Hooks** (`use*Logic.ts`): All business logic extracted from components. Returns form state, handlers, loading states
- **Services** (`*.service.ts`): Business logic layer between hooks and data. Validation, orchestration, error handling
- **Repositories** (`*.repository.ts`): Interfaces defining data contracts. Implementation-agnostic
- **Providers** (not in current workspace): Actual data implementations (mock/firebase/api). Swap via config

### Styling Conventions

Always use centralized theme system, never hardcoded values:

```typescript
import { colors, spacing, typography, rgba } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.dark, // NOT: "#10221c"
    padding: spacing.lg, // NOT: 24
    ...typography.h1, // NOT: fontSize: 32
    color: rgba(colors.text.primary, 0.9), // NOT: "rgba(255, 255, 255, 0.9)"
  },
});
```

**Colors:** Dark theme with mint green primary (`#13eca4`). Always use `colors.*` tokens  
**Spacing:** Use `spacing.xs/sm/base/lg/xl` (4/8/16/24/32px)  
**Typography:** Use spread `...typography.h1/body/caption` for consistent text styles

### Screen Layout Patterns

Use `ThemedView` (includes SafeAreaView + theme colors):

```typescript
import { ThemedView } from "@/src/shared/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
      >
        {/* content */}
      </ScrollView>
    </ThemedView>
  );
}
```

**Note:** `ThemedView` already includes `SafeAreaView` internally with proper theme colors.

## 🎯 Key Patterns & Conventions

### Barrel Exports

Every directory has `index.ts` that re-exports its contents. Import from the barrel, not individual files:

```typescript
// ✅ Good
import { Button, TextInput } from "@/src/shared/ui";
import { useSignInLogic } from "@/src/features/auth";

// ❌ Bad
import { Button } from "@/src/shared/ui/button";
import { useSignInLogic } from "@/src/features/auth/hooks/use-sign-in-logic";
```

### Path Aliases

Use `@/` for absolute imports from workspace root:

```typescript
import { ThemedText } from "@/src/shared";
import { colors } from "@/src/theme";
import type { User } from "@/src/types";
```

### Routing (Expo Router)

- Route files live in `app/` directory (file-based routing)
- Route files should be thin - just import and re-export from `src/features/*/screens/`
- Use route groups: `(auth)`, `(tabs)` for layout organization
- Auth protection in layout files with `useAuth()` hook and `<Redirect>`

### Redux Store

Typed hooks in `src/store/hooks.ts`:

```typescript
import { useAppDispatch, useAppSelector } from "@/src/store";

// In component
const dispatch = useAppDispatch();
const { user } = useAppSelector((state) => state.auth);
```

**Slices:** `auth.slice.ts` (user, stats), `interview.slice.ts` (current session)

### TypeScript Types

Centralized in `src/types/`:

- `user.types.ts`: User, UserStats
- `interview.types.ts`: InterviewSession, InterviewRole, InterviewFeedback
- `common.types.ts`: PaginatedResponse, ApiResponse

Always use `readonly` for params/config objects in repository/service interfaces.

### Error Handling

For Clerk auth errors, use the mapping utility:

```typescript
import { getClerkErrorMessage } from "@/src/features/auth/utils/clerk-errors";

const errorInfo = getClerkErrorMessage(clerkError);
// Returns: { message, suggestion?, linkText?, linkHref? }
```

Clerk error messages are in Spanish for this project.

## 🧪 Testing

- Test files: `__tests__/*.test.tsx` co-located with components
- Use Testing Library: `@testing-library/react-native`
- Run: `npm test` (watch: `npm run test:watch`, coverage: `npm run test:coverage`)
- Mock data centralized in `__mocks__/data.mock.ts`

Test structure example:

```typescript
describe("ProgressBar", () => {
  describe("Rendering", () => {
    /* ... */
  });
  describe("Accessibility", () => {
    /* ... */
  });
  describe("Edge Cases", () => {
    /* ... */
  });
});
```

## 🚀 Development Workflows

### Start Development

```bash
npm install
npx expo start
```

Options: press `a` (Android), `i` (iOS), `w` (web)

### Native Features (Speech Recognition, etc.)

Some features require development builds, not Expo Go:

```bash
npx expo run:android   # For Android with native modules
npx expo run:ios       # For iOS with native modules
```

Conditional imports for Expo Go compatibility:

```typescript
try {
  const module = require("expo-speech-recognition");
} catch {
  console.warn("⚠️ Module unavailable in Expo Go");
}
```

### Linting & Type Checking

```bash
npm run lint          # ESLint (expo config)
npx tsc --noEmit     # Type checking
```

## ⚙️ Configuration Files

- **Auth:** `src/config/auth.config.ts` - Clerk strategies, routes, validation rules, Spanish error messages
- **Onboarding:** `src/config/onboarding.config.ts` - Onboarding flow configuration
- **Environment:** Expo public variables: `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`, `EXPO_PUBLIC_API_URL`
- **App Config:** `app.json` - Expo config, permissions (RECORD_AUDIO for speech)

## 📝 Code Generation Guidelines

When creating new features:

1. **Feature structure:** Create folder in `src/features/{name}/` with `components/`, `hooks/`, `screens/`, `services/`, `index.ts`
2. **Barrel exports:** Add `index.ts` at each level, re-export everything
3. **Hook extraction:** Move all logic from components to custom hooks (`use{Name}Logic.ts`)
4. **Service layer:** If calling data layer, create service class with dependency injection
5. **Styling:** Import theme tokens, never hardcode colors/spacing
6. **Types:** Add types to `src/types/`, export from barrel
7. **Route files:** In `app/`, keep thin - just re-export screen from feature

When modifying existing code:

- Preserve Spanish text (UI is in Spanish)
- Maintain `readonly` modifiers on repository/service interfaces
- Follow existing error handling patterns (Clerk errors use utility)
- Keep test coverage - update tests when changing components
- Use existing spacing/color tokens, don't introduce new values

## 🔍 Finding Things

- **Components:** Search `src/shared/ui/` for primitives (Button, TextInput), `src/shared/components/` for composite components
- **Hooks:** Check `src/features/{domain}/hooks/` for domain-specific, `src/hooks/` for shared (useThemeColor, etc.)
- **Theme tokens:** All in `src/theme/` - colors, spacing, typography, shadows
- **Mock data:** `__mocks__/data.mock.ts` for dev/test data
- **Auth flows:** `src/features/auth/` - OAuth, sign-in/up logic in hooks, Clerk error mapping in utils
- **Redux state:** `src/store/slices/` for state shape, `src/store/hooks.ts` for typed selectors

## 📚 Key Dependencies

- **Clerk (`@clerk/clerk-expo`)**: Auth with OAuth, token caching via SecureStore
- **Expo Router**: File-based routing, Stack/Tabs navigators
- **Redux Toolkit (`@reduxjs/toolkit`)**: State management with slices
- **React Hook Form + Zod**: Form validation (see `useSignInLogic` for pattern)
- **Expo AV**: Audio recording/playback
- **Expo Speech Recognition**: Native speech-to-text (dev builds only)

When suggesting package additions, consider if functionality exists in Expo SDK first.
