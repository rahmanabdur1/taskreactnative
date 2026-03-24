import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { borderRadius, fontSize, spacing } from '../../../theme/spacing';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

export const GoogleSignInButton: React.FC<Props> = ({ onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.btn, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Text style={styles.icon}>G</Text>
    <Text style={styles.label}>Continue with Google</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    gap: spacing.sm,
    minHeight: 52,
  },
  disabled: { opacity: 0.5 },
  icon: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#4285F4',
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
});