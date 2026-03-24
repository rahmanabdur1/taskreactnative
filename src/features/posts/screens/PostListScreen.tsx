import React, { useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ErrorView } from "../../../components/ErrorView";
import { Loader } from "../../../components/Loader";
import { useCommentsStore } from "../../../store/commentsStore";
import { useLikesStore } from "../../../store/likesStore";
import { colors } from "../../../theme/colors";
import { fontSize, spacing } from "../../../theme/spacing";
import { Post } from "../../../types/Post";
import { useAuth } from "../../auth/hooks/useAuth";
import { PostCard } from "../components/PostCard";
import { usePosts } from "../hooks/usePosts";

interface Props {
  onPostPress: (post: Post) => void;
}

export const PostListScreen: React.FC<Props> = ({ onPostPress }) => {
  const { posts, isLoading, error, refetch } = usePosts();
  const { loadLikes } = useLikesStore();
  const { loadComments } = useCommentsStore();
  const { logout, user } = useAuth();

  useEffect(() => {
    loadLikes();
    loadComments();
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <ErrorView message={error} onRetry={refetch} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Posts</Text>
          <Text style={styles.subtitle}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => onPostPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.error + "15",
  },
  logoutText: {
    color: colors.error,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  list: {
    padding: spacing.md,
  },
});
