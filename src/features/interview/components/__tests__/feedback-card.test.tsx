import { render } from "@testing-library/react-native";
import React from "react";

import { FeedbackCard } from "../feedback-card";

describe("FeedbackCard", () => {
  const defaultProps = {
    type: "strength" as const,
    title: "Test Title",
    description: "Test description",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render correctly with strength type", () => {
      const { getByText } = render(<FeedbackCard {...defaultProps} />);

      expect(getByText("Strength")).toBeTruthy();
      expect(getByText("Test Title")).toBeTruthy();
      expect(getByText("Test description")).toBeTruthy();
    });

    it("should render correctly with improvement type", () => {
      const { getByText } = render(
        <FeedbackCard {...defaultProps} type="improvement" />
      );

      expect(getByText("Improvement")).toBeTruthy();
      expect(getByText("Test Title")).toBeTruthy();
      expect(getByText("Test description")).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should be accessible", () => {
      const { getByText } = render(<FeedbackCard {...defaultProps} />);

      const title = getByText("Test Title");
      expect(title).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle long titles", () => {
      const { getByText } = render(
        <FeedbackCard
          {...defaultProps}
          title="This is a very long title that might wrap to multiple lines"
        />
      );

      expect(
        getByText("This is a very long title that might wrap to multiple lines")
      ).toBeTruthy();
    });

    it("should handle long descriptions", () => {
      const { getByText } = render(
        <FeedbackCard
          {...defaultProps}
          description="This is a very long description that provides detailed feedback about the user's performance and might span multiple lines to give comprehensive information"
        />
      );

      expect(
        getByText(
          "This is a very long description that provides detailed feedback about the user's performance and might span multiple lines to give comprehensive information"
        )
      ).toBeTruthy();
    });
  });
});
