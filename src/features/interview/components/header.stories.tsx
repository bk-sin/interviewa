import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { View } from "react-native";
import { Header } from "./header";

const meta = {
  title: "Interview/Header",
  component: Header,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, backgroundColor: "#0f1419" }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: {
      control: "text",
      description: "Header title",
    },
    currentQuestion: {
      control: { type: "number", min: 0, max: 100 },
      description: "Current question number",
    },
    totalQuestions: {
      control: { type: "number", min: 0, max: 100 },
      description: "Total number of questions",
    },
    showProgress: {
      control: "boolean",
      description: "Show progress bar",
    },
    onBack: { action: "onBack" },
    onEnd: { action: "onEnd" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 3,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Sin botón End
export const WithoutEndButton: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 5,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
  },
};

// Sin progreso
export const WithoutProgress: Story = {
  args: {
    title: "Setup Interview",
    currentQuestion: 0,
    totalQuestions: 10,
    showProgress: false,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Primera pregunta
export const FirstQuestion: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 1,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Última pregunta
export const LastQuestion: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 10,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Título muy largo (testing truncation)
export const LongTitle: Story = {
  args: {
    title:
      "This is a very long title that should be truncated with ellipsis to prevent overflow",
    currentQuestion: 5,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Sin preguntas
export const NoQuestions: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 0,
    totalQuestions: 0,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Muchas preguntas (100)
export const ManyQuestions: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 50,
    totalQuestions: 100,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

// Estados diferentes del interview
export const RecordingState: Story = {
  args: {
    title: "Recording...",
    currentQuestion: 3,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

export const ProcessingState: Story = {
  args: {
    title: "Processing...",
    currentQuestion: 3,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

export const FeedbackState: Story = {
  args: {
    title: "Feedback",
    currentQuestion: 3,
    totalQuestions: 10,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

export const CheckpointState: Story = {
  args: {
    title: "Checkpoint",
    currentQuestion: 5,
    totalQuestions: 10,
    showProgress: false,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};

export const FinalState: Story = {
  args: {
    title: "Results",
    currentQuestion: 10,
    totalQuestions: 10,
    showProgress: false,
    onBack: () => console.log("Back pressed"),
  },
};

// Pocas preguntas (testing visual con 3)
export const FewQuestions: Story = {
  args: {
    title: "Interview Session",
    currentQuestion: 2,
    totalQuestions: 3,
    showProgress: true,
    onBack: () => console.log("Back pressed"),
    onEnd: () => console.log("End pressed"),
  },
};
