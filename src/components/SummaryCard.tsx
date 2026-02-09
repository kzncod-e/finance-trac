import { View } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";

export function Summary({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={[styles.cardValue, { color }]}>
        Rp {value.toLocaleString()}
      </Text>
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
