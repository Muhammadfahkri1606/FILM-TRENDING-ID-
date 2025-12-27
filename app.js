// File: js/app.js
import { db, ref, get, child } from './firebase.js';

const app = document.getElementById('app');

// --- PENGATURAN IP ADMIN ---
const ADMIN_IP = "182.4.69.201"; // Ganti dengan IP Anda

// 1. Cek IP Pengunjung
async function checkAdmin() {
    try {
        const req = await fetch('https://api.ipify.org?format=json');
        const res = await req.json();
        const myIP = res.ip;
        
        console.log("IP Anda:", myIP); // Cek console jika tombol tidak muncul

        if(myIP === ADMIN_IP) {
            // Jika IP cocok, tampilkan tombol
            document.getElementById('admin-btn').style.display = 'inline-block';
        }
    } catch (e) {
        console.log("Gagal cek IP");
    }
}

// 2. Ambil Film & Kelompokkan
async function loadFilms() {
    try {
        const snap = await get(child(ref(db), 'films'));
        if (snap.exists()) {
            renderCategories(snap.val());
        } else {
            app.innerHTML = '<p style="text-align:center">Belum ada film.</p>';
        }
    } catch (err) {
        app.innerHTML = '<p style="text-align:center">Gagal memuat data.</p>';
    }
}

// 3. Render ke Layar
function renderCategories(films) {
    app.innerHTML = ''; 
    const categories = {};

    // Pilah film berdasarkan kategori
    Object.keys(films).forEach(key => {
        const film = films[key];
        const cat = film.category || 'Lainnya'; // Default jika kosong
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push({ id: key, ...film });
    });

    // Tampilkan per kategori
    Object.keys(categories).sort().forEach(cat => {
        const section = document.createElement('section');
        section.innerHTML = `<h2 class="category-title">${cat}</h2>`;
        
        const grid = document.createElement('div');
        grid.className = 'grid-container';

        categories[cat].forEach(film => {
            grid.innerHTML += `
                <a href="play.html?id=${film.id}" class="film-card">
                    <img src="${film.poster_url}" class="poster" loading="lazy">
                    <div class="info">
                        <h3>${film.judul}</h3>
                    </div>
                </a>
            `;
        });
        section.appendChild(grid);
        app.appendChild(section);
    });
}

// Jalankan Fungsi
checkAdmin();
loadFilms();
