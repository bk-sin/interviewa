import { Text, ThemedView } from "@/src/shared";
import { fontSizes, spacing, theme } from "@/src/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Footer, InterviewHeaderContainer } from "../components";
import { AudioBar } from "../components/audio-bar";

// Importación condicional de expo-speech-recognition
let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const speechRecognition = require("expo-speech-recognition");
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch {
  console.warn("⚠️ expo-speech-recognition no disponible en Expo Go");
  console.warn("📱 Para transcripción, ejecuta: npx expo run:android");
}

export default function InterviewScreen() {
  // ========================================
  // CONFIGURACIÓN DE SENSIBILIDAD DEL AUDIO
  // ========================================
  const AUDIO_CONFIG = {
    // Rango de decibelios a considerar
    minDb: -60, // Más alto = más sensible (ej: -40), más bajo = menos sensible (ej: -60)

    // Curva de respuesta (exponente)
    volumeCurve: 1.5, // Más alto = más dramático (ej: 2.0), más bajo = más lineal (ej: 1.0)

    // Multiplicadores por frecuencia (cuánto se amplifican)
    bassMultiplier: 1.3, // Graves: Reducido de 1.5 a 1.3 para transición más suave
    midMultiplier: 1.2, // Medias: 1.2x
    trebleMultiplier: 1.4, // Agudas: 1.4x más grande con volumen medio

    // Umbral de activación (0-1)
    bassThreshold: 0.3, // Graves: Reducido de 0.4 a 0.3 para activación más temprana y gradual
    trebleThreshold: 0.6, // Agudas se activan cuando volumen < 0.6

    // Reducción cuando no están activas
    bassInactive: 0.4, // Graves: Aumentado de 0.2 a 0.4 para menor contraste
    trebleInactive: 0.3, // Agudas cuando el volumen es muy alto

    // Velocidad de animación (ms)
    animationDuration: 60, // Más bajo = más rápido (ej: 40), más alto = más suave (ej: 100)
  };

  // 1. TRES referencias de animación: una por rango de frecuencia
  const bassVolumeAnim = useRef(new Animated.Value(0)).current; // Graves (0-250Hz)
  const midVolumeAnim = useRef(new Animated.Value(0)).current; // Medias (250Hz-4kHz)
  const trebleVolumeAnim = useRef(new Animated.Value(0)).current; // Agudas (4kHz+)

  // Usamos una ref para la grabación activa para poder limpiarla al salir
  const recordingInstanceRef = useRef<Audio.Recording | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [isSpeechRecognitionAvailable] = useState(
    ExpoSpeechRecognitionModule !== null && useSpeechRecognitionEvent !== null
  );

  const waveformBase = [
    16, 32, 24, 48, 80, 40, 112, 64, 128, 96, 144, 80, 112, 56, 96, 32, 48, 20,
    36, 16,
  ];

  // ========================================
  // CONFIGURACIÓN DE SPEECH RECOGNITION
  // ========================================
  // Solo configurar eventos si el módulo está disponible
  if (useSpeechRecognitionEvent) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpeechRecognitionEvent("start", () => {
      console.log("🎤 Speech recognition started");
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpeechRecognitionEvent("end", () => {
      console.log("🛑 Speech recognition ended");
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpeechRecognitionEvent("result", (event: any) => {
      console.log("📝 Result:", event.results[0]?.transcript);
      setTranscript(event.results[0]?.transcript || "");
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpeechRecognitionEvent("error", (event: any) => {
      console.error("❌ Speech recognition error:", event.error, event.message);
    });
  }

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        const perm = await requestPermission();
        if (!perm.granted) return;
      }

      // Solicitar permisos de speech recognition (solo si está disponible)
      if (ExpoSpeechRecognitionModule && isSpeechRecognitionAvailable) {
        try {
          const speechPermission =
            await ExpoSpeechRecognitionModule.requestPermissionsAsync();

          if (!speechPermission.granted) {
            console.warn("⚠️ Permisos de reconocimiento de voz no otorgados");
          } else {
            // Iniciar reconocimiento de voz
            ExpoSpeechRecognitionModule.start({
              lang: "es-AR",
              interimResults: true,
              continuous: true,
              maxAlternatives: 1,
            });
          }
        } catch (speechError) {
          console.warn(
            "⚠️ No se pudo iniciar speech recognition:",
            speechError
          );
        }
      } else {
        console.log("📝 Speech recognition no disponible, solo grabando audio");
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        (status) => {
          if (status.isRecording) {
            const metering = status.metering || -100;

            // Física de volumen usando configuración
            const dbRange = Math.max(metering, AUDIO_CONFIG.minDb);

            // Convertimos a 0-1
            let normalizedVolume =
              (dbRange - AUDIO_CONFIG.minDb) / (0 - AUDIO_CONFIG.minDb);

            // Aplicamos la curva de respuesta configurada
            normalizedVolume = Math.pow(
              normalizedVolume,
              AUDIO_CONFIG.volumeCurve
            );

            // SIMULACIÓN DE FRECUENCIAS SEPARADAS usando configuración

            // Graves (Izquierda): Transición gradual en lugar de abrupta
            // Usamos una curva suave que empieza antes pero crece progresivamente
            const bassProgress = Math.max(
              0,
              (normalizedVolume - AUDIO_CONFIG.bassThreshold) /
                (1 - AUDIO_CONFIG.bassThreshold)
            );
            const bassIntensity =
              AUDIO_CONFIG.bassInactive * normalizedVolume +
              bassProgress *
                (AUDIO_CONFIG.bassMultiplier - AUDIO_CONFIG.bassInactive) *
                normalizedVolume;

            // Medias (Centro): Responden uniformemente con multiplicador
            const midIntensity = normalizedVolume * AUDIO_CONFIG.midMultiplier;

            // Agudas (Derecha): También con transición gradual
            const trebleProgress = Math.max(
              0,
              (AUDIO_CONFIG.trebleThreshold - normalizedVolume) /
                AUDIO_CONFIG.trebleThreshold
            );
            const trebleIntensity =
              AUDIO_CONFIG.trebleInactive * normalizedVolume +
              trebleProgress *
                (AUDIO_CONFIG.trebleMultiplier - AUDIO_CONFIG.trebleInactive) *
                normalizedVolume;

            // Animamos con la duración configurada
            Animated.parallel([
              Animated.timing(bassVolumeAnim, {
                toValue: bassIntensity,
                duration: AUDIO_CONFIG.animationDuration,
                useNativeDriver: false,
              }),
              Animated.timing(midVolumeAnim, {
                toValue: midIntensity,
                duration: AUDIO_CONFIG.animationDuration,
                useNativeDriver: false,
              }),
              Animated.timing(trebleVolumeAnim, {
                toValue: trebleIntensity,
                duration: AUDIO_CONFIG.animationDuration,
                useNativeDriver: false,
              }),
            ]).start();
          }
        },
        100
      );

      // Guardamos la instancia en la Ref y en el Estado
      recordingInstanceRef.current = recording;
      setIsRecording(true);
      console.log("Grabación iniciada");
    } catch (err) {
      console.error("Error al iniciar grabación", err);
    }
  }

  async function stopRecording() {
    // Verificamos la referencia, no solo el estado
    if (!recordingInstanceRef.current) return;

    console.log("Deteniendo grabación...");

    try {
      // Detener speech recognition (solo si está disponible)
      if (ExpoSpeechRecognitionModule && isSpeechRecognitionAvailable) {
        try {
          ExpoSpeechRecognitionModule.stop();
        } catch (speechError) {
          console.warn("⚠️ Error al detener speech recognition:", speechError);
        }
      }

      await recordingInstanceRef.current.stopAndUnloadAsync();
      const uri = recordingInstanceRef.current.getURI();
      console.log("Grabación guardada en:", uri);

      // Animamos todas las barras a su estado más bajo
      Animated.parallel([
        Animated.timing(bassVolumeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(midVolumeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(trebleVolumeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

      // Limpiamos referencias
      recordingInstanceRef.current = null;
      setIsRecording(false);
    } catch (error) {
      console.log("Error al detener", error);
    }
  }

  useEffect(() => {
    startRecording();

    // Cleanup function: Se ejecuta si el componente se desmonta
    return () => {
      if (recordingInstanceRef.current) {
        stopRecording();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemedView style={styles.container}>
      <InterviewHeaderContainer />

      <View style={styles.mainContent}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            Contame de un conflicto que tuviste que resolver en tu equipo.
          </Text>
          <Text style={styles.questionDescription}>
            Podés describir la situación, las acciones que tomaste y cuál fue el
            resultado.
          </Text>

          <View style={styles.timerContainer}>
            <MaterialIcons
              name="timer"
              size={20}
              color={theme.colors.primary}
              style={styles.timerIcon}
            />
            <Text style={styles.timerText}>Recomendado: 60–90 segundos</Text>
          </View>
        </View>

        <View style={styles.waveformContainer}>
          <View style={styles.waveformRow}>
            {waveformBase.map((height, idx) => (
              <AudioBar
                key={idx}
                index={idx}
                totalBars={waveformBase.length}
                baseHeight={height}
                bassVolumeAnim={bassVolumeAnim}
                midVolumeAnim={midVolumeAnim}
                trebleVolumeAnim={trebleVolumeAnim}
              />
            ))}
          </View>

          {/* Transcripción en tiempo real */}
          {transcript && (
            <View style={styles.transcriptionContainer}>
              <Text style={styles.transcriptionLabel}>Transcripción:</Text>
              <Text style={styles.transcriptionText}>
                {transcript}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Footer
        buttons={[
          {
            label: isRecording ? "Detener" : "Repetir", // Cambia etiqueta según estado
            onPress: isRecording ? stopRecording : () => startRecording(),
            leftIcon: isRecording ? "stop" : "replay",
            variant: "secondary",
          },
          {
            label: "Siguiente",
            onPress: () => {},
            variant: "secondary",
            disabled: true,
          },
        ]}
        layout="row"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Asegúrate de que theme.colors.background.dark exista, si no usa '#10221c'
    backgroundColor: theme.colors.background?.dark || "#10221c",
  },
  mainContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  questionContainer: {
    marginBottom: theme.spacing.xl,
    alignItems: "center",
  },
  questionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  questionDescription: {
    ...theme.typography.body,
    color: theme.colors.text.muted,
    textAlign: "center",
    lineHeight: 24,
  },
  timerContainer: {
    marginTop: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  timerIcon: {
    opacity: 0.8,
  },
  timerText: {
    ...theme.typography.bodySmall,
    fontSize: fontSizes.xs,
    color: theme.colors.primary,
    fontWeight: "500",
    opacity: 0.8,
  },
  waveformContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Añadido para centrar verticalmente
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: spacing["5xl"],
  },
  waveformRow: {
    height: 200, // Altura fija para contener la animación
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centrar barras horizontalmente
  },
  transcriptionContainer: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.md,
    backgroundColor: theme.rgba(theme.colors.background.card, 0.3),
    borderRadius: theme.borderRadius.base,
    width: "100%",
  },
  transcriptionLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    fontWeight: "600",
  },
  transcriptionText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    lineHeight: 24,
  },
});
