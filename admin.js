// File: js/admin.js
import { db, ref, push } from './firebase.js';

const form = document.getElementById('adminForm');
const msg = document.getElementById('msg');
const btn = form.querySelector('button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerText = "Sedang Upload...";

    const data = {
        judul: document.getElementById('judul').value,
        category: document.getElementById('kategori').value,
        description: document.getElementById('desc').value,
        poster_url: document.getElementById('poster').value,
        video_id: document.getElementById('videoid').value
    };

    try {
        await push(ref(db, 'films'), data);
        msg.style.display = 'block';
        form.reset();
        setTimeout(() => msg.style.display = 'none', 3000);
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "UPLOAD FILM";
    }
});
