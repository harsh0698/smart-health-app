import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getDatabase, onValue, ref,update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { requestPermissions, sendAlert } from "../../utils/_notifications";
import app from "../_firebase";


export default function Index() {
  
  const router = useRouter();

  const [bpm, setBpm] = useState(0);
  const [temp, setTemp] = useState(0);
  const [status, setStatus] = useState("Waiting");
  const [fallTriggered, setFallTriggered] = useState(false);

  useEffect(() => {
    requestPermissions();  
    const db = getDatabase(app);
    const dataRef = ref(db, "healthData");
    

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);

      if (data) {
        setBpm(data.bpm ?? 0);
        setTemp(data.temperature ?? 0);
        setStatus(data.status ?? "Waiting");
        if (data.fallDetected) {
        sendAlert("⚠ Fall Detected", "User may need help!");
      }

      if (data.sosActive) {
        sendAlert("🚨 SOS ALERT", "Emergency button pressed!");
      }
      }
    });
    

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.name}>Harsh</Text>
          </View>

          <Ionicons
            name="person-circle"
            size={40}
            color="#555"
            onPress={() => router.push("/profile")}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Pulse</Text>
          <Text style={styles.cardText}>
            Your vitals are steady today. Keep going 👍
          </Text>
          <Text style={styles.update}>Updated: Just now</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Vitals</Text>

        <View style={styles.grid}>
          <View style={styles.vitalCard}>
            <MaterialIcons name="favorite" size={24} color="red" />
            <Text style={styles.value}>{bpm}</Text>
            <Text style={styles.label}>Heart Rate</Text>
          </View>

          <View style={styles.vitalCard}>
            <Ionicons name="thermometer" size={24} color="orange" />
            <Text style={styles.value}>{Number(temp).toFixed(1)}°c</Text>
            <Text style={styles.label}>Temperature</Text>
          </View>

          

          <View style={styles.vitalCard}>
            <Ionicons name="medkit" size={24} color="blue" />
            <Text style={styles.value}>{status}</Text>
            <Text style={styles.label}>Status</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93b2de",
  }, 

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 40,
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
});