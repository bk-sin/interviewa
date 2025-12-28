# ✅ Configuración de Plop Completada

## 📦 ¿Qué se instaló?

- **Plop**: Generador de código basado en templates
- **Templates**: En `plop-templates/` con patrones del proyecto
- **Scripts NPM**: `npm run plop` y `npm run generate`

## 🎯 Generadores Disponibles

### 1. Feature Completo

```bash
npm run plop feature
```

Genera estructura completa:

- `src/features/{nombre}/`
  - `components/` (con barrel export)
  - `hooks/` (con `use-{nombre}-logic.ts`)
  - `screens/` (con `{nombre}-screen.tsx`)
  - `services/` (con `{nombre}.service.ts`)
  - `types/` (TypeScript types)
  - `utils/` (utilidades)
  - `index.ts` (barrel export principal)
- Opcionalmente: `app/{ruta}.tsx`

### 2. Componente

```bash
npm run plop component
```

Opciones:

- Feature-specific
- Shared UI
- Shared component

Genera:

- Componente con estilos tema
- Test file (opcional)
- Actualiza barrel exports

### 3. Route

```bash
npm run plop route
```

Genera archivo en `app/` que conecta con feature

### 4. Hook

```bash
npm run plop hook
```

Custom hook en feature o shared

## 🎨 Patrones Implementados

### ✅ Estructura de Screen (basado en setup-screen.tsx)

```typescript
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  const { data, handlers } = useMyLogic();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background.dark}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Content */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
```

### ✅ Theme System (NO hardcoded values)

```typescript
import { theme } from "@/src/theme";
const { colors, spacing, typography } = theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.dark, // ✅
    padding: spacing.lg, // ✅
    ...typography.h1, // ✅
  },
});
```

### ✅ Hook Extraction

```typescript
// Screen (solo UI)
export default function MyScreen() {
  const logic = useMyLogic(); // Toda la lógica aquí
  return <View>{/* UI */}</View>;
}

// Hook (toda la lógica)
export function useMyLogic() {
  const [state, setState] = useState();
  const handlers = {
    /* ... */
  };
  return { state, handlers };
}
```

### ✅ Barrel Exports

```typescript
// components/index.ts
export { MyComponent } from "./my-component";
export type { MyComponentProps } from "./my-component";
```

### ✅ Path Aliases

```typescript
import { Button } from "@/src/shared/ui";
import { colors } from "@/src/theme";
import type { User } from "@/src/types";
```

## 📚 Documentación

- **PLOP.md**: Guía detallada de uso
- **.github/copilot-instructions.md**: Patrones arquitectónicos (actualizado)
- **ARCHITECTURE.md**: Arquitectura del proyecto

## 🚀 Próximos Pasos

1. Prueba generar una feature:

   ```bash
   npm run plop feature
   ```

2. Revisa los archivos generados en `src/features/{nombre}/`

3. Personaliza según necesites:

   - Implementa lógica en hooks
   - Crea componentes
   - Agrega tipos
   - Conecta con servicios

4. Sigue los patrones de:
   - `setup-screen.tsx` (SafeAreaView + StatusBar)
   - `home-screen.tsx` (callbacks memoizados)
   - `interview-screen.tsx` (conditional imports)

## ⚠️ Notas Importantes

- Los templates siguen **patrones reales** del código existente
- `SafeAreaView` directo (no `ThemedView` por defecto)
- `StatusBar` siempre presente
- Theme tokens obligatorios
- Barrel exports en todo nivel
- Hook extraction pattern

¡Todo listo para generar código consistente! 🎉
