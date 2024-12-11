// API Endpoints
const PLAYLIST_API = "/api/playlist";
const SEARCH_API = "/api/search";

// DOM Elements
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const viewPlaylistBtn = document.getElementById("viewPlaylistBtn");
const playlistContainer = document.getElementById("playlist");
const playlistDiv = document.getElementById("playlistContainer");

// Fetch Full Playlist
async function fetchPlaylist() {
  try {
    const response = await fetch(PLAYLIST_API);
    const playlist = await response.json();

    displayPlaylist(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
}

// Search for a Song
async function searchPlaylist(query) {
  try {
    const response = await fetch(`${SEARCH_API}?query=${encodeURIComponent(query)}`);
    const searchResults = await response.json();

    displayPlaylist(searchResults);
  } catch (error) {
    console.error("Error searching playlist:", error);
  }
}

// Display Playlist
function displayPlaylist(playlist) {
  playlistDiv.style.display = "block";
  playlistContainer.innerHTML = ""; // Clear previous entries

  if (playlist.length === 0) {
    playlistContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  playlist.forEach(song => {
    const li = document.createElement("li");
    li.textContent = song.title; // Assuming playlist API provides a `title` field
    li.onclick = () => playSong(song.streamUrl); // Assuming song object has `streamUrl`
    playlistContainer.appendChild(li);
  });
}

// Play Selected Song
function playSong(url) {
  window.open(url, "_blank");
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  const query = searchBox.value.trim
