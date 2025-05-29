import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtccGh4XS6A6OtxtQx-sbEJ413mhWQw9s",
  authDomain: "cityjewellers-7daba.firebaseapp.com",
  databaseURL: "https://cityjewellers-7daba.firebaseio.com",
  projectId: "cityjewellers-7daba",
  storageBucket: "cityjewellers-7daba.appspot.com",
  messagingSenderId: "220499055002",
  appId: "1:220499055002:web:c62fbe24cf9c3110322a23"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
