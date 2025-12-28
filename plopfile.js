/**
 * Plop Generator Configuration
 * @description Automates feature, component, and route creation following project architecture
 *
 * Usage:
 *   npm run plop feature    - Create a new feature
 *   npm run plop component  - Create a new component
 *   npm run plop route      - Create a new route file
 *
 * Based on .github/copilot-instructions.md architecture:
 * - Feature-based structure in src/features/
 * - Barrel exports at each level
 * - Hook extraction pattern (use*Logic)
 * - Service layer with dependency injection
 * - Theme system usage (no hardcoded values)
 * - Repository pattern for data layer
 */

module.exports = function (plop) {
  // ============================================================================
  // HELPERS
  // ============================================================================

  // Helper to generate proper feature path
  plop.setHelper(
    "featurePath",
    (name) => `src/features/${plop.getHelper("dashCase")(name)}`
  );

  // Helper to convert to proper case for filenames
  plop.setHelper("dashCase", (text) => {
    return text
      .replace(/([A-Z])/g, "-$1")
      .replace(/[\s_]+/g, "-")
      .toLowerCase()
      .replace(/^-/, "");
  });

  // ============================================================================
  // GENERATOR: FEATURE
  // ============================================================================
  plop.setGenerator("feature", {
    description:
      "Create a new feature with full structure (components, hooks, screens, services, types, utils)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 'Feature name (e.g., "notifications", "settings"):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Feature name is required";
        },
      },
      {
        type: "input",
        name: "description",
        message: "Feature description:",
        default: "Feature functionality",
      },
      {
        type: "confirm",
        name: "createRoute",
        message: "Create route file in app/ directory?",
        default: true,
      },
      {
        type: "input",
        name: "routePath",
        message: 'Route path (e.g., "settings", "(tabs)/notifications"):',
        when: (answers) => answers.createRoute,
        default: (answers) => plop.getHelper("dashCase")(answers.name),
      },
    ],
    actions: (data) => {
      const actions = [
        // Feature index
        {
          type: "add",
          path: "src/features/{{dashCase name}}/index.ts",
          templateFile: "plop-templates/feature/index.ts.hbs",
        },
        // Components
        {
          type: "add",
          path: "src/features/{{dashCase name}}/components/index.ts",
          templateFile: "plop-templates/feature/components/index.ts.hbs",
        },
        // Hooks
        {
          type: "add",
          path: "src/features/{{dashCase name}}/hooks/index.ts",
          templateFile: "plop-templates/feature/hooks/index.ts.hbs",
        },
        {
          type: "add",
          path: "src/features/{{dashCase name}}/hooks/use-{{dashCase name}}-logic.ts",
          templateFile: "plop-templates/feature/hooks/use-logic.ts.hbs",
        },
        // Screens
        {
          type: "add",
          path: "src/features/{{dashCase name}}/screens/index.ts",
          templateFile: "plop-templates/feature/screens/index.ts.hbs",
        },
        {
          type: "add",
          path: "src/features/{{dashCase name}}/screens/{{dashCase name}}-screen.tsx",
          templateFile: "plop-templates/feature/screens/screen.tsx.hbs",
        },
        // Services
        {
          type: "add",
          path: "src/features/{{dashCase name}}/services/index.ts",
          templateFile: "plop-templates/feature/services/index.ts.hbs",
        },
        {
          type: "add",
          path: "src/features/{{dashCase name}}/services/{{dashCase name}}.service.ts",
          templateFile: "plop-templates/feature/services/service.ts.hbs",
        },
        // Types
        {
          type: "add",
          path: "src/features/{{dashCase name}}/types/index.ts",
          templateFile: "plop-templates/feature/types/index.ts.hbs",
        },
        // Utils
        {
          type: "add",
          path: "src/features/{{dashCase name}}/utils/index.ts",
          templateFile: "plop-templates/feature/utils/index.ts.hbs",
        },
      ];

      // Add route file if requested
      if (data.createRoute) {
        actions.push({
          type: "add",
          path: "app/{{routePath}}.tsx",
          templateFile: "plop-templates/route/route.tsx.hbs",
          data: {
            featureName: data.name,
          },
        });
      }

      // Success message
      actions.push({
        type: "append",
        path: "plop-output.log",
        template: `
  ✅ Feature "{{pascalCase name}}" created successfully!

  📁 Structure created in: src/features/{{dashCase name}}/
    ├── components/     # Feature-specific UI components
    ├── hooks/          # Business logic (use{{pascalCase name}}Logic)
    ├── screens/        # Screen components
    ├── services/       # Service layer (validation, orchestration)
    ├── types/          # TypeScript types
    ├── utils/          # Utility functions
    └── index.ts        # Barrel export

  ${data.createRoute ? `🛤️  Route file created: app/{{routePath}}.tsx` : ""}

  Next steps:
  1. Implement business logic in hooks/use-{{dashCase name}}-logic.ts
  2. Create components in components/
  3. Update screens/{{dashCase name}}-screen.tsx with your UI
  4. Add types to types/index.ts if needed
  5. Export from src/features/index.ts to make it available app-wide

  📖 Follow patterns from .github/copilot-instructions.md
  `,
      });

      return actions;
    },
  });

  // ============================================================================
  // GENERATOR: SCREEN
  // ============================================================================
  plop.setGenerator("screen", {
    description:
      "Agrega una nueva pantalla y su lógica a una feature existente",
    prompts: [
      {
        type: "input",
        name: "featureName",
        message: "¿En qué feature existente va esta pantalla? (ej: interview)",
        validate: (value) =>
          value ? true : "El nombre de la feature es requerido",
      },
      {
        type: "input",
        name: "name",
        message: "Nombre de la nueva Pantalla (ej: Results, Details):",
        validate: (value) =>
          value ? true : "El nombre de la pantalla es requerido",
      },
      {
        type: "confirm",
        name: "createRoute",
        message: "¿Crear archivo de ruta en app/?",
        default: true,
      },
      {
        type: "input",
        name: "routePath",
        message: "Ruta (ej: interview/results, (tabs)/home/details):",
        when: (answers) => answers.createRoute,
        default: (answers) =>
          `${plop.getHelper("dashCase")(answers.featureName)}/${plop.getHelper(
            "dashCase"
          )(answers.name)}`,
      },
    ],
    actions: (data) => {
      const actions = [
        // 1. Crear la Pantalla
        {
          type: "add",
          path: "src/features/{{dashCase featureName}}/screens/{{dashCase name}}-screen.tsx",
          templateFile: "plop-templates/feature/screens/screen.tsx.hbs",
        },
        // 2. Crear el Hook de Lógica
        {
          type: "add",
          path: "src/features/{{dashCase featureName}}/hooks/use-{{dashCase name}}-logic.ts",
          templateFile: "plop-templates/feature/hooks/use-logic.ts.hbs",
        },
        // 3. Exportar la Pantalla en el Barrel de Screens
        {
          type: "append",
          path: "src/features/{{dashCase featureName}}/screens/index.ts",
          template: "export * from './{{dashCase name}}-screen';",
        },
        // 4. Exportar el Hook en el Barrel de Hooks
        {
          type: "append",
          path: "src/features/{{dashCase featureName}}/hooks/index.ts",
          template: "export * from './use-{{dashCase name}}-logic';",
        },
      ];

      // 5. Crear la Ruta (Opcional)
      if (data.createRoute) {
        actions.push({
          type: "add",
          path: "app/{{routePath}}.tsx",
          templateFile: "plop-templates/route/route.tsx.hbs",
          data: {
            // Pasamos featureName para que el import en la ruta funcione bien
            featureName: data.featureName,
          },
        });
      }

      return actions;
    },
  });
  // ============================================================================
  // GENERATOR: COMPONENT
  // ============================================================================
  plop.setGenerator("component", {
    description: "Create a new component (feature-specific or shared)",
    prompts: [
      {
        type: "list",
        name: "location",
        message: "Where should this component be created?",
        choices: [
          {
            name: "Feature-specific (src/features/{feature}/components/)",
            value: "feature",
          },
          { name: "Shared UI primitive (src/shared/ui/)", value: "shared-ui" },
          {
            name: "Shared component (src/shared/components/)",
            value: "shared-component",
          },
        ],
      },
      {
        type: "input",
        name: "featureName",
        message: "Feature name:",
        when: (answers) => answers.location === "feature",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Feature name is required";
        },
      },
      {
        type: "input",
        name: "name",
        message: 'Component name (e.g., "UserCard", "ProgressBar"):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Component name is required";
        },
      },
      {
        type: "input",
        name: "description",
        message: "Component description:",
        default: "Component description",
      },
      {
        type: "confirm",
        name: "createTest",
        message: "Create test file?",
        default: true,
      },
    ],
    actions: (data) => {
      const actions = [];
      let basePath = "";

      // Determine base path
      if (data.location === "feature") {
        basePath = `src/features/${plop.getHelper("dashCase")(
          data.featureName
        )}/components`;
      } else if (data.location === "shared-ui") {
        basePath = "src/shared/ui";
      } else {
        basePath = "src/shared/components";
      }

      // Add component file
      actions.push({
        type: "add",
        path: `${basePath}/{{dashCase name}}.tsx`,
        templateFile: "plop-templates/component/component.tsx.hbs",
      });

      // Add test file if requested
      if (data.createTest) {
        actions.push({
          type: "add",
          path: `${basePath}/__tests__/{{dashCase name}}.test.tsx`,
          templateFile: "plop-templates/component/component.test.tsx.hbs",
        });
      }

      // Update index.ts barrel export
      actions.push({
        type: "append",
        path: `${basePath}/index.ts`,
        pattern: /(\/\/ Export)/g,
        template:
          'export { {{pascalCase name}} } from "./{{dashCase name}}";\nexport type { {{pascalCase name}}Props } from "./{{dashCase name}}";\n// Export',
        skip: () => {
          // If pattern doesn't exist, just append at the end
          return false;
        },
      });

      // Fallback: if pattern not found, create simple append
      actions.push({
        type: "append",
        path: `${basePath}/index.ts`,
        template:
          '\nexport { {{pascalCase name}} } from "./{{dashCase name}}";\nexport type { {{pascalCase name}}Props } from "./{{dashCase name}}";',
      });

      return actions;
    },
  });

  // ============================================================================
  // GENERATOR: ROUTE
  // ============================================================================
  plop.setGenerator("route", {
    description: "Create a new route file in app/ directory",
    prompts: [
      {
        type: "input",
        name: "featureName",
        message: "Feature name (existing feature in src/features/):",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Feature name is required";
        },
      },
      {
        type: "input",
        name: "name",
        message: 'Screen name (e.g., "settings", "profile"):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Screen name is required";
        },
      },
      {
        type: "input",
        name: "routePath",
        message:
          'Route path (e.g., "settings", "(tabs)/profile", "(auth)/login"):',
        default: (answers) => plop.getHelper("dashCase")(answers.name),
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/{{routePath}}.tsx",
        templateFile: "plop-templates/route/route.tsx.hbs",
      },
    ],
  });

  // ============================================================================
  // GENERATOR: HOOK
  // ============================================================================
  plop.setGenerator("hook", {
    description: "Create a custom hook (feature-specific or shared)",
    prompts: [
      {
        type: "list",
        name: "location",
        message: "Where should this hook be created?",
        choices: [
          {
            name: "Feature-specific (src/features/{feature}/hooks/)",
            value: "feature",
          },
          { name: "Shared (src/hooks/)", value: "shared" },
        ],
      },
      {
        type: "input",
        name: "featureName",
        message: "Feature name:",
        when: (answers) => answers.location === "feature",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Feature name is required";
        },
      },
      {
        type: "input",
        name: "name",
        message:
          'Hook name (without "use" prefix, e.g., "FormValidation", "ApiData"):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Hook name is required";
        },
      },
      {
        type: "input",
        name: "description",
        message: "Hook description:",
        default: "Custom hook",
      },
    ],
    actions: (data) => {
      const basePath =
        data.location === "feature"
          ? `src/features/${plop.getHelper("dashCase")(data.featureName)}/hooks`
          : "src/hooks";

      return [
        {
          type: "add",
          path: `${basePath}/use-{{dashCase name}}.ts`,
          templateFile: "plop-templates/feature/hooks/use-logic.ts.hbs",
        },
        {
          type: "append",
          path: `${basePath}/index.ts`,
          template: 'export * from "./use-{{dashCase name}}";',
        },
      ];
    },
  });
};
