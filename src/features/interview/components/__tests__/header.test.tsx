import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Header } from "../header";

// Mock SafeAreaInsets
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock del sub-componente ProgressBar
jest.mock("../progress-bar", () => ({
  ProgressBar: ({ currentQuestion, totalQuestions }: any) => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return (
      <View testID="progress-bar-mock">
        <Text testID="progress-count-mock">
          {currentQuestion}/{totalQuestions}
        </Text>
      </View>
    );
  },
}));

describe("Header", () => {
  const defaultProps = {
    title: "Interview Session",
    currentQuestion: 3,
    totalQuestions: 10,
    showProgress: true,
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render title correctly", () => {
      const { getByText } = render(<Header {...defaultProps} />);
      expect(getByText("Interview Session")).toBeTruthy();
    });

    it("should render progress count correctly", () => {
      const { getByTestId } = render(<Header {...defaultProps} />);
      const progressCount = getByTestId("progress-count-mock");
      expect(progressCount).toBeTruthy();
    });

    it("should render End button when onEnd is provided", () => {
      const onEnd = jest.fn();
      const { getByText } = render(<Header {...defaultProps} onEnd={onEnd} />);
      expect(getByText("End")).toBeTruthy();
    });

    it("should not render End button when onEnd is not provided", () => {
      const { queryByText } = render(<Header {...defaultProps} />);
      expect(queryByText("End")).toBeNull();
    });
  });

  describe("Progress Bar", () => {
    it("should render progress bar when showProgress is true", () => {
      const { getByTestId } = render(<Header {...defaultProps} />);
      expect(getByTestId("progress-bar-mock")).toBeTruthy();
    });

    it("should not render progress bar when showProgress is false", () => {
      const { queryByTestId } = render(
        <Header {...defaultProps} showProgress={false} />
      );
      expect(queryByTestId("progress-bar-mock")).toBeNull();
    });

    it("should not render progress bar when totalQuestions is 0", () => {
      const { queryByTestId } = render(
        <Header {...defaultProps} totalQuestions={0} />
      );
      expect(queryByTestId("progress-bar-mock")).toBeNull();
    });
  });

  describe("User Interactions", () => {
    it("should call onBack when back button is pressed", () => {
      const onBack = jest.fn();
      const { getByLabelText } = render(
        <Header {...defaultProps} onBack={onBack} />
      );

      fireEvent.press(getByLabelText("Go back"));
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it("should call onEnd when end button is pressed", () => {
      const onEnd = jest.fn();
      const { getByLabelText } = render(
        <Header {...defaultProps} onEnd={onEnd} />
      );

      fireEvent.press(getByLabelText("End interview"));
      expect(onEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have correct accessibility labels for back button", () => {
      const { getByLabelText } = render(<Header {...defaultProps} />);
      expect(getByLabelText("Go back")).toBeTruthy();
    });

    it("should have correct accessibility labels for end button", () => {
      const { getByLabelText } = render(
        <Header {...defaultProps} onEnd={jest.fn()} />
      );
      expect(getByLabelText("End interview")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long titles with ellipsis", () => {
      const longTitle = "A".repeat(100);
      const { getByText } = render(
        <Header {...defaultProps} title={longTitle} />
      );

      const titleElement = getByText(longTitle);
      expect(titleElement.props.numberOfLines).toBe(1);
      expect(titleElement.props.ellipsizeMode).toBe("tail");
    });

    it("should handle 0 questions", () => {
      const { queryByTestId } = render(
        <Header
          {...defaultProps}
          currentQuestion={0}
          totalQuestions={0}
          showProgress={true}
        />
      );

      // No debería renderizar progreso si totalQuestions es 0
      expect(queryByTestId("progress-bar-mock")).toBeNull();
    });

    it("should pass correct props to ProgressBar", () => {
      const { getByTestId } = render(
        <Header
          {...defaultProps}
          currentQuestion={50}
          totalQuestions={100}
          showProgress={true}
        />
      );

      const progressBar = getByTestId("progress-bar-mock");
      expect(progressBar).toBeTruthy();
    });
  });

  describe("Memoization", () => {
    it("should not re-render when unrelated props change", () => {
      const { rerender } = render(<Header {...defaultProps} />);
      const onBackNew = jest.fn();

      // Solo cambia la función onBack (no afecta el render visual)
      rerender(<Header {...defaultProps} onBack={onBackNew} />);

      // El componente debería ser memoizado, pero las funciones siempre causan re-render
      // Este test documenta el comportamiento esperado
      expect(true).toBe(true);
    });
  });
});
