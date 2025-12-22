import { router, Slot, Stack } from "expo-router";

import React from "react";

import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";

import { View, Text } from "react-native";
import { Session } from "@supabase/supabase-js";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack.Screen name="sign-in"></Stack.Screen>
    </React.Fragment>
  );
}
