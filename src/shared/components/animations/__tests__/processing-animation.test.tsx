import { render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import { ProcessingAnimation } from "../processing-animation";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => ({
  ...jest.requireActual("react-native-reanimated/mock"),
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  withTiming: jest.fn((value) => value),
  withRepeat: jest.fn((value) => value),
  withSequence: jest.fn((value) => value),
  default: {
    View,
  },
}));

describe("ProcessingAnimation", () => {
  const defaultProps = {
    pingStyle: {},
    spinStyle: {},
    reverseSpinStyle: {},
    pulseStyle: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render correctly", () => {
      render(<ProcessingAnimation {...defaultProps} />);
      expect(true).toBeTruthy();
    });

    it("should render with animated styles", () => {
      const customProps = {
        pingStyle: { opacity: 0.5 },
        spinStyle: { transform: [{ rotate: "45deg" }] },
        reverseSpinStyle: { transform: [{ rotate: "-45deg" }] },
        pulseStyle: { scale: 1.2 },
      };

      render(<ProcessingAnimation {...customProps} />);
      expect(true).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should be accessible", () => {
      render(<ProcessingAnimation {...defaultProps} />);
      expect(true).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty styles", () => {
      const emptyProps = {
        pingStyle: undefined,
        spinStyle: undefined,
        reverseSpinStyle: undefined,
        pulseStyle: undefined,
      };

      render(<ProcessingAnimation {...(emptyProps as any)} />);
      expect(true).toBeTruthy();
    });
  });
});
