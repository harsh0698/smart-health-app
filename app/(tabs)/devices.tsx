import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
import { getDatabase, ref, update } from "firebase/database";
import app from "../_firebase";

export default function Devices() {

  // 📱 OPTION 1 (Recommended): Open SMS app
  const openSMSApp = () => {
    const phoneNumber = "8956388480"; // 🔁 change to your number
    const message = "🚨 SOS ALERT! I need immediate help!";

    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  // 🌐 OPTION 2: Server-based SMS (Twilio)
  const sendSMS = async () => {
    try {
      await fetch("http://10.253.156.230/send-sms", {
        method: "POST",
      });
      console.log("SMS sent via server");
    } catch (err) {
      console.log("Server SMS failed");
    }
  };

  // 🚨 SOS BUTTON FUNCTION
  const sendSOS = async () => {
    const db = getDatabase(app);

    try {
      // Update Firebase
      await update(ref(db, "healthData"), {
        sosActive: true,
      });

      // 🔥 Choose ONE option below:

      // 👉 Option 1 (BEST for now)
      openSMSApp();

      // 👉 Option 2 (Uncomment if server running)
      // await sendSMS();

      Alert.alert("🚨 SOS Sent", "Emergency alert triggered!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send SOS");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency</Text>

      <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Press the button in case of emergency. This will alert your system instantly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b4c2dc",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  sosText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },

  info: {
    marginTop: 30,
    textAlign: "center",
    paddingHorizontal: 20,
    color: "#555",
  },
});    