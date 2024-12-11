document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("song-search");
  const searchButton = document.getElementById("search-song-btn");
  const resultsList = document.getElementById("song-results");
  const playlistList = document.getElementById("playlist-list");

  const centovaBaseURL = "/autodj"; // Replace with your actual Centova mount point

  // Search for songs using Centova API
  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
      resultsList.innerHTML = "<li>Please enter a search term.</li>";
      return;
    }

    try {
      // Send request to Centova's song search endpoint
      const response = await fetch(`${centovaBaseURL}/request/song_search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ search: query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch song data. Response not OK.");
      }

      const songData = await response.json();
      resultsList.innerHTML = ""; // Clear existing results

      if (songData.songs && songData.songs.length > 0) {
        songData.songs.forEach((song) => {
          const li = document.createElement("li");
          li.textContent = `${song.artist} - ${song.title}`;
          li.dataset.songId = song.id;

          // Add click event to add song to the playlist
          li.addEventListener("click", () => {
            addToPlaylist(song);
          });

          resultsList.appendChild(li);
        });
      } else {
        resultsList.innerHTML = "<li>No songs found.</li>";
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      resultsList.innerHTML = "<li>There was an error fetching song data.</li>";
    }
  });

  // Add song to playlist
  function addToPlaylist(song) {
    const li = document.createElement("li");
    li.textContent = `${song.artist} - ${song.title}`;
    li.dataset.songId = song.id;

    // Add a remove button to the playlist item
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      playlistList.removeChild(li);
    });

    li.appendChild(removeButton);
    playlistList.appendChild(li);
  }
});
