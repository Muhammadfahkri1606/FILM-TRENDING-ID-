import { db, ref, get, child } from './firebase.js';

const id = new URLSearchParams(window.location.search).get('id');
if(!id) window.location.href = 'index.html';

async function load() {
    const snap = await get(child(ref(db), `films/${id}`));
    if(snap.exists()) {
        const film = snap.val();
        document.title = film.judul;
        document.getElementById('title').innerText = film.judul;
        document.getElementById('desc').innerText = film.description;
        document.getElementById('cat-badge').innerText = film.category || 'Film';
        document.getElementById('player').src = `https://short.icu/${film.video_id}`;
    }
}
load();
