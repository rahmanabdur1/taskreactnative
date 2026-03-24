import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../../components/Card";
import { useLikesStore } from "../../../store/likesStore";
import { colors } from "../../../theme/colors";
import { fontSize, spacing } from "../../../theme/spacing";
import { Post } from "../../../types/Post";

interface Props {
  post: Post;
  onPress: () => void;
}

export const PostCard: React.FC<Props> = ({ post, onPress }) => {
  const { isLiked } = useLikesStore();
  const liked = isLiked(post.id);

  return (
    <Card onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>#{post.id}</Text>
        </View>
        {liked && <Text style={styles.heart}>❤️</Text>}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
      <Text style={styles.readMore}>Read more →</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  idBadge: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 20,
  },
  idText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: "600",
  },
  heart: { fontSize: 16 },
  title: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 22,
    textTransform: "capitalize",
  },
  body: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  readMore: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: "600",
  },
});
