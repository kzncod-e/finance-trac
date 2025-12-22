import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { House, Plus, User } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#4f46e5",
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

        {/* ADD (tengah & gede) */}

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
      <View className="absolute bottom-40 right-6">
        <Pressable
          onPress={() => router.push("/add-expense")}
          className="w-14 h-14 bg-white  rounded-full items-center justify-center"
        >
          <Plus size={22} color="black" />
        </Pressable>
      </View>
    </>
  );
}
