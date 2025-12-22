import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { addExpense } from "temporarydb";

export default function AddExpenseModal() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [form, setForm] = useState({
    amount: "",
    category: "",
    note: "",
  });
  const handleAddExpense = () => {
    addExpense(form);
  };
  return (
    <View className="flex-1 bg-black/30 justify-end">
      {/* MODAL */}
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-[17px] font-semibold text-black">
            Add Expense
          </Text>
          <Pressable onPress={() => router.back()}>
            <X size={20} color="#000" />
          </Pressable>
        </View>

        {/* Amount */}
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="numeric"
          placeholderTextColor="#9ca3af"
          className="text-3xl font-semibold text-black mb-10"
        />

        {/* Divider */}
        <View className="h-px bg-black/10 mb-8" />

        {/* Category */}
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={{ marginBottom: 2 }}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Transport" value="transport" />
          <Picker.Item label="Entertainment" value="entertainment" />
        </Picker>

        {/* Note */}
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Note (optional)"
          placeholderTextColor="#9ca3af"
          className="text-base text-black mb-10"
        />

        {/* Save Button */}
        <Pressable className="bg-black rounded-full py-4">
          <Text className="text-white text-center text-base font-medium">
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
