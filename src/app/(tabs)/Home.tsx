import { FlatList, Text, View } from "react-native";
import React, { Component, useCallback, useEffect, useState } from "react";
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
  ArrowUp,
} from "lucide-react-native";
import { Expense, getExpenses } from "temporarydb";
import { useFocusEffect } from "expo-router";

import ExpenseItem from "@/components/Expense-item";
export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );
  console.log(expenses, "<<<<<<<<<<");

  return (
    <SafeAreaView className="flex-1 bg-black/70 text-white ">
      <View className="mx-3 p-5 flex-1 flex-col gap-4">
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
        <View className="flex gap-10">
          {/* total balance  */}
          <View className=" bg-black px-6 py-6 flex  rounded-2xl  h-44">
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
          {/* end total balance */}
          {/* income outcome section */}
          <View className="flex  flex-row gap-8 max-w-64  ">
            <View className="flex  bg-black px-4 py-6 rounded-2xl  gap-4">
              <View className="flex flex-row items-center gap-4 ">
                <View className="rounded-full flex w-14  h-14 justify-center items-center bg-green-300/30">
                  <ArrowDown size={25} className="z-10" color={"green"} />
                </View>
                <Text className="text-slate-300 font-semibold">This Month</Text>
              </View>
              <View className="flex gap-4">
                <Text className="text-slate-300 font-semibold text-[1.1rem]">
                  Income
                </Text>
                <Text className="text-white font-bold text-4xl">$8,240</Text>
              </View>
            </View>
            <View className="flex  bg-black px-4 py-6 rounded-2xl  gap-4">
              <View className="flex flex-row items-center gap-4 ">
                <View className="rounded-full flex w-14  h-14 justify-center items-center bg-red-300/30">
                  <ArrowUp size={25} className="z-10" color={"red"} />
                </View>
                <Text className="text-slate-300 font-semibold">This Month</Text>
              </View>
              <View className="flex gap-4">
                <Text className="text-slate-300 font-semibold text-[1.1rem]">
                  Expense
                </Text>
                <Text className="text-white font-bold text-4xl">$8,240</Text>
              </View>
            </View>
          </View>
          {/* end income outcome section */}
          {/* recemnt transaction */}
          <View className="flex-1 w-full bg-black px-4 pt-6">
            {expenses.length === 0 ? (
              <Text className="text-white text-center mt-4">
                No expenses yet. Add some!
              </Text>
            ) : (
              <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExpenseItem item={item} />}
              />
            )}
          </View>
          {/* end reent transaaction */}
        </View>
      </View>
    </SafeAreaView>
  );
}
