import "@testing-library/jest-native/extend-expect";

// Mock react-native-safe-area-context globalmente
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
}));

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
  Ionicons: "Ionicons",
  FontAwesome: "FontAwesome",
}));

// Mock theme
jest.mock("@/src/theme", () => ({
  theme: {
    colors: {
      primary: "#10B981",
      text: {
        primary: "#FFFFFF",
        secondary: "#9CA3AF",
      },
      background: {
        card: "#1F2937",
      },
    },
    spacing: {
      base: 16,
      xs: 4,
      lg: 24,
    },
    typography: {
      bodySemi: {
        fontSize: 16,
        fontWeight: "600",
      },
      bodySmall: {
        fontSize: 14,
      },
    },
  },
  fonts: {
    medium: "Inter-Medium",
    bold: "Inter-Bold",
  },
  fontSizes: {
    xs: 10,
    sm: 12,
  },
}));
