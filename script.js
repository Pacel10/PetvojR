// Replace with your Centova Cast server API details
const CENTOVA_API_URL = 'http://control.internet-radio.com:2199/rpc/petvoj/listMedia';
const CENTOVA_API_KEY = '7tEFCbmT4SV6cUa';

// Elements
const songSearch = document.getElementById('songSearch');
const searchButton = document.getElementById('searchButton');
const showAllButton = document.getElementById('showAll');
const songList = document.getElementById('songList');

// Fetch songs from Centova Cast
async function fetchSongs() {
    try {
        const response = await fetch(`${CENTOVA_API_URL}?password=${CENTOVA_API_KEY}`);
        const data = await response.json();
        return data.media; // Return the media list
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

// Display songs in the UI
function displaySongs(songs) {
    songList.innerHTML = '';
    if (songs.length === 0) {
        songList.innerHTML = '<p>No songs found.</p>';
        return;
    }
    songs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.textContent = song.name; // Assuming "name" contains the song title
        songItem.onclick = () => playSong(song.url); // Assuming "url" contains the song's playback URL
        songList.appendChild(songItem);
    });
}

// Play a song
function playSong(url) {
    window.open(url, '_blank'); // Open song URL in a new tab
}

// Search songs
searchButton.addEventListener('click', async () => {
    const query = songSearch.value.trim().toLowerCase();
    const songs = await fetchSongs();
    const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(query));
    displaySongs(filteredSongs);
});

// Show all songs
showAllButton.addEventListener('click', async () => {
    const songs = await fetchSongs();
    displaySongs(songs);
});

// Initial load
(async () => {
    const songs = await fetchSongs();
    displaySongs(songs);
})();
