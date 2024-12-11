const apiUrl = "http://control.internet-radio.com:2199/start/petvoj/json.xsl"; // Replace with your Centova API endpoint
const apiPassword = "7tEFCbmT4SV6cUa";

const searchBox = document.getElementById("search-box");
const showAllButton = document.getElementById("show-all");
const playlistContainer = document.getElementById("playlist");

// Fetch songs from Centova Cast
async function fetchSongs(query = "") {
    try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`, {
            headers: { Authorization: `Bearer ${apiPassword}` },
        });
        const data = await response.json();
        return data.songs || [];
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

// Render songs in the playlist container
function renderSongs(songs) {
    playlistContainer.innerHTML = ""; // Clear existing content
    if (songs.length === 0) {
        playlistContainer.innerHTML = "<li>No songs found</li>";
        return;
    }
    songs.forEach((song) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="song-title">${song.title}</span>
            <span class="song-details">${song.artist} - ${song.album}</span>
        `;
        playlistContainer.appendChild(listItem);
    });
}

// Event listener for search box
searchBox.addEventListener("input", async () => {
    const query = searchBox.value;
    const songs = await fetchSongs(query);
    renderSongs(songs);
});

// Event listener for "Show All" button
showAllButton.addEventListener("click", async () => {
    const songs = await fetchSongs(); // Fetch all songs without a query
    renderSongs(songs);
});

// Initialize with all songs
(async function init() {
    const songs = await fetchSongs();
    renderSongs(songs);
})();
