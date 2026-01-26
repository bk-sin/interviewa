import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import { ThemedText } from "@/src/shared/components";
import { colors, rgba, spacing } from "@/src/theme";
import type { InterviewReportData } from "@/src/types";

interface FinalReportScreenProps {
  readonly data: InterviewReportData;
  readonly onBack: () => void;
  readonly onShare: () => void;
  readonly onQuestionDetail: (questionId: string) => void;
  readonly onViewMetricDetail: () => void;
  readonly onHome: () => void;
  readonly onRetry: () => void;
  readonly onPractice: () => void;
}

// Componente para Barras de Progreso
const StatBar = React.memo<{
  label: string;
  score: string;
  color: string;
  widthPercent: number;
}>(({ label, score, color, widthPercent }) => (
  <View style={styles.statRow}>
    <View style={styles.statHeader}>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      <ThemedText style={styles.statScore}>{score}</ThemedText>
    </View>
    <View style={styles.progressBarBg}>
      <View
        style={[
          styles.progressBarFill,
          { backgroundColor: color, width: `${widthPercent}%` },
        ]}
      />
    </View>
  </View>
));

StatBar.displayName = "StatBar";

// Componente para Tarjeta de Pregunta
const QuestionCard = React.memo<{
  number: string;
  score: string;
  scoreColor: string;
  text: string;
  tags: readonly { label: string; bg: string; text: string }[];
  onPress: () => void;
}>(({ number, score, scoreColor, text, tags, onPress }) => (
  <TouchableOpacity style={styles.questionCard} onPress={onPress}>
    <View style={styles.questionHeader}>
      <ThemedText style={styles.questionNumber}>PREGUNTA {number}</ThemedText>
      <View style={styles.scoreBadge}>
        <ThemedText style={[styles.scoreText, { color: scoreColor }]}>
          {score}
        </ThemedText>
        <MaterialIcons name="chevron-right" size={18} color={scoreColor} />
      </View>
    </View>
    <ThemedText style={styles.questionText}>{text}</ThemedText>
    <View style={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={[styles.tag, { backgroundColor: tag.bg }]}>
          <ThemedText style={[styles.tagText, { color: tag.text }]}>
            {tag.label}
          </ThemedText>
        </View>
      ))}
    </View>
  </TouchableOpacity>
));

QuestionCard.displayName = "QuestionCard";

/**
 * FinalReportScreen
 * @description Pantalla principal del reporte final con diseño cyberpunk
 */
export default function FinalReportScreen({
  data,
  onBack,
  onShare,
  onQuestionDetail,
  onViewMetricDetail,
  onHome,
  onRetry,
  onPractice,
}: FinalReportScreenProps) {
  // Calcular strokeDashoffset basado en el puntaje (0-10)
  const circleCircumference = 2 * Math.PI * 60; // radio 60
  const progressPercent = (data.totalScore / 10) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * progressPercent) / 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background.dark}
      />

      {/* Header Fijo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text.muted} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Reporte Final</ThemedText>
        <TouchableOpacity style={styles.iconButton} onPress={onShare}>
          <MaterialIcons name="share" size={24} color={colors.text.muted} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SCORE SECTION */}
        <View style={styles.heroSection}>
          <ThemedText style={styles.title}>¡Buen trabajo! 🎉</ThemedText>
          <ThemedText style={styles.subtitle}>
            Has completado tu entrevista simulada.
          </ThemedText>

          {/* Círculo de Puntaje con SVG */}
          <View style={styles.scoreContainer}>
            <View style={styles.scoreBackgroundBlur} />
            <View style={styles.scoreCircleWrapper}>
              <Svg height="140" width="140" viewBox="0 0 128 128">
                {/* Círculo Fondo */}
                <Circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke={rgba(colors.primary, 0.2)}
                  strokeWidth="4"
                  fill="none"
                />
                {/* Círculo Progreso */}
                <Circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke={colors.primary}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="64, 64"
                />
              </Svg>
              <View style={styles.scoreTextContainer}>
                <ThemedText style={styles.bigScore}>
                  {data.totalScore}
                </ThemedText>
                <ThemedText style={styles.scoreLabel}>PUNTAJE</ThemedText>
              </View>
            </View>
          </View>

          {/* Insight Card */}
          <View style={styles.insightCard}>
            <View style={styles.insightRow}>
              <MaterialIcons
                name="auto-awesome"
                size={20}
                color={colors.primary}
                style={{ marginTop: 2 }}
              />
              <View style={styles.insightContent}>
                <ThemedText style={styles.insightTitle}>
                  Insight Clave
                </ThemedText>
                <ThemedText style={styles.insightText}>
                  {data.insight}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* PERFORMANCE BARS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              Desempeño por área
            </ThemedText>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={onViewMetricDetail}
            >
              <ThemedText style={styles.linkText}>Ver detalle</ThemedText>
              <MaterialIcons
                name="arrow-forward"
                size={14}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            {data.metrics.map((metric) => {
              const scoreColor = metric.color
                ? metric.color
                : metric.score >= 8
                  ? colors.primary
                  : metric.score >= 6
                    ? "#FACC15"
                    : "#FB923C";
              return (
                <StatBar
                  key={metric.label}
                  label={metric.label}
                  score={metric.score.toFixed(1)}
                  color={scoreColor}
                  widthPercent={metric.score * 10}
                />
              );
            })}
          </View>
        </View>

        {/* STRENGTHS & OPPORTUNITIES */}
        <View style={styles.gridSection}>
          {/* Strengths */}
          <View style={styles.gridCardStrengths}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons name="thumb-up" size={20} color={colors.primary} />
              <ThemedText style={styles.cardTitle}>Puntos Fuertes</ThemedText>
            </View>
            {data.strengths.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <View
                  style={[styles.dot, { backgroundColor: colors.primary }]}
                />
                <ThemedText style={styles.listText}>{item}</ThemedText>
              </View>
            ))}
          </View>

          {/* Opportunities */}
          <View style={styles.gridCardOpportunities}>
            <View style={styles.cardTitleRow}>
              <MaterialIcons
                name="fitness-center"
                size={20}
                color="#FB923C"
              />
              <ThemedText style={styles.cardTitle}>Oportunidades</ThemedText>
            </View>
            {data.opportunities.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <View style={[styles.dot, { backgroundColor: "#FB923C" }]} />
                <ThemedText style={styles.listText}>{item}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* QUESTIONS DETAIL */}
        <View style={[styles.section, { marginBottom: 120 }]}>
          <ThemedText style={[styles.sectionTitle, { marginBottom: 16 }]}>
            Preguntas en detalle
          </ThemedText>

          <View style={{ gap: 12 }}>
            {data.questions.map((q, i) => {
              const scoreColor = q.score >= 8 ? colors.primary : "#FACC15";
              const questionTags = q.tags.map((tag) => {
                // Determinar estilo del tag basado en el nombre
                const isHighlight = q.score >= 8;
                return {
                  label: tag,
                  bg: isHighlight
                    ? rgba(colors.primary, 0.1)
                    : "rgba(255, 255, 255, 0.05)",
                  text: isHighlight ? colors.primary : colors.text.muted,
                };
              });

              return (
                <QuestionCard
                  key={q.id}
                  number={(i + 1).toString()}
                  score={q.score.toString()}
                  scoreColor={scoreColor}
                  text={`"${q.question}"`}
                  tags={questionTags}
                  onPress={() => onQuestionDetail(q.id)}
                />
              );
            })}
          </View>

          <TouchableOpacity style={styles.expandButton}>
            <ThemedText style={styles.expandText}>
              Ver todas las preguntas
            </ThemedText>
            <MaterialIcons
              name="expand-more"
              size={16}
              color={colors.text.muted}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FOOTER ACTIONS */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <TouchableOpacity onPress={onRetry} style={styles.secondaryButton}>
            <MaterialIcons name="replay" size={20} color="#fff" />
            <ThemedText style={styles.secondaryButtonText}>
              Repetir
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPractice} style={styles.secondaryButton}>
            <MaterialIcons name="bolt" size={20} color="#fff" />
            <ThemedText style={styles.secondaryButtonText}>
              Practicar
            </ThemedText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={onHome}>
          <ThemedText style={styles.primaryButtonText}>
            Volver al Home
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    backgroundColor: rgba(colors.background.dark, 0.95),
    borderBottomWidth: 1,
    borderBottomColor: rgba(colors.text.primary, 0.05),
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  iconButton: {
    padding: spacing.sm,
    borderRadius: 20,
    backgroundColor: rgba(colors.text.primary, 0.05),
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  heroSection: {
    padding: spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    color: colors.text.muted,
    fontSize: 14,
    marginBottom: spacing.xl,
  },
  scoreContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  scoreBackgroundBlur: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    opacity: 0.1,
  },
  scoreCircleWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.background.card,
    borderWidth: 4,
    borderColor: rgba(colors.primary, 0.2),
    alignItems: "center",
    justifyContent: "center",
  },
  scoreTextContainer: {
    position: "absolute",
    alignItems: "center",
  },
  bigScore: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.text.primary,
  },
  scoreLabel: {
    fontSize: 10,
    color: colors.text.muted,
    textTransform: "uppercase",
    fontWeight: "500",
    marginTop: spacing.xs,
  },
  insightCard: {
    backgroundColor: colors.background.card,
    borderColor: rgba(colors.primary, 0.2),
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    width: "100%",
  },
  insightRow: {
    flexDirection: "row",
    gap: spacing.base,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    color: colors.text.primary,
    fontWeight: "600",
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  insightText: {
    color: colors.text.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  section: {
    paddingHorizontal: spacing.xl,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "500",
    marginRight: 2,
  },
  statsContainer: {
    gap: spacing.lg,
  },
  statRow: {
    width: "100%",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: rgba(colors.text.primary, 0.8),
    fontSize: 14,
  },
  statScore: {
    color: colors.text.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    width: "100%",
    backgroundColor: rgba(colors.primary, 0.1),
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  gridSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: 32,
  },
  gridCardStrengths: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
    backgroundColor: "rgba(28, 56, 47, 0.5)",
    borderColor: rgba(colors.primary, 0.2),
  },
  gridCardOpportunities: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
    backgroundColor: "rgba(56, 47, 28, 0.3)",
    borderColor: "rgba(251, 146, 60, 0.2)",
    marginTop: spacing.lg,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  cardTitle: {
    fontWeight: "bold",
    color: colors.text.primary,
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  listText: {
    fontSize: 14,
    color: rgba(colors.text.primary, 0.8),
    flex: 1,
  },
  questionCard: {
    backgroundColor: colors.background.card,
    borderColor: rgba(colors.primary, 0.1),
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  questionNumber: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.text.muted,
    letterSpacing: 0.5,
  },
  scoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "500",
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  expandText: {
    color: colors.text.muted,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: rgba(colors.background.dark, 0.95),
    borderTopWidth: 1,
    borderTopColor: rgba(colors.text.primary, 0.05),
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.base,
    marginBottom: spacing.base,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.base,
    borderRadius: 12,
    backgroundColor: rgba(colors.text.primary, 0.05),
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
  },
  secondaryButtonText: {
    color: colors.text.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.background.dark,
    fontWeight: "bold",
    fontSize: 16,
  },
});
