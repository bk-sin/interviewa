# Arquitectura del Proyecto - Feature-Based

Este proyecto utiliza una arquitectura basada en **features** (dominios) para máxima escalabilidad y mantenibilidad.

## 📁 Estructura Principal

```
src/
├── features/           # Features por dominio de negocio
├── shared/            # Componentes y UI compartidos
├── store/             # Estado global (Redux Toolkit)
├── data/              # Capa de datos (Repository pattern)
├── types/             # Tipos TypeScript centralizados
├── theme/             # Sistema de diseño
├── hooks/             # Hooks compartidos
├── lib/               # Librerías configuradas
└── config/            # Configuraciones de la app
```

## 🎯 Features (Dominios de Negocio)

Cada feature contiene **toda** su funcionalidad:

```
src/features/
├── auth/
│   ├── components/      # UI específica de auth
│   ├── screens/         # Pantallas de auth
│   ├── hooks/           # Hooks de auth (useSignInLogic, etc.)
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utils de auth (clerk-errors)
│   └── index.ts         # Barrel export
│
├── home/
│   ├── components/      # Hero, Stats, Cards
│   ├── screens/         # HomeScreen
│   └── index.ts
│
├── interview/
│   ├── components/
│   ├── screens/
│   ├── services/        # InterviewService
│   └── index.ts
│
├── profile/
├── history/
└── onboarding/
```

### Ventajas del Approach por Features

✅ **Escalabilidad**: Agregar features no afecta código existente
✅ **Mantenibilidad**: Todo relacionado está junto
✅ **Testability**: Features se testean independientemente
✅ **Code Ownership**: Teams pueden "poseer" features
✅ **Lazy Loading**: Features se pueden cargar on-demand

## 🧩 Shared (Compartido)

Componentes **reutilizables** entre features:

```
src/shared/
├── components/
│   ├── text/           # ThemedText, ThemedTextInter
│   ├── layout/         # ThemedView, ParallaxScrollView
│   ├── navigation/     # ExternalLink, HapticTab
│   └── index.ts
│
├── ui/                 # Primitivos de UI
│   ├── button.tsx
│   ├── text-input.tsx
│   ├── badge.tsx
│   ├── progress-bar.tsx
│   └── index.ts
│
└── index.ts
```

**Regla:** Si un componente se usa en 2+ features → va en `shared/`

## 🔄 Capa de Servicios

Los servicios contienen **lógica de negocio** entre hooks y providers:

```typescript
// src/features/interview/services/interview.service.ts
export class InterviewService {
  constructor(private repository: InterviewRepository) {}

  async createSession(params: CreateSessionParams) {
    // ✅ Validación
    const roles = await this.getRoles();
    if (!roles.some((r) => r.id === params.roleId)) {
      throw new Error(`Role not found`);
    }

    // ✅ Llamada al repository
    return this.repository.createSession(params);
  }
}
```

**Flujo:**

```
Component → Hook → Service → Repository → Provider (mock/firebase/api)
```

## 🗂️ Data Layer (Desacoplado)

Repository pattern con providers intercambiables:

```
src/data/
├── repositories/
│   ├── auth.repository.ts          # Interface
│   └── interview.repository.ts     # Interface
│
└── providers/
    ├── mock.provider.ts             # Desarrollo
    ├── firebase.provider.ts         # Producción opción 1
    └── api.provider.ts              # Producción opción 2
```

Cambiar de provider es **una línea**:

```typescript
// src/data/index.ts
const ACTIVE_PROVIDER = "mock"; // "firebase" | "api"
```

## 🎨 Theme System

Sistema de diseño unificado:

```typescript
import { theme, colors, spacing, typography } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.dark,
    padding: spacing.base,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
  },
});
```

## 📱 Routing (app/)

Las carpetas en `app/` **solo routing**, lógica en `src/`:

```typescript
export { default } from "@/src/features/home/screens/home-screen";
```

## 📦 Imports

```typescript
// Features
import { useSignInLogic } from "@/src/features/auth";
import { HeroCard, StatsCard } from "@/src/features/home";

// Shared
import { Button, TextInput } from "@/src/shared/ui";
import { ThemedText, ThemedView } from "@/src/shared/components";

// Store
import { useAppSelector, useAppDispatch } from "@/src/store";

// Data
import { interviewProvider } from "@/src/data";

// Types
import type { User, InterviewSession } from "@/src/types";

// Theme
import { theme, colors } from "@/src/theme";
```

## 📚 Recursos

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
