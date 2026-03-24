import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { usePostDetail } from '../hooks/usePostDetail';
import { LikeButton } from '../components/LikeButton';
import { CommentItem } from '../components/CommentItem';
import { Loader } from '../../../components/Loader';
import { ErrorView } from '../../../components/ErrorView';
import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/spacing';

interface Props {
  postId: number;
  onBack: () => void;
}

export const PostDetailScreen: React.FC<Props> = ({ postId, onBack }) => {
  const { post, isLoading, error, liked, toggleLike, comments, addComment } =
    usePostDetail(postId);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(commentText.trim());
      setCommentText('');
      Keyboard.dismiss();
    }
  };

  if (isLoading) return <Loader />;
  if (error || !post) return <ErrorView message={error || 'Post not found'} />;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flex}>

     
          <View style={styles.navBar}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.navTitle}>Post #{post.id}</Text>
            <View style={{ width: 60 }} />
          </View>

     
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
       
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody}>{post.body}</Text>
              <View style={styles.likeRow}>
                <LikeButton liked={liked} onToggle={toggleLike} />
              </View>
            </View>

    
            <Text style={styles.commentsTitle}>
              Comments ({comments.length})
            </Text>

         
            {comments.length === 0 && (
              <View style={styles.emptyComments}>
                <Text style={styles.emptyText}>
                  No comments yet. Be the first!
                </Text>
              </View>
            )}

          
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}

            <View style={{ height: 20 }} />
          </ScrollView>


          <View style={styles.inputRow}>
            <TextInput
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Write a comment..."
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={300}
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                !commentText.trim() && styles.sendBtnDisabled,
              ]}
              onPress={handleAddComment}
              disabled={!commentText.trim()}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { padding: spacing.sm },
  backText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  navTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
  container: { flex: 1 },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  postCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  postTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    lineHeight: 26,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  likeRow: { alignItems: 'flex-start' },
  commentsTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyComments: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  inputRow: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.sm,
    color: colors.text,
    backgroundColor: colors.background,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
});