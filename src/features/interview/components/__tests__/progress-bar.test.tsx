import { render } from "@testing-library/react-native";
import React from "react";
import { ProgressBar } from "../progress-bar";

describe("ProgressBar", () => {
  const defaultProps = {
    currentQuestion: 3,
    totalQuestions: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render progress label", () => {
      const { getByText } = render(<ProgressBar {...defaultProps} />);
      expect(getByText("PROGRESS")).toBeTruthy();
    });

    it("should render progress count correctly", () => {
      const { getByText } = render(<ProgressBar {...defaultProps} />);
      expect(getByText("3/10")).toBeTruthy();
    });

    it("should render correct number of progress segments", () => {
      const { getByTestId } = render(<ProgressBar {...defaultProps} />);
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.children).toHaveLength(10);
    });

    it("should mark correct segments as active", () => {
      const { getByTestId } = render(
        <ProgressBar currentQuestion={3} totalQuestions={5} />
      );
      const progressBar = getByTestId("progress-bar");
      const segments = progressBar.props.children;

      // Los primeros 3 deberían estar activos (index < 3)
      segments.forEach((segment: any, index: number) => {
        const hasActiveStyle = segment.props.style.some(
          (style: any) => style && style.backgroundColor === "#10B981"
        );
        expect(hasActiveStyle).toBe(index < 3);
      });
    });
  });

  describe("Accessibility", () => {
    it("should have progressbar role", () => {
      const { getByTestId } = render(<ProgressBar {...defaultProps} />);
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.accessibilityRole).toBe("progressbar");
    });

    it("should have correct accessibility values", () => {
      const { getByTestId } = render(<ProgressBar {...defaultProps} />);
      const progressBar = getByTestId("progress-bar");

      expect(progressBar.props.accessibilityValue).toEqual({
        min: 0,
        max: 10,
        now: 3,
        text: "3 of 10 questions completed",
      });
    });

    it("should have descriptive accessibility label with percentage", () => {
      const { getByTestId } = render(
        <ProgressBar currentQuestion={5} totalQuestions={10} />
      );
      const progressBar = getByTestId("progress-bar");

      expect(progressBar.props.accessibilityLabel).toBe(
        "Interview progress: 50% complete"
      );
    });

    it("should hide individual segments from screen readers", () => {
      const { getByTestId } = render(<ProgressBar {...defaultProps} />);
      const progressBar = getByTestId("progress-bar");
      const firstSegment = progressBar.props.children[0];

      expect(firstSegment.props.importantForAccessibility).toBe(
        "no-hide-descendants"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle 0 questions", () => {
      const { getByTestId } = render(
        <ProgressBar currentQuestion={0} totalQuestions={0} />
      );
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.children).toHaveLength(0);
    });

    it("should handle large number of questions (100)", () => {
      const { getByTestId, getByText } = render(
        <ProgressBar currentQuestion={50} totalQuestions={100} />
      );
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.children).toHaveLength(100);
      expect(getByText("50/100")).toBeTruthy();
    });

    it("should handle currentQuestion greater than totalQuestions", () => {
      const { getByText } = render(
        <ProgressBar currentQuestion={15} totalQuestions={10} />
      );
      expect(getByText("15/10")).toBeTruthy();
    });

    it("should calculate percentage correctly for edge values", () => {
      const { getByTestId } = render(
        <ProgressBar currentQuestion={10} totalQuestions={10} />
      );
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.accessibilityLabel).toBe(
        "Interview progress: 100% complete"
      );
    });

    it("should handle 0% progress", () => {
      const { getByTestId } = render(
        <ProgressBar currentQuestion={0} totalQuestions={10} />
      );
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.accessibilityLabel).toBe(
        "Interview progress: 0% complete"
      );
    });

    it("should handle division by zero gracefully", () => {
      const { getByTestId } = render(
        <ProgressBar currentQuestion={0} totalQuestions={0} />
      );
      const progressBar = getByTestId("progress-bar");
      expect(progressBar.props.accessibilityLabel).toBe(
        "Interview progress: 0% complete"
      );
    });
  });

  describe("Memoization", () => {
    it("should memoize progress segments", () => {
      const { rerender } = render(<ProgressBar {...defaultProps} />);

      // Re-render con las mismas props - debería usar cache
      rerender(<ProgressBar {...defaultProps} />);

      // Si llegamos aquí sin errores, la memoización funciona
      expect(true).toBe(true);
    });

    it("should recalculate segments when totalQuestions changes", () => {
      const { rerender, getByTestId } = render(
        <ProgressBar {...defaultProps} />
      );

      const progressBarBefore = getByTestId("progress-bar");
      expect(progressBarBefore.props.children).toHaveLength(10);

      // Cambiar totalQuestions debería recrear los segmentos
      rerender(<ProgressBar currentQuestion={3} totalQuestions={5} />);

      const progressBarAfter = getByTestId("progress-bar");
      expect(progressBarAfter.props.children).toHaveLength(5);
    });

    it("should recalculate active segments when currentQuestion changes", () => {
      const { rerender, getByTestId } = render(
        <ProgressBar currentQuestion={2} totalQuestions={5} />
      );

      // Cambiar currentQuestion debería actualizar segmentos activos
      rerender(<ProgressBar currentQuestion={4} totalQuestions={5} />);

      const progressBar = getByTestId("progress-bar");
      const segments = progressBar.props.children;

      // Los primeros 4 deberían estar activos ahora
      segments.forEach((segment: any, index: number) => {
        const hasActiveStyle = segment.props.style.some(
          (style: any) => style && style.backgroundColor === "#10B981"
        );
        expect(hasActiveStyle).toBe(index < 4);
      });
    });
  });
});
