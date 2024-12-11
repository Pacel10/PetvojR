// Updated API Endpoint
const API_ENDPOINT = "/petvoj";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const resultsList = document.getElementById("results-list");
  const playlistList = document.getElementById("playlist-list");

  // Unified function for API calls
  async function fetchFromAPI(queryType, queryParam = "") {
    try {
      const response = await fetch(`${API_ENDPOINT}?type=${queryType}&query=${encodeURIComponent(queryParam)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  }

  // Search for songs
  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsList.innerHTML = ""; // Clear previous results

    if (!query) {
      resultsList.innerHTML = "<li>Please enter a search term.</li>";
      return;
    }

    const songs = await fetchFromAPI("search", query);
    if (songs && songs.length > 0) {
      songs.forEach(song => {
        const li = document.createElement("li");
        li.textContent = `${song.title} by ${song.artist}`;
        resultsList.appendChild(li);
      });
    } else {
      resultsList.innerHTML = "<li>No results found.</li>";
    }
  });

  // Display playlists
  playlistList.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
      const playlistName = event.target.textContent.trim();
      resultsList.innerHTML = ""; // Clear results

      const playlistSongs = await fetchFromAPI("playlist", playlistName);
      if (playlistSongs && playlistSongs.length > 0) {
        playlistSongs.forEach(song => {
          const li = document.createElement("li");
          li.textContent = song;
          resultsList.appendChild(li);
        });
      } else {
        resultsList.innerHTML = "<li>No songs found in this playlist.</li>";
      }
    }
  });
});
