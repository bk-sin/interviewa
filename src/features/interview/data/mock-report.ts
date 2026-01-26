import type { InterviewReportData } from "@/src/types";

/**
 * Datos mockeados de reporte final
 * @description Simulando la respuesta de backend/AI
 */
export const MOCK_REPORT_DATA: InterviewReportData = {
  totalScore: 8.1,
  insight:
    "Tu confianza mejoró notablemente en las preguntas técnicas, aunque el ritmo disminuyó al hablar de debilidades.",
  metrics: [
    { label: "Claridad", score: 9.0 },
    { label: "Confianza", score: 8.5 },
    { label: "Estructura", score: 7.2, color: "#FACC15" },
    { label: "Storytelling", score: 6.8, color: "#FB923C" },
    { label: "Keywords", score: 9.2 },
  ],
  strengths: [
    "Uso excelente de terminología técnica.",
    "Tono de voz claro y profesional.",
  ],
  opportunities: [
    "Estructurar mejor las respuestas STAR.",
    'Reducir muletillas ("eh", "este") al dudar.',
  ],
  questions: [
    {
      id: "1",
      question: "Háblame sobre ti y tu experiencia.",
      score: 9.5,
      tags: ["Excelente inicio", "Conciso"],
    },
    {
      id: "2",
      question: "¿Cuál es tu mayor debilidad?",
      score: 7.0,
      tags: ["Mejorable", "Pocas pausas"],
    },
    {
      id: "3",
      question: "¿Por qué quieres trabajar aquí?",
      score: 8.8,
      tags: ["Muy apasionado"],
    },
  ],
};
