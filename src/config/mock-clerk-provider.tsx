/**
 * Mock Clerk Provider for auth bypass
 * Provides fake Clerk context when SKIP_AUTH = true
 */

import React, { createContext, useContext } from "react";

import { MOCK_USER } from "./auth-bypass.config";

// Mock auth context
const MockAuthContext = createContext({
  isSignedIn: true,
  isLoaded: true,
  sessionId: null,
  userId: "mock-user-id",
  getToken: async () => null,
  signOut: async () => console.log("Mock sign out"),
});

// Mock user context
const MockUserContext = createContext({
  isLoaded: true,
  user: {
    id: "mock-user-id",
    firstName: MOCK_USER.firstName,
    lastName: MOCK_USER.lastName,
    fullName: MOCK_USER.firstName,
    imageUrl: MOCK_USER.imageUrl,
    primaryEmailAddress: {
      emailAddress: MOCK_USER.email,
    },
  },
});

interface MockClerkProviderProps {
  children: React.ReactNode;
}

export function MockClerkProvider({ children }: MockClerkProviderProps) {
  return (
    <MockAuthContext.Provider
      value={{
        isSignedIn: true,
        isLoaded: true,
        sessionId: null,
        userId: "mock-user-id",
        getToken: async () => null,
        signOut: async () => console.log("Mock sign out"),
      }}
    >
      <MockUserContext.Provider
        value={{
          isLoaded: true,
          user: {
            id: "mock-user-id",
            firstName: MOCK_USER.firstName,
            lastName: MOCK_USER.lastName,
            fullName: MOCK_USER.firstName,
            imageUrl: MOCK_USER.imageUrl,
            primaryEmailAddress: {
              emailAddress: MOCK_USER.email,
            },
          },
        }}
      >
        {children}
      </MockUserContext.Provider>
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  return useContext(MockAuthContext);
}

export function useMockUser() {
  return useContext(MockUserContext);
}
