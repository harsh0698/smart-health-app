import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "smart-health-app-1dccb.firebaseapp.com",
  databaseURL: "https://smart-health-app-1dccb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-health-app-1dccb",
  storageBucket: "smart-health-app-1dccb.appspot.com",
  messagingSenderId: "305655612650",
  appId: "1:305655612650:web:40a878dac7851ee9c80393",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
