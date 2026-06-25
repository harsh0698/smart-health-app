export async function requestPermissions() {
  console.log("Notifications disabled (Expo Go limitation)");
}

export async function sendAlert(title: string, body: string) {
  console.log("ALERT:", title, body);
}