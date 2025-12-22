import { View, Text } from "react-native";
import { Expense } from "temporarydb";

export default function ExpenseItem({ item }: { item: Expense }) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-black/5">
      <View className="flex-row justify-between items-center">
        {/* LEFT */}
        <View className="flex-row items-center gap-3">
          {/* ICON */}
          <View className="w-10 h-10 rounded-full bg-black/10 items-center justify-center">
            <Text className="text-base">🍔</Text>
          </View>

          {/* TEXT */}
          <View>
            <Text className="text-base font-semibold capitalize text-black">
              {item.category}
            </Text>

            {item.note && (
              <Text className="text-xs text-gray-500 mt-0.5">{item.note}</Text>
            )}
          </View>
        </View>

        {/* RIGHT */}
        <Text className="text-base font-semibold text-red-600">
          - Rp {Number(item.amount).toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
}
