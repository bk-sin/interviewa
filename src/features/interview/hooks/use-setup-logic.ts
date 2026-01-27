import { useInterviewNavigation } from "../utils/navigation";

export const useSetupLogic = () => {
  const { startSession, goBack } = useInterviewNavigation();

  const interviewStats = [
    { id: "duration", icon: "timer", value: "12", label: "MINUTES" },
    { id: "format", icon: "quiz", value: "15", label: "QUESTIONS" },
  ] as const;

  const focusGoals = [
    {
      icon: "visibility",
      title: "Clarity",
      description: "Clear, concise articulation of thoughts.",
    },
    {
      icon: "account-tree",
      title: "Structure",
      description: "Logical and organized problem solving.",
    },
    {
      icon: "psychology",
      title: "Confidence",
      description: "Professional delivery and poise.",
    },
  ] as const;

  const handleStartInterview = () => {
    startSession();
  };

  const handleBack = () => goBack();

  return {
    interviewStats,
    focusGoals,
    handleStartInterview,
    handleBack,
  };
};
