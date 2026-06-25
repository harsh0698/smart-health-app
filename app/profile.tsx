import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* PROFILE IMAGE */}
      <View style={styles.topSection}>
        <Ionicons name="person-circle" size={100} color="#4CAF50" />
        <Text style={styles.name}>Harsh Bhavsar</Text>
        <Text style={styles.email}>harsh@gmail.com</Text>
      </View>

      {/* INFO CARDS */}
      <View style={styles.card}>
        <Ionicons name="heart" size={24} color="red" />
        <Text style={styles.cardText}>Health Status: Normal</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="fitness" size={24} color="blue" />
        <Text style={styles.cardText}>Activity: Active</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="medkit" size={24} color="green" />
        <Text style={styles.cardText}>Medication: None</Text>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a7bbe1",
    padding: 20,
  },

  topSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    color: "#777",
    marginTop: 5,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },

  cardText: {
    marginLeft: 15,
    fontSize: 16,
  },

  logoutBtn: {
    backgroundColor: "#FF4C4C",
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});