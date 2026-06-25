import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import app from "../_firebase";

const screenWidth = Dimensions.get("window").width;

export default function Trends() {
  const [bpmData, setBpmData] = useState<number[]>([]);
  const [tempData, setTempData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [score, setScore] = useState<number>(100);

  useEffect(() => {
    const db = getDatabase(app);
    const historyRef = ref(db, "history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // 🔥 Fix: sort data properly
        const entries = Object.values(data).sort((a: any, b: any) => a.timestamp - b.timestamp);

        const recent = entries.slice(-6);

        const bpmArr = recent.map((item: any) => item.bpm ?? 0);
        const tempArr = recent.map((item: any) => item.temperature ?? 0);

        // 🔥 Fix: shorten time label
        const timeArr = recent.map((item: any) =>
          item.time ? item.time.split(":").slice(0, 2).join(":") : "-"
        );

        setBpmData(bpmArr);
        setTempData(tempArr);
        setLabels(timeArr);

        // 🔥 Health Score
        let healthScore = 100;

        bpmArr.forEach((b) => {
          if (b > 120 || b < 60) healthScore -= 5;
        });

        tempArr.forEach((t) => {
          if (t > 38 || t < 35) healthScore -= 5;
        });

        setScore(Math.max(healthScore, 0));
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 15, backgroundColor: "#f5f7fb" }}>

      {/* BPM GRAPH */}
      <Text style={title}>❤️ Heart Rate Trend</Text>
      <LineChart
        data={{
          labels: labels.length ? labels : ["-"],
          datasets: [{ data: bpmData.length ? bpmData : [0] }],
        }}
        width={screenWidth - 30}
        height={220}
        bezier
        chartConfig={chartConfig}
        style={chartStyle}
      />

      {/* TEMP GRAPH */}
      <Text style={title}>🌡 Temperature Trend</Text>
      <LineChart
        data={{
          labels: labels.length ? labels : ["-"],
          datasets: [{ data: tempData.length ? tempData : [0] }],
        }}
        width={screenWidth - 30}
        height={220}
        bezier
        chartConfig={chartConfigTemp}
        style={chartStyle}
      />

      {/* HEALTH SCORE */}
      <View style={card}>
        <Text style={{ fontSize: 18 }}>Overall Health Score</Text>
        <Text style={{ fontSize: 36, fontWeight: "bold", color: getColor(score) }}>
          {score}%
        </Text>
      </View>

    </ScrollView>
  );
}

// 🎨 Styles
const title = {
  fontSize: 18,
  fontWeight: "bold",
  marginVertical: 10,
};

const chartStyle = {
  borderRadius: 15,
};

const card = {
  marginTop: 30,
  padding: 20,
  backgroundColor: "white",
  borderRadius: 15,
  alignItems: "center",
  elevation: 5,
};

const getColor = (score: number) => {
  if (score > 80) return "green";
  if (score > 50) return "orange";
  return "red";
};

// 🎨 Chart configs
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: () => "#FF4C4C",
  labelColor: () => "#555",
};

const chartConfigTemp = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 1,
  color: () => "#4CAF50",
  labelColor: () => "#555",
};