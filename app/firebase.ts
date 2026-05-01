import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCjmVZFxRxsOMO87b74IhPDhp3WTy9tIsE",
  authDomain: "smart-health-app-1dccb.firebaseapp.com",
  databaseURL: "https://smart-health-app-1dccb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-health-app-1dccb",
  storageBucket: "smart-health-app-1dccb.firebasestorage.app",
  messagingSenderId: "305655612650",
  appId: "1:305655612650:web:40a878dac7851ee9c80393"
};

const app = initializeApp(firebaseConfig);

export default app;