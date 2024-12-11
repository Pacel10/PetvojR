// Fetch the playlist from the Centova Cast server
async function fetchPlaylist() {
    try {
        const response = await fetch('/api/playlist'); // Endpoint to fetch playlist
        if (!response.ok) {
            throw new Error('Failed to fetch playlist');
        }
        const playlist = await response.json();
        displayPlaylist(playlist);
    } catch (error) {
        console.error('Error fetching playlist:', error);
    }
}

// Search for songs using the search API endpoint
async function searchSongs(query) {
    try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`); // Endpoint to search songs
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const searchResults = await response.json();
        displaySearchResults(searchResults);
    } catch (error) {
        console.error('Error searching songs:', error);
    }
}

// Play a selected song on the Centova Cast stream
function playSong(songUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = songUrl; // Set the stream URL for the audio player
    audioPlayer.play();
}

// Display the playlist on the webpage
function displayPlaylist(playlist) {
    const playlistContainer = document.getElementById('playlist');
    playlistContainer.innerHTML = ''; // Clear existing content

    playlist.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'song-item';
        songElement.textContent = song.title;
        songElement.onclick = () => playSong(song.streamUrl);
        playlistContainer.appendChild(songElement);
    });
}

// Display search results on the webpage
function displaySearchResults(searchResults) {
    const searchContainer = document.getElementById('searchResults');
    searchContainer.innerHTML = ''; // Clear existing content

    searchResults.forEach(song => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-item';
        resultElement.textContent = song.title;
        resultElement.onclick = () => playSong(song.streamUrl);
        searchContainer.appendChild(resultElement);
    });
}

// Event listener for the search form submission
document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    const query = document.getElementById('searchInput').value;
    searchSongs(query);
});

// Load the playlist when the page loads
window.addEventListener('load', fetchPlaylist);
