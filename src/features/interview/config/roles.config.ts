import type { RoleOption } from "../types";

/**
 * Lista de roles disponibles para selección
 */
export const ROLES_DATA: readonly RoleOption[] = [
  // Suggested roles
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    subtitle: "React, Vue, Angular",
    icon: "web",
    category: "suggested",
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    subtitle: "Node.js, Python, Java",
    icon: "storage",
    category: "suggested",
  },
  {
    id: "fullstack-developer",
    title: "Fullstack Developer",
    subtitle: "Frontend + Backend",
    icon: "layers",
    category: "suggested",
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer",
    subtitle: "React Native, Flutter",
    icon: "phone-android",
    category: "suggested",
  },
  // Other roles
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    subtitle: "CI/CD, Cloud, Infrastructure",
    icon: "cloud",
    category: "others",
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    subtitle: "Testing, Automation",
    icon: "bug-report",
    category: "others",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    subtitle: "ETL, Data Pipelines",
    icon: "analytics",
    category: "others",
  },
  {
    id: "software-architect",
    title: "Software Architect",
    subtitle: "System Design, Architecture",
    icon: "architecture",
    category: "others",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    subtitle: "Design, Prototyping",
    icon: "palette",
    category: "others",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    subtitle: "Strategy, Roadmap",
    icon: "business",
    category: "others",
  },
] as const;

/**
 * ID del rol por defecto
 */
export const DEFAULT_ROLE_ID = "frontend-developer";
