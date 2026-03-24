import React, { useState } from "react";
import { LoginScreen } from "../features/auth/screens/LoginScreen";
import { RegisterScreen } from "../features/auth/screens/RegisterScreen";

export const AuthStack: React.FC = () => {
  const [screen, setScreen] = useState<"login" | "register">("login");

  if (screen === "register") {
    return <RegisterScreen onNavigateToLogin={() => setScreen("login")} />;
  }

  return <LoginScreen onNavigateToRegister={() => setScreen("register")} />;
};
