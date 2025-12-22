import { Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import {
  Bell,
  Plus,
  ArrowDown,
  CircleUser,
  Settings,
  Beaker,
  User,
} from "lucide-react-native";
import { green } from "react-native-reanimated/lib/typescript/Colors";
export default class Index extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 bg-black/70 text-white ">
        <View className="mx-3 p-5 flex  flex-col gap-4">
          <View className="flex   flex-row gap-5 ">
            <View className="flex flex-row gap-4">
              <View
                className="rounded-full flex items-center justify-center h-14 w-14 
 bg-black"
              >
                <User size={25} color={"white"} />
              </View>
              <View className="flex flex-col gap-1">
                <Text className="text-white text-lg font-semibold">
                  Good Morning
                </Text>
                <Text className="text-slate-300">Hi, Welcome Mohamad</Text>
              </View>
            </View>
            <View className="flex flex-row  w-full gap-7">
              <View
                className="rounded-full flex items-center justify-center h-14 w-14 
 bg-black"
              >
                <Bell size={25} color={"white"} />
              </View>
              <View
                className="rounded-full flex items-center justify-center h-14 w-14 
 bg-black"
              >
                <Settings size={25} color={"white"} />
              </View>
            </View>
          </View>
          <View className="w-63 bg-black px-6 py-6 flex  rounded-2xl  h-44">
            {/* backdrop-filter: blur(5px) */}

            {/* background + border */}
            <View className="flex gap-2">
              <Text className="text-slate-300 font-semibold text-[1.1rem]">
                Total Balance:{" "}
              </Text>
              <Text className="text-white font-bold text-[2.7rem]">
                $24,580.32
              </Text>
              <View className="flex flex-row gap-1 items-center">
                <ArrowDown size={20} color={"#4ade80"} />
                <View className="flex flex-row gap-2">
                  <Text className="text-green-400 flex flex-row gap-3 font-semibold text-[1rem]">
                    +12.5%
                  </Text>
                  <Text className="text-slate-300"> last month</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
