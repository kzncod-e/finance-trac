import { Slot, Stack } from "expo-router";
import "../../global.css";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "./hooks/use-auth-context";
import { createTheme, ThemeProvider } from "@rneui/themed";
import AuthProvider from "./providers/auth-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreenController } from "@/components/splash-screen-controller";
const theme = createTheme({ darkColors: { black: "#0F172A" } });
function RootNavigator() {
  const { isLoggedIn } = useAuthContext();
  console.log(isLoggedIn, "ini auth");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-expense"
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
              headerShown: false,
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{}} />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
    </GestureHandlerRootView>
  );
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
