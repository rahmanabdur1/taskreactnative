import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
