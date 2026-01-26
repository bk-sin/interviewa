import React from "react";
import { router } from "expo-router";

import {
  FinalReportScreen,
  MOCK_REPORT_DATA,
  useFinalReportLogic,
} from "@/src/features/interview";

/**
 * FinalReportStep
 * @description Contenedor del reporte final con inyección de datos
 */
export default function FinalReportStep() {
  const {
    handleBack,
    handleShare,
    handleQuestionDetail,
    handleViewMetricDetail,
    onHome,
    onRetry,
    onPractice,
  } = useFinalReportLogic({
    onHome: () => router.replace("/(tabs)"),
    onRetry: () => router.replace("/interview/config-role"),
    onPractice: () => router.replace("/(tabs)/practices"),
  });

  return (
    <FinalReportScreen
      data={MOCK_REPORT_DATA}
      onBack={handleBack}
      onShare={handleShare}
      onQuestionDetail={handleQuestionDetail}
      onViewMetricDetail={handleViewMetricDetail}
      onHome={onHome}
      onRetry={onRetry}
      onPractice={onPractice}
    />
  );
}
