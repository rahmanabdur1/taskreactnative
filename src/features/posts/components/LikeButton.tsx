import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

interface Props {
  liked: boolean;
  onToggle: () => void;
}

export const LikeButton: React.FC<Props> = ({ liked, onToggle }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, liked && styles.liked]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{liked ? "❤️" : "🤍"}</Text>
      <Text style={[styles.label, liked && styles.likedLabel]}>
        {liked ? "Liked" : "Like"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  liked: {
    borderColor: colors.liked,
    backgroundColor: colors.liked + "15",
  },
  icon: { fontSize: 18 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  likedLabel: { color: colors.liked },
});
