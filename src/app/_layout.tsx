import { Slot, Stack } from "expo-router";
import "../../global.css";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "./hooks/use-auth-context";
import { createTheme, ThemeProvider } from "@rneui/themed";
import AuthProvider from "@/app/providers/auth-provider";
import { PortalHost } from "@rn-primitives/portal";
import * as SecureStore from "expo-secure-store";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreenController } from "@/components/splash-screen-controller";
import { useAuthStore } from "@/store/auth.store";
const theme = createTheme({ darkColors: { black: "#0F172A" } });
function RootNavigator() {
  const { isLoggedIn } = useAuthContext();
  // console.log(isLoggedIn, "ini auth");
  const { token, setToken } = useAuthStore();
  const getToken = async () => {
    const res = await SecureStore.getItemAsync("access_token");
    if (res) {
      setToken(res);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Protected guard={!!token}>
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
          <Stack.Protected guard={!token}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Screen name="+not-found" />
        </Stack>
        <PortalHost />
      </QueryClientProvider>
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
