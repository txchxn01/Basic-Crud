const songForm = document.getElementById('songForm');
const songList = document.getElementById('songList');

const fetchSongs = async () => {
    const response = await fetch('http://localhost:3000/api/songs');
    const songs = await response.json();
    songList.innerHTML = songs.map(song => `
        <div>
           <div class="fon "> ${song.song} by ${song.band}</div>
            <div class="con">
            <button class="button-19" onclick="deleteSong('${song.songid}')">Delete</button>
            <button  class="button-18" onclick="editSong('${song.songid}', '${song.song}', '${song.band}')">Edit</button>
            </div>
        </div>
    `).join('');
};

const addSong = async (song) => {
    await fetch('http://localhost:3000/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    });
    fetchSongs();
};

const deleteSong = async (id) => {
    await fetch(`http://localhost:3000/api/songs/${id}`, { method: 'DELETE' });
    fetchSongs();
};

const editSong = (id, songName, bandName) => {
    document.getElementById('song').value = songName;
    document.getElementById('band').value = bandName;

    songForm.onsubmit = async (e) => {
        e.preventDefault();
        const updatedSong = {
            songid: id,
            song: document.getElementById('song').value,
            band: document.getElementById('band').value
        };
        await fetch(`http://localhost:3000/api/songs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSong)
        });
        fetchSongs();
        songForm.reset();
        songForm.onsubmit = handleAddSong;
    };
};

const handleAddSong = (e) => {
    e.preventDefault();
    const song = {
        songid: String(Date.now()), // Simple ID generation
        song: document.getElementById('song').value,
        band: document.getElementById('band').value
    };
    addSong(song);
    songForm.reset();
};

songForm.onsubmit = handleAddSong;
fetchSongs();