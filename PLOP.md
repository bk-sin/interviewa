# Generadores de Código con Plop

Este proyecto utiliza [Plop](https://plopjs.com/) para automatizar la creación de features, componentes, hooks y rutas siguiendo la arquitectura definida en `.github/copilot-instructions.md`.

## 🚀 Uso Rápido

```bash
# Forma interactiva (recomendada)
npm run plop

# Comando directo
npm run plop feature     # Crear nueva feature
npm run plop component   # Crear componente
npm run plop route       # Crear archivo de ruta
npm run plop hook        # Crear custom hook
```

## 📦 Generadores Disponibles

### 1. Feature (Feature Completo)

Crea una feature completa con toda la estructura necesaria:

```bash
npm run plop feature
```

**Estructura generada:**

```
src/features/{nombre}/
├── components/
│   └── index.ts              # Barrel export
├── hooks/
│   ├── index.ts
│   └── use-{nombre}-logic.ts # Hook con lógica de negocio
├── screens/
│   ├── index.ts
│   └── {nombre}-screen.tsx   # Pantalla principal
├── services/
│   ├── index.ts
│   └── {nombre}.service.ts   # Capa de servicios
├── types/
│   └── index.ts              # Tipos TypeScript
├── utils/
│   └── index.ts              # Funciones utilitarias
└── index.ts                  # Barrel export principal
```

**Opcionalmente genera:**

- `app/{ruta}.tsx` - Archivo de ruta en Expo Router

**Ejemplo:**

```bash
? Feature name: notifications
? Feature description: Push notifications management
? Create route file: Yes
? Route path: (tabs)/notifications
```

### 2. Component (Componente)

Crea un componente con su test y actualiza los barrel exports:

```bash
npm run plop component
```

**Opciones de ubicación:**

- **Feature-specific**: `src/features/{feature}/components/`
- **Shared UI primitive**: `src/shared/ui/`
- **Shared component**: `src/shared/components/`

**Archivos generados:**

- `{nombre}.tsx` - Componente con estilos siguiendo tema
- `__tests__/{nombre}.test.tsx` - Test básico (opcional)
- Actualiza `index.ts` con exports

**Ejemplo:**

```bash
? Where should this component be created? Feature-specific
? Feature name: notifications
? Component name: NotificationCard
? Component description: Displays a single notification
? Create test file? Yes
```

### 3. Route (Archivo de Ruta)

Crea un archivo de ruta en `app/` que conecta con una feature:

```bash
npm run plop route
```

**Genera:**

- `app/{ruta}.tsx` - Archivo que re-exporta desde feature

**Ejemplo:**

```bash
? Feature name: notifications
? Screen name: notifications
? Route path: (tabs)/notifications
```

**Genera:** `app/(tabs)/notifications.tsx`

```typescript
export { default } from "@/src/features/notifications/screens/notifications-screen";
```

### 4. Hook (Custom Hook)

Crea un custom hook con lógica de negocio:

```bash
npm run plop hook
```

**Opciones:**

- **Feature-specific**: `src/features/{feature}/hooks/`
- **Shared**: `src/hooks/`

**Ejemplo:**

```bash
? Where should this hook be created? Feature-specific
? Feature name: notifications
? Hook name: NotificationManager
? Hook description: Manages notification state and actions
```

**Genera:** `use-notification-manager.ts` con estructura estándar

## 🎨 Patrones Implementados

Todos los generadores siguen estos patrones del proyecto:

### ✅ Barrel Exports

Cada directorio tiene `index.ts` que re-exporta todo su contenido.

### ✅ Path Aliases

Usa `@/` para imports absolutos:

```typescript
import { Button } from "@/src/shared/ui";
import { useAuthLogic } from "@/src/features/auth";
```

### ✅ Theme System

No hay valores hardcodeados, solo tokens del tema:

```typescript
import { colors, spacing, typography } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.dark, // ✅
    padding: spacing.lg, // ✅
    ...typography.h1, // ✅
  },
});
```

### ✅ Hook Extraction Pattern

Toda la lógica de negocio va en hooks `use*Logic`:

```typescript
// Screen (solo UI)
export default function NotificationsScreen() {
  const { notifications, isLoading, handleMarkAsRead } =
    useNotificationsLogic();
  // Solo renderizado
}

// Hook (toda la lógica)
export function useNotificationsLogic() {
  // Estado, efectos, handlers, etc.
}
```

### ✅ Service Layer

Servicios para lógica de negocio entre hooks y data:

```typescript
export class NotificationsService {
  constructor(private repository: NotificationsRepository) {}

  async getUnread(): Promise<Notification[]> {
    // Validación, transformación, etc.
  }
}
```

### ✅ Repository Pattern

Interfaces para abstracción de datos:

```typescript
export interface NotificationsRepository {
  readonly getAll: () => Promise<Notification[]>;
  readonly markAsRead: (id: string) => Promise<void>;
}
```

## 📝 Próximos Pasos Después de Generar

### Después de crear una Feature:

1. **Implementar lógica en el hook:**

   ```typescript
   // hooks/use-{nombre}-logic.ts
   export function use{Nombre}Logic() {
     // Agregar estado, efectos, handlers
   }
   ```

2. **Crear componentes específicos:**

   ```bash
   npm run plop component
   # Seleccionar Feature-specific
   ```

3. **Actualizar la pantalla:**

   ```typescript
   // screens/{nombre}-screen.tsx
   // Usar componentes y hook de lógica
   ```

4. **Agregar tipos si es necesario:**

   ```typescript
   // types/index.ts
   export interface {Nombre}Data { ... }
   ```

5. **Exportar desde features index:**
   ```typescript
   // src/features/index.ts
   export * as {nombre} from "./{nombre}";
   ```

### Después de crear un Component:

1. **Implementar UI y lógica del componente**

2. **Agregar props necesarias:**

   ```typescript
   export interface {Nombre}Props {
     // Agregar props
   }
   ```

3. **Completar tests:**

   ```typescript
   describe("{Nombre}", () => {
     // Agregar casos de test
   });
   ```

4. **Usar en screens:**
   ```typescript
   import { {Nombre} } from "../components";
   ```

## 🔧 Customización

Para modificar los templates, edita los archivos en `plop-templates/`:

```
plop-templates/
├── feature/
│   ├── index.ts.hbs
│   ├── components/index.ts.hbs
│   ├── hooks/
│   ├── screens/
│   ├── services/
│   ├── types/
│   └── utils/
├── component/
│   ├── component.tsx.hbs
│   └── component.test.tsx.hbs
└── route/
    └── route.tsx.hbs
```

## 📚 Referencias

- **Arquitectura del proyecto**: `.github/copilot-instructions.md`
- **Documentación Plop**: https://plopjs.com/
- **Expo Router**: https://docs.expo.dev/router/introduction/

## 💡 Tips

- Los nombres se convierten automáticamente al formato correcto (PascalCase para componentes, dash-case para archivos)
- Usa nombres descriptivos en singular para features (e.g., "notification", no "notifications")
- Siempre revisa los archivos generados y ajusta según tus necesidades
- Los templates usan Handlebars - puedes usar helpers como `{{pascalCase}}`, `{{dashCase}}`, etc.
