import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Care() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Health Care Blog</Text>

      {/* BLOG 1 */}
      <View style={styles.card}>
        <Text style={styles.heading}>❤️ Heart Health Tips</Text>
        <Text style={styles.content}>
          Regular exercise, balanced diet, and stress management help maintain
          a healthy heart. Avoid smoking and limit salt intake.
        </Text>
      </View>

      {/* BLOG 2 */}
      <View style={styles.card}>
        <Text style={styles.heading}>🌡 Body Temperature Care</Text>
        <Text style={styles.content}>
          Normal body temperature ranges between 36.1°C to 37.2°C. Stay hydrated
          and monitor temperature regularly during illness.
        </Text>
      </View>

      {/* BLOG 3 */}
      <View style={styles.card}>
        <Text style={styles.heading}>🧠 Mental Health Awareness</Text>
        <Text style={styles.content}>
          Take breaks, talk to loved ones, and practice meditation. Mental health
          is as important as physical health.
        </Text>
      </View>

      {/* BLOG 4 */}
      <View style={styles.card}>
        <Text style={styles.heading}>🚶 Daily Activity</Text>
        <Text style={styles.content}>
          Walking at least 30 minutes a day improves heart health, reduces stress,
          and boosts immunity.
        </Text>
      </View>

      {/* BLOG 5 */}
      <View style={styles.card}>
        <Text style={styles.heading}>💊 Medication Safety</Text>
        <Text style={styles.content}>
          Always follow prescribed dosage. Do not skip medication and consult
          a doctor if side effects occur.
        </Text>
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0c0de",
    padding: 35
    ,
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

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  content: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});