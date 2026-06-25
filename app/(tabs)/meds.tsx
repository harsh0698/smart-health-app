import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Meds() {

  const medicines = [
    { name: "Paracetamol", time: "8:00 AM" },
    { name: "Vitamin D", time: "2:00 PM" },
    { name: "BP Tablet", time: "9:00 PM" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Medicines</Text>

      {medicines.map((med, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>💊 {med.name}</Text>
          <Text style={styles.time}>⏰ {med.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a3b5db",
    padding: 35,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  time: {
    marginTop: 5,
    color: "#555",
  },
});