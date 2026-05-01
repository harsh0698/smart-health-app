import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import app from "../firebase"; // adjust path if needed

export default function App() {
  const [bpm, setBpm] = useState(0);
  const [temp, setTemp] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, "healthData");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBpm(data.bpm);
        setTemp(data.temperature);
        setStatus(data.status);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.name}>Harsh</Text>
          </View>
          <Ionicons name="person-circle" size={40} color="#555" />
        </View>

        {/* HEALTH PULSE CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Pulse</Text>
          <Text style={styles.cardText}>
            Your vitals are steady today. Keep going 👍
          </Text>
          <Text style={styles.update}>Updated: Just now</Text>
        </View>

        {/* YOUR VITALS */}
        <Text style={styles.sectionTitle}>Your Vitals</Text>

        <View style={styles.grid}>
          <View style={styles.vitalCard}>
            <MaterialIcons name="favorite" size={24} color="red" />
            <Text style={styles.value}>{bpm}</Text>
            <Text style={styles.label}>Heart Rate</Text>
          </View>

          <View style={styles.vitalCard}>
            <Ionicons name="thermometer" size={24} color="orange" />
            <Text style={styles.value}>{temp}°C</Text>
            <Text style={styles.label}>Temperature</Text>
          </View>

          <View style={styles.vitalCard}>
            <Ionicons name="pulse" size={24} color="green" />
            <Text style={styles.value}>97%</Text>
            <Text style={styles.label}>SpO2</Text>
          </View>

          <View style={styles.vitalCard}>
            <Ionicons name="medkit" size={24} color="blue" />
            <Text style={styles.value}>{status}</Text>
            <Text style={styles.label}>Status</Text>
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.nav}>
        <Ionicons name="home" size={24} color="#4CAF50" />
        <Ionicons name="trending-up" size={24} color="#aaa" />
        <Ionicons name="hardware-chip" size={24} color="#aaa" />
        <Ionicons name="medical" size={24} color="#aaa" />
        <Ionicons name="people" size={24} color="#aaa" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },

  greeting: {
    fontSize: 14,
    color: "#888",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cardText: {
    marginTop: 10,
    color: "#555",
  },

  update: {
    marginTop: 10,
    fontSize: 12,
    color: "#999",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },

  vitalCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  label: {
    color: "#666",
    marginTop: 5,
  },

  nav: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },
});