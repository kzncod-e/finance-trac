import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const MONTHS = [
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
];

const formatMonth = (value: string) => {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

type Props = {
  sheetRef: React.RefObject<BottomSheet>;
  selectedMonth: string;
  onSelect: (month: string) => void;
};

export default function MonthSelectorSheet({
  sheetRef,
  selectedMonth,
  onSelect,
}: Props) {
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["40%"]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: "#111" }}
      handleIndicatorStyle={{ backgroundColor: "#555" }}
    >
      <BottomSheetView className="px-4 pt-2">
        <Text className="text-white text-xl font-bold mb-4">Select Month</Text>

        <FlatList
          data={MONTHS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const active = item === selectedMonth;
            return (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  sheetRef.current?.close();
                }}
                className={`py-4 px-3 rounded-xl mb-2 ${
                  active ? "bg-blue-500/20" : ""
                }`}
              >
                <Text
                  className={`text-lg ${
                    active ? "text-blue-400 font-bold" : "text-slate-300"
                  }`}
                >
                  {formatMonth(item)}
                </Text>
              </Pressable>
            );
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
