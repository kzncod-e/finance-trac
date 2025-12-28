import React, { useCallback, useRef, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "expo-router";
import { Bell, Settings, User, ArrowDown, ArrowUp } from "lucide-react-native";

import ExpenseItem from "@/components/Expense-item";
import { Expense, getExpenses } from "temporarydb";
import MonthSelectorSheet from "@/components/MonthSelectorSheet";

export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const monthSheetRef = useRef<BottomSheet>(null);
  const monthLabel = (value: string) => {
    const [year, month] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };
  const loadExpenses = async () => {
    const data = await getExpenses({ month: selectedMonth });
    setExpenses(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-black">
        {/* ================= HOME CONTENT ================= */}
        <View className="px-4 pt-4 gap-6">
          {/* HEADER */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-4 items-center">
              <View className="h-14 w-14 rounded-full bg-neutral-900 items-center justify-center">
                <User color="white" />
              </View>
              <View>
                <Text className="text-white text-lg font-semibold">
                  Good Morning
                </Text>
                <Text className="text-slate-400">Hi, Welcome Mohamad</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="h-14 w-14 rounded-full bg-neutral-900 items-center justify-center">
                <Bell color="white" />
              </View>
              <View className="h-14 w-14 rounded-full bg-neutral-900 items-center justify-center">
                <Settings color="white" />
              </View>
            </View>
          </View>

          {/* TOTAL BALANCE */}
          <View className="bg-neutral-900 rounded-2xl p-6 gap-2">
            <Text className="text-slate-400 font-semibold">Total Balance</Text>
            <Text className="text-white text-4xl font-bold">$24,580.32</Text>
            <View className="flex-row items-center gap-2">
              <ArrowDown size={18} color="#4ade80" />
              <Text className="text-green-400 font-semibold">+12.5%</Text>
              <Text className="text-slate-400">last month</Text>
            </View>
          </View>

          {/* INCOME / EXPENSE */}
          <View className="flex-row gap-4">
            <View className="flex-1 bg-neutral-900 rounded-2xl p-4 gap-4">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 rounded-full bg-green-400/20 items-center justify-center">
                  <ArrowDown color="green" />
                </View>
                <Text className="text-slate-400 font-semibold">This Month</Text>
              </View>
              <Text className="text-slate-400">Income</Text>
              <Text className="text-white text-3xl font-bold">$8,240</Text>
            </View>

            <View className="flex-1 bg-neutral-900 rounded-2xl p-4 gap-4">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 rounded-full bg-red-400/20 items-center justify-center">
                  <ArrowUp color="red" />
                </View>
                <Text className="text-slate-400 font-semibold">This Month</Text>
              </View>
              <Text className="text-slate-400">Expense</Text>
              <Text className="text-white text-3xl font-bold">$8,240</Text>
            </View>
          </View>

          {/* THIS MONTH TRIGGER */}
          <Pressable
            onPress={() => bottomSheetRef.current?.snapToIndex(1)}
            className="items-center mt-2"
          >
            <Text className="text-blue-400 font-semibold text-lg">
              This Month Transaction ▾
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => monthSheetRef.current?.snapToIndex(0)}
          className="items-center mt-2"
        >
          <Text className="text-blue-400 font-semibold text-lg">
            {monthLabel(selectedMonth)} ▾
          </Text>
        </Pressable>
        {/* ================= BOTTOM SHEET ================= */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["30%", "80%"]}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "#111" }}
          handleIndicatorStyle={{ backgroundColor: "#555" }}
        >
          <BottomSheetView style={styles.sheetContent}>
            <View className="flex-row justify-between mb-4">
              <Text className="text-white text-xl font-bold">
                Recent Transactions
              </Text>
            </View>

            {expenses.length === 0 ? (
              <Text className="text-slate-400 text-center mt-6">
                No transactions yet
              </Text>
            ) : (
              <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExpenseItem item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            )}
          </BottomSheetView>
        </BottomSheet>
        <MonthSelectorSheet
          sheetRef={monthSheetRef && monthSheetRef}
          selectedMonth={selectedMonth}
          onSelect={setSelectedMonth}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flex: 1,
  },
});
