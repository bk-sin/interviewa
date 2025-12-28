import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/src/hooks/use-theme-color";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  darkColor?: string;
  edges?: ("top" | "right" | "bottom" | "left")[];
};

export function ThemedView({
  style,
  darkColor,
  edges = ["top"],
  children,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ dark: darkColor }, "background");

  return (
    <View
      style={[{ backgroundColor }, styles.container, style]}
      {...otherProps}
    >
      <SafeAreaView style={styles.container} edges={edges}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
