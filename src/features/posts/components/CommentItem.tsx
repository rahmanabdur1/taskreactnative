import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../theme/colors";
import { fontSize, spacing } from "../../../theme/spacing";
import { Comment } from "../../../types/Post";

interface Props {
  comment: Comment;
}

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const date = new Date(comment.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{comment.text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: 12,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
