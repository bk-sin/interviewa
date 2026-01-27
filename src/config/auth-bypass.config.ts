/**
 * Auth Bypass Configuration
 * 
 * Temporal flag para saltear autenticación en el MVP.
 * Para reactivar auth: cambiar SKIP_AUTH a false
 */

export const SKIP_AUTH = true;

/**
 * Mock user data para usar cuando SKIP_AUTH = true
 */
export const MOCK_USER = {
  firstName: "Usuario MVP",
  lastName: "",
  email: "usuario@mvp.com",
  imageUrl: null,
};
