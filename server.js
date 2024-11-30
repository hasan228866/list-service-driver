const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Status awal driver


// Ketika klien terhubung
io.on('connection', (socket) => {
    console.log('Klien terhubung');

    // Kirim status driver awal ke klien
    socket.emit('updateStatus', driverAvailability);

    // Terima pembaruan status driver dari klien
    socket.on('updateDriverStatus', (driverId, status) => {
        driverAvailability[driverId] = status;

        // Kirim pembaruan status ke semua klien
        io.emit('updateStatus', driverAvailability);
    });

    socket.on('disconnect', () => {
        console.log('Klien terputus');
    });
});

// Jalankan server di port 3000
server.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});


// Hubungkan ke server WebSocket
const socket = io('http://localhost:3000'); // Sesuaikan dengan URL server Anda

// Mendengarkan pembaruan status driver dari server
socket.on('updateStatus', (driverAvailability) => {
    // Update status di UI untuk setiap driver
    updateDriverStatus(1, driverAvailability[1]);
    updateDriverStatus(2, driverAvailability[2]);
});

// Fungsi untuk memperbarui status driver di UI
function updateDriverStatus(driverId, isAvailable) {
    const statusLabel = document.getElementById(`status-label-${driverId}`);
    const orderButton = document.getElementById(`order-${driverId}`);

    if (isAvailable) {
        statusLabel.textContent = "Status: Tersedia";
        orderButton.disabled = false;
    } else {
        statusLabel.textContent = "Status: Tidak Tersedia";
        orderButton.disabled = true;
    }
}

// Fungsi untuk mengubah status driver dan mengirimkan ke server
function toggleDriverStatus(driverId, isAvailable) {
    socket.emit('updateDriverStatus', driverId, isAvailable);
}

// Fungsi untuk toggle status driver di modal admin
function toggleDriverStatusFromAdmin(driverId) {
    const driverSelect = document.getElementById("driver-select");
    const status = driverSelect.value === "1" ? true : false;
    toggleDriverStatus(driverId, status);
}

function toggleDriverStatus() {
    const driverSelect = document.getElementById("driver-select");
    const driverId = driverSelect.value;
    driverAvailability[driverId] = !driverAvailability[driverId];

    // Kirim pembaruan status ke server WebSocket
    socket.emit('updateDriverStatus', driverId, driverAvailability[driverId]);

    // Simpan ke localStorage agar tetap tersedia setelah reload
    localStorage.setItem("driverAvailability", JSON.stringify(driverAvailability));

    // Update status driver di UI
    updateDriverStatus(driverId);
}

// Ambil data driverAvailability dari localStorage
const driverAvailability = JSON.parse(localStorage.getItem("driverAvailability")) || { 1: true, 2: true };

// Update status driver awal di UI
updateDriverStatus(1);
updateDriverStatus(2);
