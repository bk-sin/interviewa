import { useRouter } from "expo-router";

export const useSetupLogic = () => {
  const router = useRouter();

  const interviewStats = [
    { id: "duration", icon: "timer", value: "12", label: "MINUTES" },
    { id: "format", icon: "quiz", value: "15", label: "QUESTIONS" },
  ] as const;

  const focusGoals = [
    { icon: "visibility", title: "Clarity", description: "Clear, concise articulation of thoughts." },
    { icon: "account-tree", title: "Structure", description: "Logical and organized problem solving." },
    { icon: "psychology", title: "Confidence", description: "Professional delivery and poise." },
  ] as const;

  const handleStartInterview = () => {
    router.push("/interview/session");
  };

  const handleBack = () => router.back();

  return {
    interviewStats,
    focusGoals,
    handleStartInterview,
    handleBack,
  };
};