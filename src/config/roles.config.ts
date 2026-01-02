import type { RoleOption } from "@/src/types";

/**
 * Roles disponibles para selección de entrevista
 */
export const ROLES_DATA: readonly RoleOption[] = [
  {
    id: "pm",
    title: "Product Manager",
    subtitle: "Estrategia, Roadmap, Stakeholders",
    icon: "work",
    category: "suggested",
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    subtitle: "React, Vue, Web Performance",
    icon: "code",
    category: "suggested",
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    subtitle: "Node, DBs, System Design",
    icon: "layers",
    category: "suggested",
  },
  {
    id: "ux",
    title: "UX/UI Designer",
    subtitle: "Figma, User Research, Prototyping",
    icon: "brush",
    category: "suggested",
  },
  {
    id: "data",
    title: "Data Scientist",
    subtitle: "Python, ML, Statistics",
    icon: "lightbulb",
    category: "others",
  },
] as const;

/**
 * Rol por defecto preseleccionado
 */
export const DEFAULT_ROLE_ID = "pm";
