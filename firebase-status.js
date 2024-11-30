// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database"; // Import Realtime Database functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCywX6xVGPhIZNoP1u5ORvEXwdqVplatzQ",
  authDomain: "eat-n-trip-3769c.firebaseapp.com",
  databaseURL: "https://eat-n-trip-3769c-default-rtdb.firebaseio.com",
  projectId: "eat-n-trip-3769c",
  storageBucket: "eat-n-trip-3769c.firebasestorage.app",
  messagingSenderId: "926647796765",
  appId: "1:926647796765:web:4c33b5774d4ed0c3d672f4",
  measurementId: "G-4RHR01W2HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Function to add a driver
function addDriver(driverId, name, available) {
  const driverRef = ref(database, 'drivers/' + driverId);
  set(driverRef, {
    name: name,
    available: available
  });
}

// Menambahkan dua driver contoh
addDriver(1, "Driver 1", true);  // Driver 1, available
addDriver(2, "Driver 2", false); // Driver 2, not available
