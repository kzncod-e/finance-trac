import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { House, Plus, User } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="light" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#38bdf8", // biru aktif
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            position: "absolute",

            left: 16,
            right: 16,
            height: 72,
            backgroundColor: "#1f1f1f",
            borderRadius: 20,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 2,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <House color={color} size={size} />
            ),
          }}
        />

        {/* TAB TENGAH DISEMBUNYIKAN */}
        <Tabs.Screen
          name="add-expense"
          options={{
            title: "",
            tabBarButton: () => null,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>

      {/* FLOATING ADD BUTTON */}
      <View
        style={{
          position: "absolute",
          bottom: 26,
          alignSelf: "center",
        }}
      >
        <Pressable
          onPress={() => router.push("/add-expense")}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#38bdf8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Plus size={28} color="#000" />
        </Pressable>
      </View>
    </>
  );
}
