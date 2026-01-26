import { useCallback } from "react";

interface UseFinalReportLogicProps {
  readonly onHome: () => void;
  readonly onRetry: () => void;
  readonly onPractice: () => void;
}

/**
 * useFinalReportLogic
 * @description Hook que maneja la lógica del reporte final
 */
export function useFinalReportLogic({
  onHome,
  onRetry,
  onPractice,
}: UseFinalReportLogicProps) {
  const handleBack = useCallback(() => {
    onHome();
  }, [onHome]);

  const handleShare = useCallback(() => {
    // TODO: Implementar lógica de compartir
    console.log("Share report");
  }, []);

  const handleQuestionDetail = useCallback((questionId: string) => {
    // TODO: Navegar a pantalla de detalle
    console.log("View question detail:", questionId);
  }, []);

  const handleViewMetricDetail = useCallback(() => {
    // TODO: Navegar a vista detallada de métricas
    console.log("View metric detail");
  }, []);

  return {
    handleBack,
    handleShare,
    handleQuestionDetail,
    handleViewMetricDetail,
    onHome,
    onRetry,
    onPractice,
  };
}
