// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

const driversRef = firebase.database().ref('drivers');

driversRef.on('value', (snapshot) => {
    const drivers = snapshot.val();
    for (const driverId in drivers) {
        const statusLabel = document.getElementById(`status-label-${driverId}`);
        const orderButton = document.getElementById(`order-${driverId}`);
        
        if (drivers[driverId].available) {
            statusLabel.textContent = "Status: Tersedia";
            orderButton.disabled = false;
        } else {
            statusLabel.textContent = "Status: Tidak Tersedia";
            orderButton.disabled = true;
        }
    }
});

function toggleDriverStatus(driverId) {
    const driverRef = firebase.database().ref(`drivers/${driverId}`);
    driverRef.once('value').then((snapshot) => {
        const currentStatus = snapshot.val().available;
        driverRef.update({ available: !currentStatus });
    });
}

