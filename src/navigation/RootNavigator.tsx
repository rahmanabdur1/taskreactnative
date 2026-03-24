import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../features/auth/hooks/useAuth";
import { colors } from "../theme/colors";
import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";

export const RootNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return user ? <MainStack /> : <AuthStack />;
};
