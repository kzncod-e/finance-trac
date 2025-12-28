import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { addExpense, ExpenseRequest } from "temporarydb";

export default function AddExpenseModal() {
  const router = useRouter();

  const [form, setForm] = useState<ExpenseRequest>({
    amount: "",
    category: "food",
    note: "",
    type: "expense",
  });
  const handleAddExpense = () => {
    if (!form.amount || !form.category) return;
    addExpense(form);
    setForm({ amount: "", category: "food", note: "", type: "expense" });
    router.push("Home");
  };
  return (
    <View className="flex-1 bg-black/30 justify-center">
      {/* MODAL */}
      <View className="bg-white rounded-3xl px-6 mx-4 pt-6 pb-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-[17px] font-semibold text-black">
            Add Transaction
          </Text>
          <Pressable onPress={() => router.back()}>
            <X size={20} color="#000" />
          </Pressable>
        </View>

        {/* Amount */}
        <TextInput
          value={form.amount}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              amount: text.replace(/[^0-9]/g, ""),
            }))
          }
          placeholder="Amount"
          keyboardType="number-pad"
          placeholderTextColor="#9ca3af"
          className="text-3xl font-semibold text-black mb-10"
        />

        {/* Divider */}
        <View className="h-px bg-black/10 mb-8" />

        {/* Category */}
        <Picker
          selectedValue={form.category}
          onValueChange={(text) =>
            setForm((prev) => ({ ...prev, category: text }))
          }
          style={{ marginBottom: 2 }}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Transport" value="transport" />
          <Picker.Item label="Entertainment" value="other" />
        </Picker>
        <Picker
          selectedValue={form.category}
          onValueChange={(text) =>
            setForm((prev) => ({ ...prev, category: text }))
          }
          style={{ marginBottom: 2 }}
        >
          <Picker.Item label="Select transaction type" value="" />
          <Picker.Item label="Expense" value="expense" />
          <Picker.Item label="Income" value="income" />
        </Picker>

        {/* Note */}
        <TextInput
          value={form.note}
          onChangeText={(text) => setForm((prev) => ({ ...prev, note: text }))}
          placeholder="Note (optional)"
          placeholderTextColor="#9ca3af"
          className="text-base text-black mb-10"
        />

        {/* Save Button */}
        <Pressable
          onPress={handleAddExpense}
          className="bg-black rounded-full py-4"
        >
          <Text className="text-white text-center text-base font-medium">
            Add transaction
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
