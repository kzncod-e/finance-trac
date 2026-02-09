import { Summary } from "@/components/SummaryCard";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Expense, getExpenses } from "temporarydb";

export default function MonthlyTransactionScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  useFocusEffect(
    useCallback(() => {
      getExpenses().then(setExpenses);
    }, [])
  );

  // Filter by selected month
  const monthlyData = useMemo(() => {
    return expenses.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }, [expenses, month, year]);

  // Split types
  const income = useMemo(
    () => monthlyData.filter((t) => t.type === "income"),
    [monthlyData]
  );

  const expense = useMemo(
    () => monthlyData.filter((t) => t.type === "expense"),
    [monthlyData]
  );

  // Totals
  const totalIncome = useMemo(
    () => income.reduce((sum, t) => sum + Number(t.amount), 0),
    [income]
  );

  const totalExpense = useMemo(
    () => expense.reduce((sum, t) => sum + Number(t.amount), 0),
    [expense]
  );

  const balance = totalIncome - totalExpense;

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <View style={styles.container}>
      {/* Month Selector */}
      <View style={styles.monthBar}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>

        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <Summary label="Income" value={totalIncome} color="#22c55e" />
        <Summary label="Expense" value={totalExpense} color="#ef4444" />
        <Summary label="Balance" value={balance} color="#3b82f6" />
      </View>

      {/* List */}
      <FlatList
        data={monthlyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No transactions this month</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.note}>{item.note || item.category}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>

            <Text
              style={[
                styles.amount,
                { color: item.type === "income" ? "#22c55e" : "#ef4444" },
              ]}
            >
              {item.type === "income" ? "+" : "-"} Rp{" "}
              {Number(item.amount).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
    padding: 16,
  },
  monthBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  arrow: {
    fontSize: 26,
    color: "#3b82f6",
    fontWeight: "bold",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  row: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  amount: {
    fontWeight: "700",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#9ca3af",
  },
});
