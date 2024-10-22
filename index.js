// Mengimpor library discord.js
const Discord = require('discord.js ');

// Membuat instance dari client Discord
const client = new Discord.Client();

// Variabel untuk menyimpan waktu yang telah berlalu
let elapsedTime = 0; // dalam detik

// Fungsi untuk memperbarui waktu dan status
const updatePresence = () => {
  // Menghitung menit dan detik
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  
  // Format waktu menjadi string "MM:SS"
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Mengatur status aktivitas akun Discord
  client.user.setPresence({
    activity: {
      name: 'Vibe City',
      type: 'PLAYING',
      details: 'Online 24/7',
      state: timeString,
      assets: {
        largeImage: 'large-image-url', // Ganti dengan URL gambar besar
        smallImage: 'small-image-url', // Ganti dengan URL gambar kecil
        largeText: 'Gambar besar',
        smallText: 'Gambar kecil'
      },
      timestamps: {
        start: Date.now() // Waktu mulai
      }
    },
    status: 'online' // Status online
  })
  .then(() => console.log(`Status streaming diperbarui ke: ${timeString}`))
  .catch(console.error);
};

// Event yang dijalankan ketika client siap
client.on('ready', () => {
  console.log('Akun Discord Anda online!');
  
  // Memperbarui status awal
  updatePresence();

  // Mengupdate waktu setiap detik
  setInterval(() => {
    elapsedTime++;
    updatePresence();
  }, 1000); // 1000 ms = 1 detik
});

// Ambil token dari environment variable
const token = process.env.DISCORD_TOKEN;

// Login ke Discord menggunakan token dari environment variable
client.login(token)
  .then(() => console.log('Login berhasil!'))
  .catch(console.error);